import { Target, TrendingUp } from "lucide-react";

export default function MasteryPage() {
  const skills = [
    { id: 1, name: "React / Next.js", level: 85 },
    { id: 2, name: "TypeScript", level: 70 },
    { id: 3, name: "Tailwind CSS", level: 90 },
    { id: 4, name: "PostgreSQL", level: 45 },
    { id: 5, name: "System Design", level: 30 },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold flex items-center gap-2 text-[var(--text-primary)]">
          <Target className="w-6 h-6 text-[var(--accent)]" />
          Skill Mastery
        </h1>
        <p className="text-[var(--text-secondary)] text-sm mt-1">Visualize your proficiency and progression across technical domains.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-6">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-[var(--text-primary)]">
            <TrendingUp className="w-5 h-5 text-[var(--text-secondary)]" /> Current Proficiencies
          </h2>
          <div className="space-y-6">
            {skills.map((s) => (
              <div key={s.id}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-bold text-[var(--text-primary)]">{s.name}</span>
                  <span className="text-[var(--text-secondary)]">{s.level}%</span>
                </div>
                <div className="w-full h-2 bg-[var(--bg-base)] rounded-full overflow-hidden border border-[var(--border)]">
                  <div 
                    className="h-full bg-[var(--accent)] transition-all duration-1000" 
                    style={{ width: `${s.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[var(--bg-elevated)] border border-[var(--border)] border-dashed border-2 rounded-xl p-6 flex flex-col items-center justify-center text-center opacity-70 hover:opacity-100 transition-opacity">
          <Target className="w-12 h-12 text-[var(--text-secondary)] mb-4" />
          <h3 className="font-bold text-lg text-[var(--text-primary)]">Radar Chart Visualization</h3>
          <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-sm">
            Future improvement: A comprehensive spider/radar chart will appear here to map your full skill area distribution.
          </p>
        </div>
      </div>
    </div>
  );
}
