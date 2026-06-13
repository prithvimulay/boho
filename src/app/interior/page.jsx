import PageHeader from "@/src/components/server/PageHeader";
import ProjectGrid from "@/src/components/client/ui/ProjectGrid";
import PageTransition from "@/src/components/client/motion/PageTransition";
import { getProjectsByCategory } from "@/src/lib/projects";

export const metadata = {
  title: "Interiors — BOHO Studio",
  description:
    "Residential and commercial interiors balancing warmth, material and light.",
};

export default function InteriorPage() {
  const projects = getProjectsByCategory("interior");

  return (
    <PageTransition>
      <PageHeader
        eyebrow="Interiors"
        title="Interiors that feel as good as they look."
        description="Residential and commercial spaces designed around material, light and the way people actually live and work."
      />
      <div className="max-w-[1400px] mx-auto px-6 pb-32">
        <ProjectGrid projects={projects} />
      </div>
    </PageTransition>
  );
}
