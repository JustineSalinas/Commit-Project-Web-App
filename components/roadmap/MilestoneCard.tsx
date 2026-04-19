import { CheckCircle2, Circle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export type MilestoneStatus = "completed" | "in-progress" | "pending";

interface MilestoneCardProps {
  title: string;
  description: string;
  status: MilestoneStatus;
  tags?: string[];
}

export function MilestoneCard({ title, description, status, tags = [] }: MilestoneCardProps) {
  return (
    <div className={cn(
      "p-5 rounded-xl border bg-[#111113] transition-all hover:border-[#27272A]",
      status === "completed" ? "border-[#00FFAA]/30 opacity-70" : 
      status === "in-progress" ? "border-[#60A5FA]/50 shadow-[0_0_15px_rgba(96,165,250,0.1)]" : "border-[#1A1A1F]"
    )}>
      <div className="flex items-start justify-between mb-3">
        <h3 className={cn("font-bold text-lg", status === "completed" ? "text-[#A1A1AA] line-through" : "text-[#FAFAFA]")}>
          {title}
        </h3>
        {status === "completed" && <CheckCircle2 className="w-5 h-5 text-[#00FFAA]" />}
        {status === "in-progress" && <Clock className="w-5 h-5 text-[#60A5FA]" />}
        {status === "pending" && <Circle className="w-5 h-5 text-[#27272A]" />}
      </div>
      
      <p className="text-[#71717A] text-sm mb-4 line-clamp-2">
        {description}
      </p>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-[#18181B] text-[#A1A1AA] rounded text-xs font-medium border border-[#27272A]">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
