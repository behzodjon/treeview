<template>
  <div>
    <ul class="pl-4">
      <li class="mb-2">
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
              :id="node.id.toString()"
              class="mr-1 w-5 h-5 text-[#e3165b] rounded-[2px] focus:ring-0 border-[2px] border-solid border-[#757575]"
              @change="checkAllChildren(node)"
            />
            <input
              v-if="node.editing"
              type="text"
              :value="node.label"
              @input="(event) => editNodeLabel((event.target as HTMLInputElement).value, node)"
              @blur="toggleEditing(node)"
              class="mr-2 p-[2px] h-[22px]"
            />
            <span v-else :for="node.id" class="ml-2 cursor-pointer">
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
          <TreeView
            v-for="nodeChild in node.children"
            :key="node.id"
            :node="nodeChild"
            :parent="$parent"
            v-bind="$attrs"
          />
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { TreeNode } from "../types/TreeNode";
import { useTreeStore } from "../store/treeViewStore";
import { defineProps, ComponentPublicInstance } from "vue";

const props = defineProps({
  node: {
    type: Object as () => TreeNode,
    required: true,
  },
  parent: {
    type: Object as () => ComponentPublicInstance | null,
    default: null,
  },
});

const emit = defineEmits(["add-node"]);

const store = useTreeStore();

const editNodeLabel = (newLabel: string, node: TreeNode) => {
  store.editNodeLabel(newLabel, node);
};

const addNodeToCurrentLevel = (node: TreeNode) => {
  node.expanded = true;
  store.addNodeToCurrentLevel(node);
};

const toggleExpand = (node: TreeNode) => {
  node.expanded = !node.expanded;
};

const checkAllChildren = (node: TreeNode) => {
  node.checked = !node.checked;
  if (node.children) {
    node.children.forEach((child: TreeNode) => {
      checkAllChildren(child);
    });
  }

  if (props.parent) {
    props.parent.$emit("add-node", node);
  } else {
    emit("add-node", node);
  }
};

const hasIndeterminateState = (node: TreeNode) => {
  if (!node.children || node.children.length === 0) {
    return false; // no children, default to unchecked
  }

  const checkedCount = node.children.filter((child) => child.checked).length;
  const uncheckedCount = node.children.length - checkedCount;

  return checkedCount > 0 && uncheckedCount > 0;
};

const toggleEditing = (node: TreeNode) => {
  node.editing = !node.editing;
};
</script>

<style scoped></style>
