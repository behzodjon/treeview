import { defineStore } from 'pinia';
import { TreeNode } from '@/types/TreeNode';

function createNewNode(): TreeNode {
    return {
        id: String(Date.now()),
        label: 'new node',
        expanded: false,
        checked: false,
        editing: false,
        children: [] as TreeNode[],
    };
}

export const useTreeStore = defineStore({
    id: 'tree',
    state: () => ({
        nodes: [] as TreeNode[],
    }),
    actions: {
        async fetchNodes() {
            const response = await fetch(new URL('@/assets/data.json', import.meta.url));
            const data = await response.json();
            this.nodes = data;
        },

        addNodeToCurrentLevel(parentNode: TreeNode) {
            const newNode = createNewNode();
            parentNode.children?.push(newNode);
        },

        addNode() {
            const newNode = createNewNode();
            this.nodes = [...this.nodes, newNode];
        }

    },
});
