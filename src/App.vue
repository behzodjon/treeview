<template>
  <div class="h-screen pt-10">
    <div class="container px-4">
      <div class="block p-6 bg-white rounded-lg shadow-xl dark:bg-neutral-700">
        <h5
          class="mb-2 text-xl font-medium leading-tight text-center text-neutral-800 dark:text-neutral-50"
        >
          Tree view component
        </h5>

        <TreeView :nodes="nodes" @add-node="onAddNode" />
      </div>
      <!-- <Test /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import TreeView from "./components/TreeView.vue";
import Test from "./components/Test.vue";
import { useTreeStore } from "./store/treeViewStore";

const treeStore = useTreeStore();
const nodes = ref(treeStore.nodes); // define nodes as a ref

function onAddNode(params) {
  console.log("Node params:", params);
}

onMounted(async () => {
  await treeStore.fetchNodes(); // fetch nodes on mount
  nodes.value = treeStore.nodes; // update nodes with the fetched data
});
</script>
