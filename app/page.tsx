import { Hero } from "@/components/hero";
import { AtAGlance } from "@/components/at-a-glance";
import { Projects } from "@/components/projects";
import { HowIEngineer } from "@/components/how-i-engineer";
import { ArchitectureShowcase } from "@/components/architecture-showcase";
import { Experience } from "@/components/experience";
import { Decisions } from "@/components/decisions";
import { Capabilities } from "@/components/capabilities";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <AtAGlance />
      <Projects />
      <HowIEngineer />
      <ArchitectureShowcase />
      <Experience />
      <Decisions />
      <Capabilities />
      <About />
      <Contact />
    </>
  );
}
