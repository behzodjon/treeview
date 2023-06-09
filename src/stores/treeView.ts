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
            this.nodes = await response.json();
        },

        addNodeToCurrentLevel(parentNode: TreeNode) {
            const newNode = createNewNode();
            parentNode.children?.push(newNode);
            this.addNodeToQuery(parentNode.id);
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
                this.findObjectsById(this.nodes, nodeIds);
            }
        },

        findObjectsById(data: TreeNode[], idsToFind: []) {
            const foundIds = [];
            for (const obj of data) {
                if (idsToFind.includes(obj.id)) {
                    obj.children?.push(createNewNode());
                    foundIds.push(obj.id);
                }
                if (obj.children && obj.children.length) {
                    this.findObjectsById(obj.children, idsToFind);
                }
            }
            console.log(foundIds)

        }

    },
});
