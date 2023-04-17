<template>
  <div class="h-screen pt-10">
    <div class="container px-4">
      <div class="block p-6 bg-white rounded-lg shadow-xl">
        <h5
          class="mb-2 text-xl font-medium leading-tight text-center text-neutral-800"
        >
          Tree view component
        </h5>

        <div class="mb-2">
          <button
            @click="treeStore.addNode"
            class="inline-flex items-center p-1 text-sm font-bold text-white bg-pink-500 rounded"
          >
            <i-mdi-plus-box width="20" height="20" color="white" />
            <span>Add node</span>
          </button>
        </div>

        <div v-for="node in treeStore.nodes" :key="node.id">
          <TreeView :node="node" @select-node="onSelectNode" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TreeView from "@/components/TreeView.vue";
import { onMounted } from "vue";
import { useTreeStore } from "@/stores/treeView";
import { TreeNode } from "@/types/TreeNode";

const treeStore = useTreeStore();

const onSelectNode = (params: TreeNode) => {
  console.log("Node params:", params);
};

onMounted(async () => {
  await treeStore.fetchNodes();
  treeStore.loadFromQuery();
});
</script>
