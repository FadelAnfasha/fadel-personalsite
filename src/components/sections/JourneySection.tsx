import { useState, useMemo } from "react";
import MorphSlider from "@/components/MorphSlider";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { Building2, Calendar, Award, ChevronRight } from "lucide-react";

const careerJourney = [
  {
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop",
    icon: "/icons/topy.png",
    caption: "PT. Topy Palingda Manufacturing Indonesia",
    role: "IT Staff - Finance,Accounting, & Tax Department",
    period: "2024 - 2026",
    location: "Karawang, Indonesia",
    achievements: [
      "Web Based Internal Finance App internal application to calculate variance between actual and standard prices of raw materials and production processing costs for all finished goods",
      "Digitalized manual entertainment request forms into an integrated digital platform with approval.",
      "Automating the generation of Statement of Account, VAT-In/Out Tax Report, and witholding tax slips using VBA Excel Macros.",
      "Transformed the tax invoice exchange system from manual to hybrid online-offline.",
    ],
    skills: [
      "Vue.js",
      "Laravel",
      "Tailwind CSS",
      "Bootstrap",
      "Visual Basic Application",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1600&auto=format&fit=crop",
    icon: "/icons/procodecg.png",
    caption: "ProCodeCG",
    role: "Fullstack Web Developer",
    period: "2021 - 2023",
    location: "Bandung, Indonesia",
    achievements: [
      "Mengembangkan 10+ web app klien menggunakan Laravel & Vue.js",
      "Mengoptimalkan query database PostgreSQL hingga mengurangi waktu response API sebesar 60%",
    ],
    skills: ["Laravel", "Vue.js", "PostgreSQL", "Docker"],
  },
  {
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop",
    icon: "/icons/telkom.png",
    caption: "Creative Media Agency",
    role: "Junior Web Developer",
    period: "2020 - 2021",
    location: "Jakarta, Indonesia",
    achievements: [
      "Membangun landing page interaktif berbasis GSAP & Tailwind CSS",
      "Mengintegrasikan CMS Headless untuk kemudahan pengelolaan konten klien",
    ],
    skills: ["HTML/CSS", "JavaScript", "GSAP", "WordPress"],
  },
];

export default function CareerDetail() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCareer = careerJourney[activeIndex];

  // // Stable reference — only recomputed if careerJourney itself changes
  const sliderItems = useMemo(
    () =>
      careerJourney.map((item) => ({
        image: item.image,
        caption: item.caption,
      })),
    [], // careerJourney is a module-level const, so empty deps is correct
  );

  return (
    <section
      id="journey"
      className="relative min-h-screen w-full py-16 px-6 md:px-16 lg:px-24 bg-background pt-24 pb-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div>
          <h2 className="text-3xl text-center md:text-left md:text-5xl font-bold text-foreground mb-3">
            Career Journey
          </h2>
          <div className="h-1 w-24 bg-primary rounded-full mx-auto md:mx-0"></div>
        </div>

        {/* Main Grid: MorphSlider + Card Informasi */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* KOLOM 1: MorphSlider */}
          <div className="lg:col-span-6 w-full">
            <div className="w-full h-70 sm:h-87.5 md:h-105 relative rounded-2xl overflow-hidden border border-border bg-card shadow-lg">
              <MorphSlider
                items={sliderItems}
                transition="melt"
                intensity={0.55}
                aberration={0.35}
                drift={0.4}
                autoplay={false}
                overlayColor="#05060a"
                duration={1.1}
                ease="power2.inOut"
                scale={2.0}
                loop
                radius={16}
                showCaptions={false}
                showControls
                showIndicators
                onSlideChange={(index: number) => setActiveIndex(index)}
              />
            </div>
          </div>

          {/* KOLOM 2: Card Informasi Riwayat Kerja (Otomatis Berganti) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-5 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
                    <div className="size-32 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center p-2 shrink-0">
                      <img
                        src={activeCareer.icon}
                        alt={activeCareer.caption}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    {activeCareer.caption}
                  </h3>
                  <p className="text-primary font-medium text-base sm:text-lg mt-1">
                    {activeCareer.role}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full w-fit">
                  <Calendar className="size-4" />
                  <span>{activeCareer.period}</span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                  <Award className="size-4 text-primary" /> Key Achievements
                </h4>
                <ul className="space-y-2">
                  {activeCareer.achievements.map((achievement, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <ChevronRight className="size-4 text-primary shrink-0 mt-0.5" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex flex-wrap gap-2">
                {activeCareer.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
