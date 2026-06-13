import PageHeader from "@/src/components/server/PageHeader";
import ProjectGrid from "@/src/components/client/ui/ProjectGrid";
import PageTransition from "@/src/components/client/motion/PageTransition";
import { getProjectsByCategory } from "@/src/lib/projects";

export const metadata = {
  title: "Architecture — BOHO Studio",
  description:
    "Houses, villas, apartments, hotels and developments — architecture inspired by the Mediterranean lifestyle.",
};

export default function ArchitecturePage() {
  const projects = getProjectsByCategory("architecture");

  return (
    <PageTransition>
      <PageHeader
        eyebrow="Architecture"
        title="Spaces shaped by light, landscape and life."
        description="A portfolio of houses, villas and developments inspired by the Mediterranean lifestyle and a contemporary interpretation of luxury."
      />
      <div className="max-w-[1400px] mx-auto px-6 pb-32">
        <ProjectGrid projects={projects} />
      </div>
    </PageTransition>
  );
}
