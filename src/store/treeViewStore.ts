import { defineStore } from 'pinia';
import { TreeNode } from '../types/TreeNode';

export const useTreeStore = defineStore({
    id: 'tree',
    state: () => ({
        nodes: [] as TreeNode[],
    }),
    actions: {
        async fetchNodes() {
            const response = await fetch(new URL('../assets/data.json', import.meta.url));
            const data = await response.json();
            this.nodes = data;
        },

        addNodeToCurrentLevel(parentNode: TreeNode) {
            const newNode = {
                id: String(Date.now()),
                label: 'new node',
                expanded: false,
                checked: false,
                editing: false,
                children: [] as TreeNode[],
            };
            parentNode.children?.push(newNode);
        },
        editNodeLabel(newLabel: string, node: TreeNode): void {
            const updatedNode = { ...node, label: newLabel };

            const findNode = (id: string, nodes: TreeNode[]): TreeNode | null => {
                for (const n of nodes) {
                    if (n.id === id) {
                        return n;
                    } else if (n.children) {
                        const foundNode = findNode(id, n.children);
                        if (foundNode) return foundNode;
                    }
                }
                return null;
            };

            const foundNode = findNode(node.id, this.nodes);
            if (foundNode) Object.assign(foundNode, updatedNode);
        }

    },
});
