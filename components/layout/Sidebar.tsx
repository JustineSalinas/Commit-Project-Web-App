import Link from "next/link";
import { 
  Home, 
  Timer, 
  BookOpen, 
  Map, 
  Layers, 
  Lightbulb, 
  Bug, 
  Target, 
  Code2, 
  Activity, 
  Bot 
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Focus", href: "/focus", icon: Timer },
  { name: "Journal", href: "/journal", icon: BookOpen },
  { name: "Roadmap", href: "/roadmap", icon: Map },
  { name: "Flashcards", href: "/flashcards", icon: Layers },
  { name: "TIL", href: "/til", icon: Lightbulb },
  { name: "Bugs", href: "/bugs", icon: Bug },
  { name: "Mastery", href: "/mastery", icon: Target },
  { name: "Snippets", href: "/snippets", icon: Code2 },
  { name: "Heatmap", href: "/heatmap", icon: Activity },
  { name: "AI Explainer", href: "/ai", icon: Bot },
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-[#1A1A1F] bg-[#09090B] h-screen flex flex-col hidden md:flex">
      <div className="p-6">
        <h1 className="text-[#00FFAA] text-xl font-bold tracking-wider">COMMIT</h1>
        <p className="text-[#71717A] text-xs mt-1 uppercase tracking-widest">Workspace</p>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-[#A1A1AA] hover:bg-[#111113] hover:text-[#FAFAFA] transition-colors"
          >
            <item.icon className="w-5 h-5 text-[#71717A]" />
            <span className="text-sm font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-[#1A1A1F]">
        <div className="bg-[#111113] rounded-lg p-4 border border-[#1A1A1F]">
          <div className="text-xs text-[#71717A] uppercase font-bold mb-1">Today's Focus</div>
          <div className="text-[#FAFAFA] text-sm font-medium">0 / 4 Sessions</div>
          <div className="mt-2 h-1.5 w-full bg-[#18181B] rounded-full overflow-hidden">
            <div className="h-full bg-[#00FFAA] w-[0%]" />
          </div>
        </div>
      </div>
    </aside>
  );
}
