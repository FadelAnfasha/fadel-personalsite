import EchoText from "@/components/ui/EchoText";
import StrokeText from "@/components/StrokeText";
import Lanyard from "@/components/Lanyard/Lanyard";
import SpotlightCard from "@/components/ui/SpotlightCard";

// Import SVG icons from assets
import InstagramIcon from "@/assets/icons/socialmedia/instagram.svg";
import LinkedinIcon from "@/assets/icons/socialmedia/linkedin.svg";
import GithubIcon from "@/assets/icons/socialmedia/git.svg";
import GmailIcon from "@/assets/icons/socialmedia/gmail.svg";
import WhatsappIcon from "@/assets/icons/socialmedia/whatsapp.svg";

const socialMedia = [
  {
    name: "Instagram",
    href: "https://instagram.com/fadelanfasha",
    icon: InstagramIcon,
    spotlightColor: "rgba(225, 48, 108, 0.5)",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/fadelanfashap",
    icon: LinkedinIcon,
    spotlightColor: "rgba(10, 102, 194, 0.5)",
  },
  {
    name: "GitHub",
    href: "https://github.com/fadelanfasha",
    icon: GithubIcon,
    spotlightColor: "rgba(88, 166, 255, 0.5)",
  },
  {
    name: "Email",
    href: "mailto:fadelanfashap25@gmail.com",
    icon: GmailIcon,
    spotlightColor: "rgba(234, 67, 53, 0.5)",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/628983692104",
    icon: WhatsappIcon,
    spotlightColor: "rgba(37, 211, 102, 0.5)",
  },
] as const;

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-16 lg:px-24 bg-transparent pt-16 overflow-hidden"
    >
      {/* ========================================================= */}
      {/* 1. LANYARD KHUSUS MOBILE (Hanya muncul di layar < md)    */}
      {/* ========================================================= */}
      <div className=" md:hidden w-full h-110 pointer-events-auto flex justify-center items-center">
        <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
      </div>

      {/* ========================================================= */}
      {/* 2. LAYER KONTEN TEKS                                      */}
      {/* ========================================================= */}
      <div className="relative md:pl-8 z-10 flex-1 flex flex-col items-center md:items-start text-center md:text-left py-6 pointer-events-none max-w-full overflow-hidden sm:mt-32">
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
        <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4 pointer-events-auto">
          {socialMedia.map((item) => (
            <SpotlightCard
              key={item.name}
              className="p-3 hover:scale-110 transition-transform"
              spotlightColor={item.spotlightColor}
            >
              <a
                href={item.href}
                target={item.name === "Email" ? "_self" : "_blank"}
                rel="noopener noreferrer"
                aria-label={item.name}
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  className={`size-6 ${
                    item.name === "GitHub"
                      ? "dark:brightness-0 dark:invert"
                      : ""
                  }`}
                />
              </a>
            </SpotlightCard>
          ))}
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
