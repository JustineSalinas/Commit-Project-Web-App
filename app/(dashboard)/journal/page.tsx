"use client";

import { useState, useEffect } from "react";
import { BookOpen, Search, Filter, Plus, Save, Trash2, Loader2 } from "lucide-react";
import { getJournals, addJournalEntry, updateJournalEntry, deleteJournalEntry } from "@/app/actions/crud";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function JournalPage() {
  const [entries, setEntries] = useState<any[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const activeEntry = entries.find(e => e.id === activeId);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    setIsLoading(true);
    const data = await getJournals();
    setEntries(data);
    if (data.length > 0 && activeId === null) {
      setActiveId(data[0].id);
    }
    setIsLoading(false);
  };

  const handleNewEntry = async () => {
    setIsSaving(true);
    try {
      const res = await addJournalEntry({ 
        title: "Untitled Entry", 
        content: "Start writing here..." 
      });
      
      if (res.success && res.entry) {
        setEntries([res.entry, ...entries]);
        setActiveId(res.entry.id);
        toast.success("New entry created");
      } else {
        toast.error(res?.error || "Failed to create entry");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = async () => {
    if (!activeEntry || isSaving) return;
    setIsSaving(true);
    try {
      const res = await updateJournalEntry(activeEntry.id, {
        title: activeEntry.title,
        content: activeEntry.content
      });
      
      if (res.success) {
        toast.success("Saved successfully");
      } else {
        toast.error(res?.error || "Failed to save");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;
    const res = await deleteJournalEntry(id);
    if (res.success) {
      const updated = entries.filter(e => e.id !== id);
      setEntries(updated);
      if (activeId === id) {
        setActiveId(updated.length > 0 ? updated[0].id : null);
      }
      toast.success("Entry deleted");
    }
  };

  const filteredEntries = entries.filter(e => 
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    e.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-[var(--text-primary)]">
            <BookOpen className="w-6 h-6 text-[var(--accent)]" />
            Developer Journal
          </h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">Document your thoughts, hurdles, and daily wins.</p>
        </div>
        <button 
          onClick={handleNewEntry}
          disabled={isSaving}
          className="flex items-center gap-2 bg-[var(--accent)] text-black px-4 py-2 rounded-lg font-bold hover:brightness-110 transition-all disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} 
          New Entry
        </button>
      </header>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--accent)]" />
        </div>
      ) : (
        <div className="flex-1 flex gap-6 overflow-hidden">
          {/* Left List */}
          <div className="w-1/3 flex flex-col bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl overflow-hidden">
            <div className="p-4 border-b border-[var(--border)] flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-[var(--text-secondary)]" />
                <input 
                  type="text" 
                  placeholder="Search entries..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-md pl-9 pr-3 py-1.5 text-sm focus:border-[var(--accent)] outline-none text-[var(--text-primary)]" 
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredEntries.map(e => (
                <div key={e.id} className="group relative">
                  <button 
                    onClick={() => setActiveId(e.id)}
                    className={cn(
                      "w-full text-left p-3 rounded-lg border transition-all pr-10",
                      activeId === e.id 
                        ? "bg-[var(--accent)]/10 border-[var(--accent)]/30" 
                        : "border-transparent hover:bg-[var(--bg-surface)]"
                    )}
                  >
                    <div className="text-sm font-bold text-[var(--text-primary)] truncate">{e.title}</div>
                    <div className="text-xs text-[var(--text-secondary)] mt-1 truncate">{e.content}</div>
                    <div className="text-[10px] text-[var(--text-secondary)] mt-2">
                      {new Date(e.createdAt).toLocaleDateString()}
                    </div>
                  </button>
                  <button 
                    onClick={(evt) => { evt.stopPropagation(); handleDelete(e.id); }}
                    className="absolute right-2 top-3 p-1 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/10 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              {filteredEntries.length === 0 && (
                <div className="text-center py-10 text-[var(--text-secondary)] text-sm">
                  No entries found.
                </div>
              )}
            </div>
          </div>

          {/* Right Editor */}
          <div className="flex-1 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl flex flex-col overflow-hidden">
            {activeEntry ? (
              <>
                <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
                  <input 
                    type="text" 
                    value={activeEntry.title} 
                    onChange={(e) => {
                      const updated = [...entries];
                      const idx = updated.findIndex(ent => ent.id === activeId);
                      updated[idx].title = e.target.value;
                      setEntries(updated);
                    }}
                    placeholder="Entry Title"
                    className="bg-transparent text-lg font-bold text-[var(--text-primary)] outline-none w-full"
                  />
                  <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 text-sm text-[var(--accent)] hover:opacity-80 transition-opacity disabled:opacity-50"
                  >
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} 
                    Save
                  </button>
                </div>
                <textarea 
                  className="flex-1 w-full bg-transparent p-6 outline-none resize-none text-[var(--text-primary)] leading-relaxed"
                  placeholder="Tell your story..."
                  style={{
                    fontFamily: "var(--editor-font)",
                    fontSize: "var(--editor-font-size)",
                    fontVariantLigatures: "var(--editor-ligatures)"
                  }}
                  value={activeEntry.content}
                  onChange={(e) => {
                    const updated = [...entries];
                    const idx = updated.findIndex(ent => ent.id === activeId);
                    updated[idx].content = e.target.value;
                    setEntries(updated);
                  }}
                />
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-[var(--text-secondary)]">
                <BookOpen className="w-12 h-12 mb-4 opacity-10" />
                <p>Select or create an entry to start writing.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
