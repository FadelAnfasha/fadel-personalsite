import { Button } from "@/components/ui/button";
import SpotlightCard from "@/components/ui/SpotlightCard";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download, Code2, Bot, Rocket } from "lucide-react";

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
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                About Me
              </h2>
              <div className="h-1 w-20 bg-primary rounded-full"></div>
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
            <div className="pt-4">
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
          </div>

          {/* Kolom Kanan: 3 Kartu Current Activities */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              Current Activities
            </h3>

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
