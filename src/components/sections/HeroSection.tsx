import { Button } from "@/components/ui/button";
import EchoText from "@/components/EchoText";
import StrokeText from "@/components/StrokeText";
import Lanyard from "@/components/Lanyard/Lanyard";
import { Mail, MessageSquare } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-16 lg:px-24 bg-transparent pt-16 overflow-hidden"
    >
      {/* ========================================================= */}
      {/* 1. LANYARD KHUSUS MOBILE (Hanya muncul di layar < md)    */}
      {/* ========================================================= */}
      <div className=" md:hidden w-full h-80 pointer-events-auto flex justify-center items-center">
        <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
      </div>

      {/* ========================================================= */}
      {/* 2. LAYER KONTEN TEKS                                      */}
      {/* ========================================================= */}
      <div className="relative z-10 flex-1 flex flex-col items-center md:items-start text-center md:text-left py-6 pointer-events-none max-w-full overflow-hidden sm:mt-32">
        {/* Hello Text */}
        <div className="flex flex-col gap-4">
          <StrokeText
            text="Hello, I'm"
            strokeColor="#10B981"
            fillColor="#F8FAFC"
            strokeWidth={1.4}
            drawDuration={1.6}
            fillDelay={0.2}
            stagger={0.05}
            ease="power2.out"
            trigger="mount"
            fillMode="wipe"
            fontSize={72}
            fontWeight={800}
            letterSpacing={-4}
            reverse={false}
          />
        </div>

        {/* Name Text */}
        <div className="mt-4">
          <EchoText
            text="Fadel Anfasha Putra"
            echoes={12}
            lag={0.24}
            offset={36}
            direction="left"
            fade={0.72}
            blur={3}
            tint="#7dd3fc"
            mode="both"
            cursorRadius={320}
            duration={900}
            ease="ease-out"
            fontSize="clamp(2rem, 8vw, 5rem)"
            fontWeight={800}
            color="#10B981"
          />
        </div>

        {/* Social Media Buttons */}
        <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-3 pointer-events-auto">
          <a
            href="https://instagram.com/fadelanfasha"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="default"
              className="hover:scale-105 transition-transform flex items-center gap-2"
            >
              <svg
                className="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span>Instagram</span>
            </Button>
          </a>

          <a
            href="https://linkedin.com/in/fadelanfashap"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="default"
              className="hover:scale-105 transition-transform flex items-center gap-2"
            >
              <svg
                className="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span>LinkedIn</span>
            </Button>
          </a>

          <a
            href="https://github.com/fadelanfasha"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="default"
              className="hover:scale-105 transition-transform flex items-center gap-2"
            >
              <svg
                className="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              <span>GitHub</span>
            </Button>
          </a>

          <a href="mailto:fadelanfashap25@gmail.com">
            <Button
              variant="outline"
              size="default"
              className="hover:scale-105 transition-transform flex items-center gap-2"
            >
              <Mail className="size-4" />
              <span>Email</span>
            </Button>
          </a>

          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="default"
              className="hover:scale-105 transition-transform flex items-center gap-2"
            >
              <MessageSquare className="size-4" />
              <span>WhatsApp</span>
            </Button>
          </a>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. LANYARD KHUSUS DESKTOP (Hanya muncul di layar >= md)  */}
      {/* ========================================================= */}
      <div className="hidden md:block absolute pt-16 inset-0 z-5 w-full h-full bg-transparent">
        <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
      </div>
    </section>
  );
}
