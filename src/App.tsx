import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "@/components/ThemeToggle";
import LeafParticles from "@/components/LeafParticles";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import JourneySection from "@/components/sections/JourneySection";
import { useGLTF, useTexture } from "@react-three/drei";
import cardGLB from "@/components/Lanyard/card.glb";
import lanyard from "@/components/Lanyard/lanyard.png";
import { useState } from "react";

import "./App.css";
export function preloadLanyardAssets() {
  useGLTF.preload(cardGLB);
  useTexture.preload(lanyard);
}
function App() {
  // State untuk melacak active section
  const [activeSection, setActiveSection] = useState<string>("hero");

  // Fungsi helper untuk smooth scroll ke section berdasarkan ID
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault(); // Mencegah reload/perubahan URL bawaan <a>
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-foreground transition-colors duration-300">
      {/* 1. NAVBAR (Fixed / Sticky Header) */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center py-3 backdrop-blur-md border-b border-border">
        <NavigationMenu>
          <NavigationMenuList className="gap-5 text-foreground">
            <NavigationMenuItem>
              <NavigationMenuLink
                href="#hero"
                onClick={(e) => scrollToSection(e, "hero")}
                className={`${navigationMenuTriggerStyle()} ${
                  activeSection === "hero"
                    ? "bg-muted text-accent-foreground"
                    : ""
                }`}
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="#about"
                onClick={(e) => scrollToSection(e, "about")}
                className={`${navigationMenuTriggerStyle()} ${
                  activeSection === "about"
                    ? "bg-accent text-accent-foreground"
                    : ""
                }`}
              >
                About
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="#journey"
                onClick={(e) => scrollToSection(e, "journey")}
                className={`${navigationMenuTriggerStyle()} ${
                  activeSection === "journey"
                    ? "bg-accent text-accent-foreground"
                    : ""
                }`}
              >
                Journeys
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="#contact"
                onClick={(e) => scrollToSection(e, "contact")}
                className={`${navigationMenuTriggerStyle()} ${
                  activeSection === "contact"
                    ? "bg-accent text-accent-foreground"
                    : ""
                }`}
              >
                Contact
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <ThemeToggle />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>

      {/* 2. KONTEN HALAMAN (SECTIONS) */}
      <main>
        {/* Background Leaf Particles */}
        <div className="fixed inset-0 z-0 w-full h-full pointer-events-none">
          <LeafParticles
            particleCount={120}
            particleSpread={15}
            speed={0.6}
            particleBaseSize={750}
            particleColors={[
              "#10B981", // Hijau Hutan Cerah
              "#059669", // Hijau Pinus
              "#34D399", // Hijau Daun Muda
              "#84CC16", // Hijau Kekuningan
            ]}
            moveParticlesOnHover={true}
            particleHoverFactor={0.4}
          />
        </div>

        {/* Hero Section */}

        <HeroSection />

        {/* About Section */}
        <AboutSection />

        {/* About Section */}
        <JourneySection />
      </main>
    </div>
  );
}

export default App;
