import { Search, Code2, Copy } from "lucide-react";

interface Snippet {
  id: string;
  title: string;
  language: string;
  code: string;
  description: string;
}

const mockSnippets: Snippet[] = [
  {
    id: "1",
    title: "React Query Invalidation",
    language: "typescript",
    description: "Force refetching specific queries after a mutation.",
    code: `const queryClient = useQueryClient();\n\nmutation.mutate(newTodo, {\n  onSuccess: () => {\n    queryClient.invalidateQueries({ queryKey: ['todos'] })\n  },\n})`
  },
  {
    id: "2",
    title: "Tailwind Radial Gradient",
    language: "css",
    description: "Custom CSS variable gradient injection via Tailwind utility.",
    code: `background: radial-gradient(\n  circle at center,\n  var(--tw-gradient-from) 0%,\n  var(--tw-gradient-to) 100%\n);`
  }
];

export function SnippetSearch() {
  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#71717A]" />
        <input 
          type="text" 
          placeholder="Search snippets by title, language, or content..."
          className="w-full bg-[#111113] border border-[#27272A] p-4 pl-12 rounded-xl text-sm text-[#FAFAFA] focus:outline-none focus:border-[#00FFAA] transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {mockSnippets.map(snippet => (
          <div key={snippet.id} className="bg-[#111113] border border-[#1A1A1F] rounded-xl overflow-hidden flex flex-col group hover:border-[#27272A] transition-colors">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#1A1A1F] bg-[#09090B]">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#00FFAA]" />
                <h3 className="font-bold text-[#FAFAFA] text-sm truncate">{snippet.title}</h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#71717A] uppercase tracking-wider font-bold">
                  {snippet.language}
                </span>
                <button className="text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors" title="Copy code">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Snippet Description */}
            <div className="px-4 py-3 bg-[#111113]">
              <p className="text-[#A1A1AA] text-xs">{snippet.description}</p>
            </div>

            {/* Code Block Container */}
            <div className="flex-1 p-4 bg-[#09090B] overflow-x-auto text-sm font-mono text-[#FAFAFA] whitespace-pre">
              <code>{snippet.code}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
