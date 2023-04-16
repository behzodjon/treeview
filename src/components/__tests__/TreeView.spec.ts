import { describe, it, expect } from "vitest";
import TreeViewVue from "@/components/TreeView.vue";
import { mount } from "@vue/test-utils";


describe('TreeView', () => {
    it('renders a node with label', async () => {
        const node = { id: '1', label: 'Node 1', children: [] }
        const wrapper = mount(TreeViewVue, { props: { node } })

        expect(wrapper.text()).toContain('Node 1')
    })
})
