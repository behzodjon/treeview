// Define an interface for the tree node
export interface TreeNode {
    id: string;
    label: string;
    checked: boolean;
    editing: boolean;
    expanded: boolean;
    children?: TreeNode[];
}


