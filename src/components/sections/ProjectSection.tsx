import { useState } from "react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

import enterpriseImage from "@/assets/projects/enterprise-template.png";
import hikesplitImage from "@/assets/projects/hikesplit.png";
import simrsImage from "@/assets/projects/simrs.png";

interface Project {
  image: string;
  title: string;
  org: string;
  period: string;
  description: string;
  tech: string[];
  url?: string;
}

const projects: Project[] = [
  {
    image: enterpriseImage,
    title: "Enterprise Template App",
    org: "Personal Project",
    period: "2026",
    description:
      "Starter template App to help you build your own enterprise app.",
    tech: ["Laravel", "Vue.js"],
  },
  {
    image: hikesplitImage,
    title: "HikeSplit",
    org: "Personal Project",
    period: "2026",
    description:
      "HikeSplit is an app to help you split the cost between your group of your hikes.",
    tech: ["React.js", "Node.js"],
  },
  {
    image: simrsImage,
    title: "SIMRS",
    org: "Personal Project",
    period: "2026",
    description:
      "SIMRS (Sistem Informasi Manajemen Rumah Sakit) is a hospital information management xsystem.",
    tech: ["React.js", "Laravel"],
  },
];

export default function ProjectSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const onApiChange = (api: CarouselApi) => {
    if (!api) return;
    setApi(api);
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  };

  return (
    <section
      id="project"
      className="relative min-h-screen w-full py-16 px-6 md:px-16 lg:px-24 bg-background pt-24 pb-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-4xl text-center md:text-left md:text-5xl font-bold text-foreground mb-2">
            Projects
          </h2>
          <div className="h-1 w-40 md:w-50  bg-primary rounded-full mx-auto md:mx-0"></div>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <Carousel setApi={onApiChange} opts={{ align: "start" }}>
            <CarouselContent>
              {projects.map((project) => (
                <CarouselItem key={project.title}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                  >
                    <SpotlightCard
                      className="h-full"
                      spotlightColor="rgba(2, 186, 75, 0.4)"
                    >
                      <div className="rounded-2xl bg-card border border-border overflow-hidden flex flex-col">
                        {/* Image */}
                        <div className="relative aspect-video overflow-hidden bg-muted">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-fit"
                            draggable={false}
                          />
                        </div>

                        {/* Content */}
                        <div className="p-5 sm:p-6 flex flex-col">
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div>
                              <h3 className="text-lg sm:text-xl font-bold text-foreground">
                                {project.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-0.5">
                                {project.org} • {project.period}
                              </p>
                            </div>
                            {project.url && (
                              <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg hover:bg-muted transition-colors shrink-0"
                                aria-label={`Visit ${project.title}`}
                              >
                                <ExternalLink className="size-4 text-muted-foreground hover:text-primary" />
                              </a>
                            )}
                          </div>

                          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/50">
                            {project.tech.map((t) => (
                              <span
                                key={t}
                                className="text-[11px] sm:text-xs px-2.5 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20 font-medium"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === index
                  ? "bg-primary w-6"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2"
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
