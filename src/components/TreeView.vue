<template>
  <div class="tree-view">
    <ul>
      <li v-for="node in nodes" :key="node.id" class="mb-2">
        <div class="flex items-center">
          <span class="cursor-pointer" @click="toggleExpand(node)">
            <i-mdi-chevron-down v-if="node.expanded" width="24" height="24" />
            <i-mdi-chevron-right v-else width="24" height="24" />
          </span>
          <label class="inline-flex items-center">
            <input
              type="checkbox"
              :checked="node.checked"
              :indeterminate="hasIndeterminateState(node)"
              :id="node.id"
              class="mr-1 w-5 h-5 text-[#e3165b] rounded-[2px] focus:ring-0 border-[2px] border-solid border-[#757575]"
              @change="checkAllChildren(node)"
            />
            <input
              v-if="node.editing"
              type="text"
              :value="node.label"
              @input="editNodeLabel($event.target.value, node)"
              @blur="toggleEditing(node)"
              class="mr-2 p-[2px] h-[22px]"
            />
            <span v-else :for="node.id" class="cursor-pointer ml-2">
              {{ node.label }}
            </span>
          </label>
          <div class="flex items-center">
            <button @click="addNodeToCurrentLevel(node)">
              <i-mdi-plus-box width="20" height="20" />
            </button>
            <button @click="toggleEditing(node)">
              <i-mdi-pencil-box width="20" height="20" />
            </button>
          </div>
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
import { defineComponent } from "vue";
import { useTreeStore } from "../store/treeViewStore";
export default defineComponent({
  name: "TreeView",
  props: {
    nodes: {
      type: Array as () => TreeNode[],
      required: true,
    },
  },

  setup() {
    const store = useTreeStore();
    const editNodeLabel = (newLabel, id) => {
      store.editNodeLabel(newLabel, id);
    };
    const addNodeToCurrentLevel = (node) => {
      node.expanded = true;
      store.addNodeToCurrentLevel(node);
    };
    return {
      editNodeLabel,
      addNodeToCurrentLevel,
    };
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
    toggleEditing(node: TreeNode): void {
      node.editing = !node.editing;
    },
  },
});
</script>

<style scoped>
.tree-view ul {
  list-style: none;
  padding-left: 1rem;
}
</style>
