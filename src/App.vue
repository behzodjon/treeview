<template>
  <div class="container">
    <TreeView :nodes="nodes" />
    <!-- <Test /> -->
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import TreeView from "./components/TreeView.vue";
import Test from "./components/Test.vue";
const nodes = ref([
  {
    id: "1",
    label: "Node 1",
    expanded: false,
    children: [
      {
        id: "2",
        label: "Node 1.1",
        expanded: false,

        children: [
          {
            id: "4",
            label: "Node 1.1.1",
            expanded: false,

            children: [],
          },
          {
            id: "5",
            label: "Node 1.1.2",
            expanded: false,

            children: [],
          },
        ],
      },
      {
        id: "3",
        label: "Node 1.2",
        expanded: false,

        children: [
          {
            id: "6",
            label: "Node 1.2.1",
            expanded: false,

            children: [],
          },
          {
            id: "7",
            label: "Node 1.2.2",
            expanded: false,

            children: [
              {
                id: "9",
                label: "Node 1.2.2.1",
                children: [],
              },
            ],
          },
          {
            id: "8",
            label: "Node 1.2.3",
            expanded: false,

            children: [],
          },
        ],
      },
    ],
  },
  {
    id: "10",
    label: "Node 2",
    expanded: false,
    children: [],
  },
  {
    id: "11",
    label: "Node 3",
    expanded: false,
    children: [
      {
        id: "12",
        label: "Node 3.1",
        expanded: false,
        children: [
          {
            id: "13",
            label: "Node 3.1.1",
            expanded: false,
            children: [],
          },
        ],
      },
      {
        id: "14",
        label: "Node 3.2",
        expanded: false,
        children: [],
      },
    ],
  },
]);
</script>
