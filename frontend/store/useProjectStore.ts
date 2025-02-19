// src/store/useProjectStore.ts
import { TreeNode } from '@/interfaces/settings-project.interface';
import { create } from 'zustand';

interface ProjectState {
  projectLoaded: boolean;
  projectData: { 
    language: string; 
    dependencies: JSON; 
    tree: TreeNode
  } | null;
  setProjectLoaded: () => void;
  setProjectData: (data: { language: string; dependencies: JSON; tree: TreeNode }) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projectLoaded: false,
  projectData: null,
  setProjectLoaded: () => set({ projectLoaded: true }),
  setProjectData: (data) => set({ projectData: data }),
}));
