<template>
  <div>
    <input
      type="checkbox"
      v-model="parentCheckboxState"
      @change="updateParentState"
    />
    <span :class="{ 'partially-selected': parentCheckboxState === null }"
      >-</span
    >
    <ul>
      <li v-for="(childCheckbox, index) in childCheckboxes" :key="index">
        <input
          type="checkbox"
          v-model="childCheckbox.checked"
          @change="updateChildState"
        />
        <label>{{ childCheckbox.label }}</label>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      parentCheckboxState: false,
      childCheckboxes: [
        { label: "Child 1", checked: false },
        { label: "Child 2", checked: false },
        { label: "Child 3", checked: false },
      ],
    };
  },
  computed: {
    computedParentCheckboxState() {
      const checkedCount = this.childCheckboxes.filter((c) => c.checked).length;
      if (checkedCount === 0) {
        return false;
      } else if (checkedCount === this.childCheckboxes.length) {
        return true;
      } else {
        return null;
      }
    },
  },
  methods: {
    updateParentState() {
      if (this.parentCheckboxState === null) {
        this.parentCheckboxState = false;
      } else {
        this.childCheckboxes.forEach(
          (c) => (c.checked = this.parentCheckboxState)
        );
      }
    },
    updateChildState() {
      this.parentCheckboxState = this.computedParentCheckboxState;
    },
  },
};
</script>

<style>
.partially-selected {
  color: orange;
}
</style>
