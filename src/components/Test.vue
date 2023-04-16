<template>
  <div>
    <p>{{ child.label }}</p>
    <button @click="handleClick(child)">Butt</button>
    <Test
      v-for="child in child.children"
      :key="child.id"
      :child="child"
      :parent="$parent"
      v-bind="$attrs"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  child: {
    type: Object,
    required: true,
  },
  parent: {
    type: Object,
    default: null,
  },
});
const emit = defineEmits(["child-clicked"]);

function handleClick(child) {
  if (props.parent) {
    props.parent.$emit("child-clicked", child);
  } else {
    emit("child-clicked", child);
  }
}
</script>
