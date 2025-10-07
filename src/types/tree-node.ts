export interface TreeNode {
  label: string;
  children?: TreeNode[];
  /**
   * It is set automatically when passing children to a child tree.
   */
  parent?: TreeNode;
}