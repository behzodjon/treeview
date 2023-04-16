<template>
  <div class="h-screen pt-10">
    <div class="container px-4">
      <div class="block p-6 bg-white rounded-lg shadow-xl dark:bg-neutral-700">
        <h5
          class="mb-2 text-xl font-medium leading-tight text-center text-neutral-800 dark:text-neutral-50"
        >
          Tree view component
        </h5>
        <div class="mb-2">
          <button
            @click="addNode"
            class="inline-flex items-center p-1 text-sm font-bold text-white bg-pink-500 rounded"
          >
            <i-mdi-plus-box width="20" height="20" color="white" />
            <span>Add node</span>
          </button>
        </div>
        <div v-for="node in nodes" :key="node.id">
          <TreeView :node="node" @select-node="onSelectNode" />
          <!-- <Test :child="node" @child-clicked="onAddNode" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import TreeView from "@/components/TreeView.vue";
import Test from "./components/Test.vue";
import { useTreeStore } from "@/store/treeViewStore";

const treeStore = useTreeStore();
const nodes = ref(treeStore.nodes); // define nodes as a ref

function onSelectNode(params) {
  console.log("Node params:", params);
}
function addNode() {
  treeStore.addNode();
}
onMounted(async () => {
  await treeStore.fetchNodes(); // fetch nodes on mount
  nodes.value = treeStore.nodes; // update nodes with the fetched data
});
</script>
