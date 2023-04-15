<template>
  <div class="h-screen pt-10">
    <div class="container px-4">
      <div class="block rounded-lg bg-white dark:bg-neutral-700 shadow-xl p-6">
        <h5
          class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 text-center"
        >
          Tree view component
        </h5>
        <div class="">
          <TreeView :nodes="nodes" />
        </div>
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

onMounted(async () => {
  await treeStore.fetchNodes(); // fetch nodes on mount
  nodes.value = treeStore.nodes; // update nodes with the fetched data
});
</script>
