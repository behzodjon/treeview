export interface TreeNode {
    id: string;
    label: string;
    checked: boolean;
    editing: boolean;
    expanded: boolean;
    children?: TreeNode[];
}


