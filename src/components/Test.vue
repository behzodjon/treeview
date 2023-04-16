<template>
  <div class="tree">
    <ul>
      <li>
        <input type="checkbox" id="check-1" class="hidden" />
        <label for="check-1" class="label">
          <span class="text-gray-800 font-medium">Category 1</span>
          <span class="ml-2 text-gray-600 text-sm">(3)</span>
        </label>
        <ul class="nested">
          <li>
            <input type="checkbox" id="check-1-1" class="hidden" />
            <label for="check-1-1" class="label">
              <span class="text-gray-800">Subcategory 1.1</span>
              <span class="ml-2 text-gray-600 text-sm">(2)</span>
            </label>
            <ul class="nested">
              <li>
                <span class="text-gray-800">Item 1.1.1</span>
              </li>
              <li>
                <span class="text-gray-800">Item 1.1.2</span>
              </li>
            </ul>
          </li>
          <li>
            <span class="text-gray-800">Subcategory 1.2</span>
          </li>
          <li>
            <span class="text-gray-800">Subcategory 1.3</span>
          </li>
        </ul>
      </li>
      <li>
        <input type="checkbox" id="check-2" class="hidden" />
        <label for="check-2" class="label">
          <span class="text-gray-800 font-medium">Category 2</span>
          <span class="ml-2 text-gray-600 text-sm">(1)</span>
        </label>
        <ul class="nested">
          <li>
            <span class="text-gray-800">Item 2.1</span>
          </li>
        </ul>
      </li>
      <li>
        <span class="text-gray-800">Category 3</span>
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
/.tree {
  margin: 0;
  padding: 0;
}

.tree > ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.tree > ul > li {
  margin: 0;
  padding: 0 0 0 1.5rem;
  position: relative;
}

.tree > ul > li::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 1px;
  background-color: #cbd5e0;
}

.tree > ul > li:first-child::before {
  top: 12px;
}

.tree > ul > li:last-child::before {
  height: 12px;
}

.tree li input[type="checkbox"] {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
  height: 1rem;
  width: 1rem;
}

.tree li input[type="checkbox"]:focus + .label {
  outline: none;
}

.tree li input[type="checkbox"]:checked ~ .nested {
  display: block;
}

.tree li input[type="checkbox"]:checked + .label::before {
  content: "\f00c";
}
</style>
