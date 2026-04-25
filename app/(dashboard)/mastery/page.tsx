import { Target } from "lucide-react";
import MasteryClient from "./MasteryClient";
import { getSkills } from "@/app/actions/crud";

export default async function MasteryPage() {
  const skills = await getSkills();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold flex items-center gap-2 text-[var(--text-primary)]">
          <Target className="w-6 h-6 text-[var(--accent)]" />
          Skill Mastery
        </h1>
        <p className="text-[var(--text-secondary)] text-sm mt-1">Visualize your proficiency and progression across technical domains.</p>
      </header>

      <MasteryClient initialSkills={skills} />
    </div>
  );
}
