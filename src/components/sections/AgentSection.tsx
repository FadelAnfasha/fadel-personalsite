import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, RefreshCw, Send, Sparkles, User } from "lucide-react";

import SpotlightCard from "@/components/ui/SpotlightCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { askGemini, pingGemini, toGeminiHistory } from "@/lib/gemini";

// ───────────── Types ─────────────
type Role = "user" | "assistant";
type ConnectionStatus = "checking" | "online" | "offline";

interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: number;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "init-1",
    role: "assistant",
    content:
      "Halo! Saya AI Assistant-nya Fadel. Ada yang ingin kamu tanyakan tentang Fadel?",
    timestamp: Date.now(),
  },
];

const newId = (prefix: string) => `${prefix}-${Date.now()}`;

// ───────────── Tiny UI parts ─────────────
function TypingDots() {
  return (
    <div className="flex items-center gap-1.5" aria-label="AI sedang mengetik">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block size-2 rounded-full bg-primary/70"
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

const STATUS_STYLES: Record<
  ConnectionStatus,
  {
    ring: string;
    bg: string;
    text: string;
    dot: React.ReactNode;
    label: string;
  }
> = {
  checking: {
    ring: "border-yellow-500/40",
    bg: "bg-yellow-500/10",
    text: "text-yellow-500",
    dot: <span className="size-2 rounded-full bg-yellow-500 animate-pulse" />,
    label: "Checking LLM Connection...",
  },
  online: {
    ring: "border-emerald-500/40",
    bg: "bg-emerald-500/10",
    text: "text-emerald-500",
    dot: (
      <span className="relative flex size-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
        <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
      </span>
    ),
    label: "Online · Ready to chat",
  },
  offline: {
    ring: "border-red-500/40",
    bg: "bg-red-500/10",
    text: "text-red-500",
    dot: <span className="size-2 rounded-full bg-red-500" />,
    label: "Offline · LLM Unavailable",
  },
};

function StatusBadge({ status }: { status: ConnectionStatus }) {
  const s = STATUS_STYLES[status];
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${s.ring} ${s.bg} ${s.text}`}
    >
      {s.dot}
      {s.label}
    </span>
  );
}

function Avatar({ role }: { role: Role }) {
  const Icon = role === "user" ? User : Bot;
  const styles =
    role === "user"
      ? "bg-foreground/10 text-foreground ring-border/60"
      : "bg-primary/15 text-primary ring-primary/30";
  return (
    <div
      className={`flex size-9 shrink-0 items-center justify-center rounded-full ring-1 ${styles}`}
    >
      <Icon className="size-4" />
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  const bubble = (
    <div
      className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
        isUser
          ? "rounded-tr-sm bg-primary text-primary-foreground"
          : "rounded-tl-sm bg-card border border-border/60 text-foreground"
      }`}
    >
      {message.content}
    </div>
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className={`flex w-full gap-3 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && <Avatar role="assistant" />}
      {bubble}
      {isUser && <Avatar role="user" />}
    </motion.div>
  );
}

function TypingBubble() {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex w-full justify-start gap-3"
    >
      <Avatar role="assistant" />
      <div className="rounded-2xl rounded-tl-sm border border-border/60 bg-card px-4 py-3 shadow-sm">
        <TypingDots />
      </div>
    </motion.div>
  );
}

// ───────────── Section ─────────────
export default function AgentSection() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("checking");

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Connectivity check on mount.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const ok = await pingGemini();
      if (!cancelled) setConnectionStatus(ok ? "online" : "offline");
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Auto-scroll on new content.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  const appendMessage = (msg: Omit<Message, "id" | "timestamp">) =>
    setMessages((prev) => [
      ...prev,
      {
        ...msg,
        id: newId(msg.role === "user" ? "u" : "a"),
        timestamp: Date.now(),
      },
    ]);

  const sendMessage = async (raw: string) => {
    const text = raw.trim();
    if (!text || isLoading || connectionStatus === "offline") return;

    appendMessage({ role: "user", content: text });
    setInput("");
    setIsLoading(true);

    try {
      const reply = await askGemini(
        toGeminiHistory([...messages, { role: "user", content: text }]),
      );
      setConnectionStatus("online");
      appendMessage({ role: "assistant", content: reply });
    } catch (err) {
      console.error("Gemini error:", err);
      setConnectionStatus("offline");
      appendMessage({
        role: "assistant",
        content: "Maaf, terjadi masalah saat menghubungkan ke Gemini AI.",
      });
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const canSend =
    !isLoading && input.trim().length > 0 && connectionStatus !== "offline";

  return (
    <section
      id="agent"
      className="relative min-h-screen w-full overflow-hidden px-4 pt-12 md:px-12 md:pt-8"
    >
      <div className="relative z-10 mx-auto flex h-auto w-full max-w-4xl flex-col gap-4 md:h-170 md:grid md:grid-cols-5 md:grid-rows-5">
        <SectionHeader
          connectionStatus={connectionStatus}
          isLoading={isLoading}
          onReset={() => setMessages(INITIAL_MESSAGES)}
        />

        <ChatPanel
          scrollRef={scrollRef}
          messages={messages}
          isLoading={isLoading}
          input={input}
          setInput={setInput}
          onSubmit={() => sendMessage(input)}
          canSend={canSend}
          inputRef={inputRef}
          isOffline={connectionStatus === "offline"}
        />
      </div>
    </section>
  );
}

// ───────────── Section sub-views ─────────────
function SectionHeader({
  connectionStatus,
  isLoading,
  onReset,
}: {
  connectionStatus: ConnectionStatus;
  isLoading: boolean;
  onReset: () => void;
}) {
  return (
    <div className="mb-2 flex flex-col items-center justify-start text-center md:col-span-5 md:row-span-2 md:mb-0 md:justify-center">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col items-center gap-2"
      >
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <Sparkles className="size-3.5 text-primary" />
          AI Assistant
        </div>

        <h2 className="text-3xl font-bold text-foreground md:text-5xl">
          Ask My AI Assistant
        </h2>

        <div className="h-1 w-48 rounded-full bg-primary md:w-72" />

        <p className="max-w-xl text-xs text-muted-foreground md:text-sm">
          Feel free to ask any question about me.
        </p>

        <div className="mt-1 flex items-center gap-3">
          <StatusBadge status={connectionStatus} />
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            disabled={isLoading}
            className="h-7 gap-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className="size-3" />
            Reset
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

function ChatPanel({
  scrollRef,
  messages,
  isLoading,
  input,
  setInput,
  onSubmit,
  canSend,
  inputRef,
  isOffline,
}: {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  messages: Message[];
  isLoading: boolean;
  input: string;
  setInput: (v: string) => void;
  onSubmit: () => void;
  canSend: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  isOffline: boolean;
}) {
  return (
    <div className="h-115 min-h-0 w-full md:col-span-5 md:row-span-3 md:row-start-3 md:h-full">
      <SpotlightCard
        className="custom-spotlight-card h-full w-full overflow-hidden rounded-2xl border border-border/40"
        spotlightColor="rgba(2, 186, 75, 0.25)"
      >
        <Card className="flex h-full flex-col overflow-hidden border-0 bg-card/70 backdrop-blur-md">
          <CardContent className="flex h-full min-h-0 flex-col overflow-hidden p-0">
            <div
              ref={scrollRef}
              className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4 md:px-6"
            >
              <AnimatePresence initial={false}>
                {messages.map((m) => (
                  <MessageBubble key={m.id} message={m} />
                ))}
                {isLoading && <TypingBubble key="typing" />}
              </AnimatePresence>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
              }}
              className="flex shrink-0 items-center gap-2 border-t border-border/40 bg-background/60 px-4 py-3 md:px-6"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  isOffline ? "LLM sedang offline..." : "Tulis pertanyaanmu…"
                }
                disabled={isLoading || isOffline}
                className="flex-1 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!canSend}
                className="size-10 shrink-0 rounded-full"
              >
                <Send className="size-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </SpotlightCard>
    </div>
  );
}
