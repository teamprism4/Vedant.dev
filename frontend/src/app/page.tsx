import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ExperienceSection } from "@/components/experience-section";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";
import { StatsSection } from "@/components/stats-section";
import { ResumeSection } from "@/components/resume-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";



export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <div className="relative">
        {/* Subtle section dividers */}
        <AboutSection />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
        <ExperienceSection />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
        <ProjectsSection />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
        <SkillsSection />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
        <ResumeSection />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
        <ContactSection />
      </div>
      <Footer />
      <ScrollToTop />
    </main>
  );
}
