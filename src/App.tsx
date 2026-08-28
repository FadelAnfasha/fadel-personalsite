import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Lanyard from "@/components/Lanyard/Lanyard";
import EchoText from "@/components/EchoText";
import StrokeText from "@/components/StrokeText";
import { ThemeToggle } from "@/components/ThemeToggle";
import LeafParticles from "@/components/LeafParticles";
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
        <div className="fixed inset-0 z-0 w-full h-full pointer-events-auto">
          <LeafParticles
            particleCount={120} // Jumlah daun (semakin kecil semakin ringan)
            particleSpread={15} // Jangkauan sebaran daun
            speed={0.6} // Kecepatan daun jatuh & bergoyang
            particleBaseSize={750} // Ukuran daun
            particleColors={[
              "#10B981", // Hijau Hutan Cerah
              "#059669", // Hijau Pinus
              "#34D399", // Hijau Daun Muda
              "#84CC16", // Hijau Kekuningan
            ]}
            moveParticlesOnHover={true} // Daun sedikit bergeser saat kursor bergerak
            particleHoverFactor={0.4} // Tingkat sensitivitas gerak kursor
          />
        </div>
        <section
          id="hero"
          className="relative min-h-screen w-full flex items-center justify-between px-8 md:px-16 lg:px-24 bg-transparent pt-16 overflow-hidden"
        >
          {/* 1. LAYER KONTEN TEKS */}
          <div className="relative z-10 flex-1 flex flex-col items-start text-left py-6 pointer-events-none max-w-full overflow-hidden">
            <div className="flex flex-col gap-4 ">
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
            <div className="mt-4 text-lg text-muted-foreground">
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
            <div className="mt-4 text-lg text-muted-foreground"></div>
          </div>

          {/* 2. LAYER 3D LANYARD */}
          <div className="absolute pt-16 inset-0 z-5 w-full h-full bg-transparent">
            <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
          </div>
        </section>

        <section
          id="about"
          className="relative min-h-screen w-full flex justify-between px-8 md:px-16 lg:px-24 bg-transparent pt-16 overflow-hidden"
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink render={<a href="/" />}>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink render={<a href="/components" />}>
                  Components
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </section>

        {/* <section
          id="about"
          className="flex flex-col items-center justify-center border-t border-border bg-background px-6 py-24"
        >
          <div className="w-full max-w-2xl">
            <Markdown name="about" />
          </div>
        </section>

        <section
          id="projects"
          className="flex flex-col items-center justify-center border-t border-border bg-card px-6 py-24"
        >
          <div className="w-full max-w-2xl">
            <Markdown name="projects" />
          </div>
        </section>

        <section
          id="contact"
          className="flex flex-col items-center justify-center border-t border-border bg-background px-6 py-24"
        >
          <div className="w-full max-w-2xl">
            <Markdown name="contact" />
          </div>
        </section> */}
      </main>

      {/* 3. FOOTER (data dari frontmatter contact.md) */}
    </div>
  );
}

export default App;
