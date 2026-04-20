"use client";

import { useState } from "react";
import { Code2, Files, Plus, Search } from "lucide-react";
import { addSnippet } from "@/app/actions/crud";

export default function SnippetsClient({ initialSnippets }: { initialSnippets: any[] }) {
  const [snippets, setSnippets] = useState(initialSnippets);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSnippet, setActiveSnippet] = useState<any>(initialSnippets[0] || null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("TypeScript");
  const [code, setCode] = useState("");

  const filteredSnippets = snippets.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.language?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !code) return;
    
    await addSnippet({ title, language, code });
    // Assuming we would re-fetch, but typically we use Server Actions with revalidatePath 
    // which triggers a new prop passing. We can rely on that!
    
    setIsModalOpen(false);
    setTitle("");
    setCode("");
  };

  return (
    <div className="space-y-6 h-full flex flex-col relative">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-[var(--text-primary)]">
            <Code2 className="w-6 h-6 text-[var(--accent)]" />
            Code Snippets
          </h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">Your personal, searchable library of reusable code.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-[var(--accent)] text-black px-4 py-2 rounded-lg font-bold hover:brightness-110 transition-all">
          <Plus className="w-4 h-4" /> New Snippet
        </button>
      </header>

      {/* Modal overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-[var(--bg-elevated)] border border-[var(--border)] p-6 rounded-xl w-full max-w-2xl">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Add Code Snippet</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-xs font-bold text-[var(--text-secondary)] uppercase">Title</label>
                  <input autoFocus type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-md px-3 py-2 mt-1 text-[var(--text-primary)] focus:border-[var(--accent)] outline-none" placeholder="e.g. Auth Middleware" />
                </div>
                <div className="w-1/3">
                  <label className="text-xs font-bold text-[var(--text-secondary)] uppercase">Language</label>
                  <input type="text" value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-md px-3 py-2 mt-1 text-[var(--text-primary)] focus:border-[var(--accent)] outline-none" placeholder="TypeScript" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-[var(--text-secondary)] uppercase">Code</label>
                <textarea 
                  value={code} 
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-md px-3 py-2 mt-1 text-[var(--text-primary)] focus:border-[var(--accent)] outline-none h-48 resize-none font-mono text-xs" 
                  placeholder="Paste your code here..." 
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border)]">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[var(--accent)] text-black rounded-lg font-bold hover:brightness-110">Save Snippet</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {initialSnippets.length === 0 ? (
        <div className="text-center text-[var(--text-secondary)] py-12 border border-dashed border-[var(--border)] rounded-xl flex-1 flex flex-col justify-center items-center">
          <Code2 className="w-12 h-12 mb-3 opacity-20" />
          <p>No snippets found. Start building your library!</p>
        </div>
      ) : (
        <div className="flex-1 flex gap-6 overflow-hidden min-h-[500px]">
          <div className="w-1/3 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl flex flex-col">
            <div className="p-4 border-b border-[var(--border)] relative">
              <Search className="w-4 h-4 absolute left-7 top-6 text-[var(--text-secondary)]" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-md pl-9 pr-3 py-2 text-sm focus:border-[var(--accent)] outline-none text-[var(--text-primary)]" />
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {filteredSnippets.map(s => (
                <div 
                  key={s.id} 
                  onClick={() => setActiveSnippet(s)}
                  className={`p-3 border border-transparent hover:bg-[var(--bg-surface)] cursor-pointer rounded-md transition-colors ${activeSnippet?.id === s.id ? 'bg-[var(--accent)]/10 !border-[var(--accent)]/30' : ''}`}
                >
                  <div className="font-bold text-sm text-[var(--text-primary)] truncate">{s.title}</div>
                  <div className="text-xs text-[var(--text-secondary)] mt-1">{s.language}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 bg-[var(--bg-base)] border border-[var(--border)] rounded-xl overflow-hidden flex flex-col relative group">
            {activeSnippet ? (
              <>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => navigator.clipboard.writeText(activeSnippet.code)} className="bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-3 py-1.5 rounded-md flex items-center gap-2 text-xs font-bold transition-colors shadow-lg">
                    <Files className="w-3 h-3" /> Copy
                  </button>
                </div>
                <div className="bg-[var(--bg-elevated)] px-4 py-3 border-b border-[var(--border)] text-xs font-mono text-[var(--text-secondary)] flex justify-between items-center">
                  <span>{activeSnippet.title}</span>
                  <span className="bg-[var(--bg-base)] px-2 py-0.5 rounded border border-[var(--border)]">{activeSnippet.language}</span>
                </div>
                <pre className="p-6 flex-1 overflow-auto text-sm text-[var(--text-primary)]" style={{ fontFamily: "var(--editor-font)", fontSize: "var(--editor-font-size)", fontVariantLigatures: "var(--editor-ligatures)" }}>
                  <code>{activeSnippet.code}</code>
                </pre>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-[var(--text-secondary)]">Select a snippet to view code</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
