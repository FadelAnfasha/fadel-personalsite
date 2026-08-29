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
import { useGLTF, useTexture } from "@react-three/drei";
import cardGLB from "@/components/Lanyard/card.glb";
import lanyard from "@/components/Lanyard/lanyard.png";

import "./App.css";
export function preloadLanyardAssets() {
  useGLTF.preload(cardGLB);
  useTexture.preload(lanyard);
}
function App() {
  // Fungsi helper untuk smooth scroll ke section berdasarkan ID
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault(); // Mencegah reload/perubahan URL bawaan <a>
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
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
                className={navigationMenuTriggerStyle()}
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="#about"
                onClick={(e) => scrollToSection(e, "about")}
                className={navigationMenuTriggerStyle()}
              >
                About
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="#projects"
                onClick={(e) => scrollToSection(e, "projects")}
                className={navigationMenuTriggerStyle()}
              >
                Projects
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="#contact"
                onClick={(e) => scrollToSection(e, "contact")}
                className={navigationMenuTriggerStyle()}
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
        <div className="fixed inset-0 z-0 w-full h-full pointer-events-auto">
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
      </main>
    </div>
  );
}

export default App;
