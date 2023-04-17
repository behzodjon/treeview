import { defineStore } from 'pinia';
import { TreeNode } from '@/types/TreeNode';
import { useRouter } from 'vue-router';

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
        router: useRouter(),

        async fetchNodes() {
            const response = await fetch(new URL('@/assets/data.json', import.meta.url));
            this.nodes = await response.json();
        },

        addNodeToCurrentLevel(parentNode: TreeNode) {
            const newNode = createNewNode();
            parentNode.children?.push(newNode);
            this.addNodeToQuery(newNode.id);
        },

        addNode() {
            const newNode = createNewNode();
            this.nodes = [...this.nodes, newNode];
            this.addNodeToQuery(newNode.id);
        },

        addNodeToQuery(nodeId: string) {
            const currentQuery = this.router.currentRoute.value.query;
            const newNodeIds = currentQuery.items ? currentQuery.items + ',' + nodeId : nodeId;
            this.router.replace({ query: { items: newNodeIds } });
        },

        loadFromQuery() {
            const currentQuery = this.router.currentRoute.value.query;
            if (currentQuery.items) {
                const nodeIds = currentQuery.items.split(',');
                const newNodes = nodeIds.map((id: string) => createNewNode());
                this.nodes = [...this.nodes, ...newNodes];
            }
        },
    },
});
