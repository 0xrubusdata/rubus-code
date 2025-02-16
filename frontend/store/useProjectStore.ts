// useProjectStore.ts
import { create } from 'zustand';

interface ProjectStore {
  projectLoaded: boolean;
  setProjectLoaded: () => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projectLoaded: false,
  setProjectLoaded: () => set({ projectLoaded: true }),
}));
