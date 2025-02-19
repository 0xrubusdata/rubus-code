// src/interfaces/project/tree.interface.ts
export interface ProjectTree {
  name: string;
  type: 'directory' | 'file';
  path: string;
  children?: ProjectTree[];
  classes?: ClassInfo[];
  functions?: FunctionInfo[];
  parseError?: boolean;
}

export interface ClassInfo {
  name: string;
  extends?: string;
  methods: FunctionInfo[];
}

export interface FunctionInfo {
  name: string;
  visibility: 'public' | 'protected' | 'private';
}