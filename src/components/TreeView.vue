<template>
  <div class="tree-view bg-violet-400">
    <ul>
      <li v-for="node in nodes" :key="node.id">
        <div class="flex items-center">
          <span
            class="toggle-button mr-2"
            :class="{ 'toggle-button--expanded': node.expanded }"
            @click="toggleExpand(node)"
            >{{ node.children ? (node.expanded ? "-" : "+") : "" }}</span
          >
          <input
            type="checkbox"
            :checked="node.checked"
            :indeterminate="hasIndeterminateState(node)"
            :id="node.id"
            class="mr-2"
            @change="checkAllChildren(node)"
          />
          <label :for="node.id" class="cursor-pointer">{{ node.label }}</label>
        </div>
        <ul v-if="node.expanded && node.children">
          <TreeView :nodes="node.children" :ref="node.id" />
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { TreeNode, TreeViewProps } from "../interfaces/TreeViewInterfaces";

export default {
  name: "TreeView",
  props: {
    nodes: {
      type: Array as () => TreeNode[],
      required: true,
    },
  },
  computed: {
    allChildrenChecked(): boolean {
      return this.nodes.every((node) => node.checked);
    },
  },

  methods: {
    toggleExpand(node: TreeNode): void {
      node.expanded = !node.expanded;
    },
    checkAllChildren(node: TreeNode): void {
      node.checked = !node.checked;
      if (node.children) {
        node.children.forEach((child: TreeNode) => {
          this.checkAllChildren(child);
        });
      }
    },
    hasIndeterminateState(node: TreeNode): boolean {
      if (!node.children || node.children.length === 0) {
        return false; // no children, default to unchecked
      }

      const checkedCount = node.children.filter(
        (child) => child.checked
      ).length;
      const uncheckedCount = node.children.length - checkedCount;

      return checkedCount > 0 && uncheckedCount > 0;
    },
  },
};
</script>

<style scoped>
.tree-view ul {
  list-style: none;
  padding-left: 1rem;
}

.tree-view .toggle-button {
  font-size: 1rem;
  cursor: pointer;
}
</style>
