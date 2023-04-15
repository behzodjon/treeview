import { defineStore } from 'pinia';
import { TreeNode } from '../interfaces/TreeViewInterfaces';

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

        addNode(label: string) {
            const newNode = {
                id: String(Date.now()),
                label,
                expanded: false,
                checked: false,
                editing: false,
                children: [] as TreeNode[],
            };

            this.nodes.push(newNode);
        },
    },
});
