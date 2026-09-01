import { useState, useMemo } from "react";
import MorphSlider from "@/components/MorphSlider";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { Calendar, Award, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // 1. Import Framer Motion

import topyIcon from "@/assets/icons/company/topy.png";
import procodecgIcon from "@/assets/icons/company/procodecg.png";
import telkomIcon from "@/assets/icons/company/telkom.png";
import topyImage from "@/assets/icons/company/topy.jpg";
import topy2Image from "@/assets/icons/company/topy2.jpg";
import geladiImage from "@/assets/icons/company/geladi.jpg";

const careerJourney = [
  {
    image: topyImage,
    icon: topyIcon,
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
    image: topy2Image,
    icon: procodecgIcon,
    caption: "ProCodeCG",
    role: "Internship - Data Annotation",
    period: "2021 - 2021",
    location: "Bandung, Indonesia",
    achievements: [
      "Executed data labelling for building blueprint to train Maching Learning model accuracy in detecting house corner types.",
    ],
    skills: ["Python", "Pandas", "TensorFlow"],
  },
  {
    image: geladiImage,
    icon: telkomIcon,
    caption: "Telkom Indonesia",
    role: "Internship - Payment, Finance, & Collection Department",
    period: "2020 - 2021",
    location: "Karawang, Indonesia",
    achievements: [
      "Creating Telegram ChatBot for real-time monitoring of customers subscription statuses.",
    ],
    skills: ["Google Apps Script", "Telegram Webhook"],
  },
];

export default function CareerDetail() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCareer = careerJourney[activeIndex];

  const sliderItems = useMemo(
    () =>
      careerJourney.map((item) => ({
        image: item.image,
        caption: item.caption,
      })),
    [],
  );

  return (
    <section
      id="journey"
      className="relative min-h-screen w-full py-16 px-6 md:px-16 lg:px-24 bg-background pt-24 pb-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h2 className="text-4xl text-center md:text-left md:text-5xl font-bold text-foreground mb-2">
            Career Journey
          </h2>
          <div className="h-1 w-65 md:w-90 bg-primary rounded-full mx-auto md:mx-0"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center my-8">
        {/* KOLOM 1: MorphSlider */}
        <div className="lg:col-span-6 w-full">
          <div className="w-full h-70 sm:h-160 md:h-160 relative rounded-2xl overflow-hidden border border-border bg-card shadow-lg">
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

        {/* KOLOM 2: Card Informasi dengan Animasi Framer Motion */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <SpotlightCard
            className="custom-spotlight-card h-full overflow-hidden"
            spotlightColor="rgba(2, 186, 75, 1)"
          >
            {/* 2. Gunakan AnimatePresence & motion.div berparameter key={activeIndex} */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-sm h-130 sm:h-160 flex flex-col justify-between"
              >
                {/* Upper Content Group */}
                <div className="space-y-4 sm:space-y-6 overflow-hidden">
                  {/* Header Card */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4 sm:pb-5">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-3">
                        <div className="size-10 sm:size-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center p-2 shrink-0">
                          <img
                            src={activeCareer.icon}
                            alt={activeCareer.caption}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="line-clamp-1">
                          {activeCareer.caption}
                        </span>
                      </h3>
                      <p className="text-primary font-medium text-sm sm:text-lg mt-1 sm:mt-1.5">
                        {activeCareer.role}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground bg-muted/50 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full w-fit shrink-0">
                      <Calendar className="size-3.5 sm:size-4" />
                      <span>{activeCareer.period}</span>
                    </div>
                  </div>

                  {/* Achievements List */}
                  <div className="space-y-2 sm:space-y-3">
                    <h4 className="text-xs sm:text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                      <Award className="size-4 text-primary" /> Key Achievements
                    </h4>
                    {/* PERUBAHAN 2: Batasi max-h di mobile 'max-h-48' agar area list bisa di-scroll tanpa mengubah tinggi card */}
                    <ul className="space-y-2.5 max-h-48 sm:max-h-55 lg:max-h-70 overflow-y-auto pr-2 scrollbar-thin">
                      {activeCareer.achievements.map((achievement, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed"
                        >
                          <ChevronRight className="size-4 text-primary shrink-0 mt-0.5 sm:mt-1" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Tech Stack */}
                <div className="pt-4 sm:pt-5 border-t border-border/50 flex flex-wrap gap-1.5 sm:gap-2">
                  {activeCareer.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] sm:text-xs px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-md bg-primary/10 text-primary border border-primary/20 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
