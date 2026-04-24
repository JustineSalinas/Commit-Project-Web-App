"use client";

import { useState, useEffect, useCallback } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import hljs from "highlight.js";
import 'highlight.js/styles/github-dark.css'; // or your preferred theme
import { updateTask } from "@/app/actions/crud";

interface SplitPaneEditorProps {
  task: any;
}

export function SplitPaneEditor({ task }: SplitPaneEditorProps) {
  const [content, setContent] = useState(task.notes || "");
  const [html, setHtml] = useState("");

  // Update internal state if a new task is selected
  useEffect(() => {
    setContent(task.notes || "");
  }, [task.id, task.notes]);

  // Render markdown with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      // Configure marked to use highlight.js
      marked.setOptions({
        highlight: function(code, lang) {
          const language = hljs.getLanguage(lang) ? lang : 'plaintext';
          return hljs.highlight(code, { language }).value;
        },
        langPrefix: 'hljs language-',
      });

      const rawHtml = marked.parse(content) as string;
      const sanitizedHtml = DOMPurify.sanitize(rawHtml);
      setHtml(sanitizedHtml);
      
      // Auto-save to DB
      if (content !== task.notes) {
        updateTask(task.id, { notes: content });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [content, task.id, task.notes]);

  return (
    <div className="flex h-full border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--bg-surface)]">
      {/* Raw Editor Pane */}
      <div className="w-1/2 border-r border-[var(--border)] flex flex-col">
        <div className="px-4 py-2 border-b border-[var(--border)] bg-[var(--bg-base)] text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">
          Markdown Source
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 w-full p-4 bg-transparent text-[var(--text-primary)] outline-none resize-none font-mono text-sm leading-relaxed"
          placeholder="Start writing notes for this task..."
        />
      </div>

      {/* Rendered Preview Pane */}
      <div className="w-1/2 flex flex-col bg-[var(--bg-elevated)]">
        <div className="px-4 py-2 border-b border-[var(--border)] bg-[var(--bg-base)] text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">
          Preview
        </div>
        <div 
          className="flex-1 p-6 overflow-y-auto prose prose-invert prose-sm max-w-none text-[var(--text-primary)] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
