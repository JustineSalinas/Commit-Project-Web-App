import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeMode = 'dark' | 'light' | 'system';

interface SettingsState {
  theme: ThemeMode;
  accentColor: string;
  fontFamily: string;
  fontSize: string;
  tabWidth: string;
  lineNumbers: boolean;
  wordWrap: boolean;
  ligatures: boolean;
  aiEnabled: boolean;
  autoSuggest: boolean;
  aiModel: string;
  
  setTheme: (theme: ThemeMode) => void;
  setAccentColor: (color: string) => void;
  setFontFamily: (font: string) => void;
  setFontSize: (size: string) => void;
  setTabWidth: (width: string) => void;
  setLineNumbers: (enabled: boolean) => void;
  setWordWrap: (enabled: boolean) => void;
  setLigatures: (enabled: boolean) => void;
  setAiEnabled: (enabled: boolean) => void;
  setAutoSuggest: (enabled: boolean) => void;
  setAiModel: (model: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'dark',
      accentColor: '#00FFAA',
      fontFamily: 'jetbrains-mono',
      fontSize: '14',
      tabWidth: '2',
      lineNumbers: true,
      wordWrap: false,
      ligatures: true,
      aiEnabled: true,
      autoSuggest: true,
      aiModel: 'claude-sonnet-4',

      setTheme: (theme) => set({ theme }),
      setAccentColor: (color) => set({ accentColor: color }),
      setFontFamily: (fontFamily) => set({ fontFamily }),
      setFontSize: (fontSize) => set({ fontSize }),
      setTabWidth: (tabWidth) => set({ tabWidth }),
      setLineNumbers: (lineNumbers) => set({ lineNumbers }),
      setWordWrap: (wordWrap) => set({ wordWrap }),
      setLigatures: (ligatures) => set({ ligatures }),
      setAiEnabled: (aiEnabled) => set({ aiEnabled }),
      setAutoSuggest: (autoSuggest) => set({ autoSuggest }),
      setAiModel: (aiModel) => set({ aiModel }),
    }),
    {
      name: 'commit-settings-storage',
    }
  )
);
