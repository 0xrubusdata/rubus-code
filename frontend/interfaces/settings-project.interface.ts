export interface TreeNode {
    name: string;
    type: "file" | "directory";
    children?: TreeNode[];
    path?: string;
    classes?: any[];
    functions?: any[];
  }
  