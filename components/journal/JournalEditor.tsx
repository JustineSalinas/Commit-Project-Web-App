"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Highlight from '@tiptap/extension-highlight';
import { common, createLowlight } from 'lowlight';

const lowlight = createLowlight(common);

export function JournalEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // We use CodeBlockLowlight instead
      }),
      Placeholder.configure({
        placeholder: 'Write your technical log here...',
        emptyEditorClass: 'is-editor-empty',
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Highlight.configure({
        multicolor: true,
      })
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-sm sm:prose-base focus:outline-none max-w-none w-full min-h-[500px] text-[#FAFAFA]',
      },
    },
    onUpdate: ({ editor }) => {
      // Future state sync logic goes here (e.g., Zustand auto-save)
    }
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full flex flex-col h-full bg-[#111113] border border-[#1A1A1F] rounded-xl overflow-hidden">
      {/* Basic Editor Toolbar */}
      <div className="flex border-b border-[#1A1A1F] bg-[#09090B] p-2 gap-2 flex-wrap">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
            editor.isActive('bold') ? 'bg-[#18181B] text-[#00FFAA]' : 'text-[#A1A1AA] hover:bg-[#18181B] hover:text-[#FAFAFA]'
          }`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
            editor.isActive('italic') ? 'bg-[#18181B] text-[#00FFAA]' : 'text-[#A1A1AA] hover:bg-[#18181B] hover:text-[#FAFAFA]'
          }`}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
            editor.isActive('codeBlock') ? 'bg-[#18181B] text-[#00FFAA]' : 'text-[#A1A1AA] hover:bg-[#18181B] hover:text-[#FAFAFA]'
          }`}
        >
          Code Block
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
            editor.isActive('heading', { level: 2 }) ? 'bg-[#18181B] text-[#00FFAA]' : 'text-[#A1A1AA] hover:bg-[#18181B] hover:text-[#FAFAFA]'
          }`}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
            editor.isActive('bulletList') ? 'bg-[#18181B] text-[#00FFAA]' : 'text-[#A1A1AA] hover:bg-[#18181B] hover:text-[#FAFAFA]'
          }`}
        >
          Bullet List
        </button>
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 p-6 overflow-y-auto tiptap-wrapper">
        <style dangerouslySetInnerHTML={{__html: `
          .tiptap-wrapper .ProseMirror p.is-editor-empty:first-child::before {
            content: attr(data-placeholder);
            float: left;
            color: #71717A;
            pointer-events: none;
            height: 0;
          }
          .tiptap-wrapper pre {
            background: #09090B;
            padding: 1rem;
            border-radius: 0.5rem;
            border: 1px solid #27272A;
            font-family: monospace;
            overflow-x: auto;
            margin-top: 1rem;
            margin-bottom: 1rem;
          }
          .tiptap-wrapper code {
            font-family: monospace;
            color: #00FFAA;
          }
          .tiptap-wrapper p {
            margin-bottom: 0.75rem;
          }
          .tiptap-wrapper h1, .tiptap-wrapper h2, .tiptap-wrapper h3 {
            color: #FAFAFA;
            font-weight: 700;
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
          }
          .tiptap-wrapper h2 {
            font-size: 1.5rem;
          }
          .tiptap-wrapper ul {
            list-style-type: disc;
            padding-left: 1.5rem;
            margin-bottom: 1rem;
          }
        `}} />
        <EditorContent editor={editor} className="h-full" />
      </div>
    </div>
  );
}
