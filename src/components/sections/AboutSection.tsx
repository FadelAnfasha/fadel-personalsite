import { Button } from "@/components/ui/button";
import SpotlightCard from "@/components/ui/SpotlightCard";
import LogoLoop from "@/components/LogoLoop";
import phpIcon from "@/assets/icons/tech/php.svg";
import javascriptIcon from "@/assets/icons/tech/javascript.svg";
import pythonIcon from "@/assets/icons/tech/python.svg";
import vbaIcon from "@/assets/icons/tech/vba.svg";
import laravelIcon from "@/assets/icons/tech/laravel.svg";
import vueIcon from "@/assets/icons/tech/vue.svg";
import reactIcon from "@/assets/icons/tech/react.svg";
import gitIcon from "@/assets/icons/socialmedia/git.svg";
import vscodeIcon from "@/assets/icons/tech/vscode.svg";
import pandasIcon from "@/assets/icons/tech/pandas.svg";
import tensorflowIcon from "@/assets/icons/tech/tensorflow.svg";
import ollamaIcon from "@/assets/icons/tech/ollama.svg";
import postgresqlIcon from "@/assets/icons/tech/postgresql.svg";
import bootstrapIcon from "@/assets/icons/tech/bootstrap.svg";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download, Code2, Bot, Rocket } from "lucide-react";

// 1. Bahasa Pemrograman (Languages)
const languages = [
  {
    src: phpIcon,
    alt: "PHP",
    label: "PHP",
    href: "https://www.php.net",
  },
  {
    src: javascriptIcon,
    alt: "JavaScript",
    label: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    src: pythonIcon,
    alt: "Python",
    label: "Python",
    href: "https://www.python.org",
  },
  {
    src: vbaIcon,
    alt: "VBA",
    label: "VBA",
    href: "https://docs.microsoft.com/en-us/office/vba",
  },
];

// 2. Framework, Library, Database, & Tools
const tools = [
  {
    src: laravelIcon,
    alt: "Laravel",
    label: "Laravel",
    href: "https://laravel.com",
    className: "",
  },
  {
    src: vueIcon,
    alt: "Vue",
    label: "Vue.js",
    href: "https://vuejs.org",
    className: "",
  },
  {
    src: reactIcon,
    alt: "React",
    label: "React",
    href: "https://react.dev",
    className: "",
  },
  {
    src: gitIcon,
    alt: "Github",
    label: "Git",
    href: "https://github.com/FadelAnfasha",
    className: "dark:brightness-0 dark:invert",
  },
  {
    src: vscodeIcon,
    alt: "VS Code",
    label: "VS Code",
    href: "https://code.visualstudio.com",
    className: "",
  },
  {
    src: pandasIcon,
    alt: "Pandas",
    label: "Pandas",
    href: "https://pandas.pydata.org",
    className: "",
  },
  {
    src: tensorflowIcon,
    alt: "TensorFlow",
    label: "TensorFlow",
    href: "https://www.tensorflow.org",
    className: "",
  },
  {
    src: ollamaIcon,
    alt: "Ollama",
    label: "Ollama",
    href: "https://ollama.ai",
    className: "dark:brightness-0 dark:invert",
  },
  {
    src: postgresqlIcon,
    alt: "PostgreSQL",
    label: "PostgreSQL",
    href: "https://www.postgresql.org",
    className: "",
  },
  {
    src: bootstrapIcon,
    alt: "Bootstrap",
    label: "Bootstrap",
    href: "https://getbootstrap.com",
    className: "",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex items-center px-8 md:px-16 lg:px-24 bg-transparent pt-24 pb-16 overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Grid Layout: 2 Kolom Desktop, 1 Kolom Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Kolom Kiri: Breadcrumb, Deskripsi, Download CV */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Judul Section */}
            <div>
              <h2 className="text-4xl text-center md:text-left md:text-5xl font-bold text-foreground mb-2">
                About Me
              </h2>
              <div className="h-1 w-45 md:w-56 bg-primary rounded-full mx-auto md:mx-0"></div>
            </div>

            {/* Deskripsi Naratif */}
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Hi! I'm Fadel Anfasha Putra, a passionate developer with a deep
                interest in building modern web applications and exploring the
                endless possibilities of technology.
              </p>
              <p>
                My journey in tech started with curiosity and has evolved into a
                commitment to crafting meaningful digital experiences. I believe
                in writing clean, maintainable code and constantly learning new
                tools and frameworks to stay ahead in this ever-changing field.
              </p>
              <p>
                When I'm not coding, you'll find me exploring AI innovations,
                experimenting with new design patterns, and contributing to
                open-source projects that make a difference.
              </p>
            </div>

            {/* Download CV Button */}
            <div className="pt-4 flex justify-center md:justify-start">
              <a href="/cv.pdf" download>
                <Button
                  variant="default"
                  size="lg"
                  className="hover:scale-105 transition-transform flex items-center gap-2"
                >
                  <Download className="size-5" />
                  <span>Download CV</span>
                </Button>
              </a>
            </div>

            {/* What I Can Use Section */}
            <div className="pt-8 space-y-8">
              {/* Header Section */}
              <div>
                <h2 className="text-4xl text-center md:text-left md:text-5xl font-bold text-foreground mb-2">
                  What can I use
                </h2>
                <div className="h-1 w-65 md:w-90 bg-primary rounded-full mx-auto md:mx-0"></div>
              </div>

              {/* Container Loop Tech Stack */}
              <div className="space-y-6">
                {/* 1. Baris Languages (Arah Kanan) */}
                <div className="relative overflow-hidden p-4 rounded-xl bg-card/30 border border-border/40">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">
                    Languages
                  </h3>
                  <LogoLoop
                    logos={languages}
                    speed={80}
                    direction="right"
                    logoHeight={50}
                    gap={40}
                    hoverSpeed={0}
                    scaleOnHover
                    showLabel
                    ariaLabel="Programming Languages"
                  />
                </div>

                {/* 2. Baris Tools & Frameworks (Arah Kiri) */}
                <div className="relative overflow-hidden p-4 rounded-xl bg-card/30 border border-border/40">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">
                    Tools & Frameworks
                  </h3>
                  <LogoLoop
                    logos={tools}
                    speed={100}
                    direction="left"
                    logoHeight={50}
                    gap={40}
                    hoverSpeed={0}
                    scaleOnHover
                    showLabel
                    ariaLabel="Tools and Frameworks"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: 3 Kartu Current Activities */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h2 className="text-4xl text-center md:text-center md:text-5xl font-bold text-foreground mb-2">
              Current Activities
            </h2>
            <div className="h-1 w-80 md:w-105  bg-primary rounded-full mx-auto "></div>
            {/* Card 1: Building */}
            <SpotlightCard
              className="custom-spotlight-card"
              spotlightColor="rgba(2, 186, 75, 1)"
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Code2 className="size-6" />
                  </div>
                  <CardTitle className="text-xl">Building</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Crafting modern web applications with React, TypeScript, and
                  Tailwind CSS. Focused on creating intuitive user experiences
                  and scalable architectures.
                </CardDescription>
                <br></br>
                <CardDescription className="text-base leading-relaxed">
                  Crafting modern web applications with Vue.js, Laravel, and
                  Tailwind CSS. Focused on creating Multifunction SaaS for
                  manufacturing.
                </CardDescription>
              </CardContent>
            </SpotlightCard>
            {/* Card 2: Exploring AI */}
            <SpotlightCard
              className="custom-spotlight-card"
              spotlightColor="rgba(2, 186, 75, 1)"
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Bot className="size-6" />
                  </div>
                  <CardTitle className="text-xl">Exploring AI</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Diving deep into artificial intelligence and machine learning.
                  Experimenting with LLMs, prompt engineering, and AI-powered
                  development tools.
                </CardDescription>
              </CardContent>
            </SpotlightCard>
            {/* Card 3: Learning Fullstack Development */}
            <SpotlightCard
              className="custom-spotlight-card"
              spotlightColor="rgba(2, 186, 75, 1)"
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Rocket className="size-6" />
                  </div>
                  <CardTitle className="text-xl">
                    Learning Fullstack Development
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Expanding my skillset across the entire stack. From frontend
                  frameworks to backend APIs, databases, and cloud deployment
                  strategies.
                </CardDescription>
              </CardContent>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
