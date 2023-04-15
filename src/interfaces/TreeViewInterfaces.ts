// Define an interface for the tree node
export interface TreeNode {
    id: number;
    label: string;
    checked: boolean;
    expanded: boolean;
    children?: TreeNode[];
}

// Define an interface for the props of the TreeView component
export interface TreeViewProps {
    nodes: TreeNode[];
    checkboxLabel: string;
    itemLabel: string;
}
