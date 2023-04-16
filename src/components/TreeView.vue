<template>
  <div>
    <ul class="pl-4">
      <li>
        <div class="flex items-center mb-2 cursor-pointer group">
          <!--  Expand/Collapse Icon Container -->
          <div>
            <span v-if="node.children?.length" @click="toggleExpand(node)">
              <i-mdi-chevron-down v-if="node.expanded" width="24" height="24" />
              <i-mdi-chevron-right v-else width="24" height="24" />
            </span>
          </div>

          <!--  Checkbox and Label Container  -->
          <div
            class="inline-flex items-center gap-1"
            :class="{ 'ml-6': !node.children?.length }"
          >
            <input
              type="checkbox"
              :checked="node.checked"
              :indeterminate="hasIndeterminateState(node)"
              :id="node.id"
              @change="checkAllChildren(node)"
            />

            <!-- Editable Label Input -->
            <input
              v-if="node.editing"
              type="text"
              :value="node.label"
              @input="(event) => editNodeLabel((event.target as HTMLInputElement).value, node)"
              @keydown.enter="toggleEditing(node)"
              class="p-[2px] h-[22px]"
            />

            <label v-else :for="node.id">
              {{ node.label }}
            </label>
          </div>

          <!--  Actions Container  -->
          <div class="flex items-center opacity-0 group-hover:opacity-100">
            <button @click="addNodeToCurrentLevel(node)">
              <i-mdi-plus-box width="20" height="20" />
            </button>

            <button @click="toggleEditing(node)">
              <i-mdi-pencil-box width="20" height="20" />
            </button>
          </div>
        </div>

        <!--  Child Nodes Container -->
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
import { TreeNode } from "@/types/TreeNode";
import { useTreeStore } from "@/store/treeViewStore";
import { ComponentPublicInstance } from "vue";

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

const emit = defineEmits(["select-node"]);

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
    props.parent.$emit("select-node", node);
  } else {
    emit("select-node", node);
  }
};

const hasIndeterminateState = (node: TreeNode) => {
  if (!node.children || node.children.length === 0) {
    return false;
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
