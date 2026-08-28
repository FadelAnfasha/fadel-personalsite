import ReactMarkdown from "react-markdown";
import { getDoc } from "@/lib/markdown";

/**
 * Merender body Markdown dengan styling Tailwind semantic
 * yang mengikuti tema (light/dark) via CSS variables.
 */
export function Markdown({ name }: { name: "about" | "projects" | "contact" }) {
  const { body } = getDoc(name);

  return (
    <ReactMarkdown
      components={{
        h1: (p) => <h1 className="sr-only" {...p} />, // judul section sudah ada di layout
        h2: (p) => (
          <h2 className="text-3xl font-bold text-foreground mt-8 mb-4" {...p} />
        ),
        h3: (p) => (
          <h3 className="text-xl font-semibold text-foreground mt-6 mb-2" {...p} />
        ),
        p: (p) => (
          <p className="text-muted-foreground leading-relaxed my-2" {...p} />
        ),
        ul: (p) => (
          <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground my-2" {...p} />
        ),
        ol: (p) => (
          <ol className="list-decimal pl-5 space-y-1.5 text-muted-foreground my-2" {...p} />
        ),
        li: (p) => <li className="leading-relaxed marker:text-primary" {...p} />,
        strong: (p) => <strong className="font-semibold text-foreground" {...p} />,
        em: (p) => <em className="text-foreground/80" {...p} />,
        hr: () => <hr className="border-border my-6" />,
        a: (p) => (
          <a
            className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
            target="_blank"
            rel="noreferrer"
            {...p}
          />
        ),
        blockquote: (p) => (
          <blockquote
            className="border-l-4 border-primary/60 pl-4 italic text-muted-foreground my-4"
            {...p}
          />
        ),
        code: (p) => (
          <code
            className="bg-accent text-accent-foreground rounded px-1.5 py-0.5 text-sm"
            {...p}
          />
        ),
      }}
    >
      {body}
    </ReactMarkdown>
  );
}
