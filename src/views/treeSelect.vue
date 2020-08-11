<template>
  <div>
    <h3>基本用法</h3>
    <a-tree-select
      v-model="value1"
      show-search
      style="width: 100%"
      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
      placeholder="Please select"
      allow-clear
      tree-default-expand-all
    >
      <a-tree-select-node key="0-1" value="parent 1" title="parent 1">
        <a-tree-select-node key="0-1-1" value="parent 1-0" title="parent 1-0">
          <a-tree-select-node key="random" :selectable="false" value="leaf1" title="my leaf" />
          <a-tree-select-node key="random1" value="leaf2" title="your leaf" />
        </a-tree-select-node>
        <a-tree-select-node key="random2" value="parent 1-1" title="parent 1-1">
          <a-tree-select-node key="random3" value="sss">
            <b slot="title" style="color: #08c">sss</b>
          </a-tree-select-node>
        </a-tree-select-node>
      </a-tree-select-node>
    </a-tree-select>
    <br />
    <br />
    <h3>加图标</h3>
    <a-tree-select
      v-model="value2"
      show-search
      style="width: 100%"
      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
      placeholder="Please select"
      allow-clear
      tree-default-expand-all
    >
      <a-icon slot="suffixIcon" type="smile" />
      <a-tree-select-node key="0-1" value="parent 1" title="parent 1">
        <a-tree-select-node key="0-1-1" value="parent 1-0" title="parent 1-0">
          <a-tree-select-node key="random" value="leaf1" title="my leaf" />
          <a-tree-select-node key="random1" value="leaf2" title="your leaf" />
        </a-tree-select-node>
        <a-tree-select-node key="random2" value="parent 1-1" title="parent 1-1">
          <a-tree-select-node key="random3" value="sss">
            <b slot="title" style="color: #08c">sss</b>
          </a-tree-select-node>
        </a-tree-select-node>
      </a-tree-select-node>
    </a-tree-select>
    <br />
    <br />
    <h3>多选的树选择</h3>
    <a-tree-select
      v-model="value"
      style="width: 100%"
      :tree-data="treeData"
      tree-checkable
      :show-checked-strategy="SHOW_PARENT"
      search-placeholder="Please select"
    />
    <br />

    <div style="margin-top:30px;">
      <h3>异步加载</h3>
      <a-tree-select
        v-model="value2"
        tree-data-simple-mode
        style="width: 100%"
        :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
        :tree-data="treeData1"
        placeholder="Please select"
        :load-data="onLoadData"
      />
    </div>
  </div>
</template>

<script>
import { TreeSelect } from 'ant-design-vue'
const SHOW_PARENT = TreeSelect.SHOW_PARENT
const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0'
      }
    ]
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0',
        disabled: true
      },
      {
        title: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1'
      },
      {
        title: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2'
      }
    ]
  }
]
export default {
  data () {
    return {
      treeExpandedKeys: [],
      value1: undefined,
      value2: undefined,
      value: ['0-0-0'],
      treeData,
      SHOW_PARENT,
      treeData1: [
        { id: 1, pId: 0, value: '1', title: 'Expand to load' },
        { id: 2, pId: 0, value: '2', title: 'Expand to load' },
        { id: 3, pId: 0, value: '3', title: 'Tree Node', isLeaf: true }
      ]
    }
  },
  methods: {
    genTreeNode (parentId, isLeaf = false) {
      const random = Math.random()
        .toString(36)
        .substring(2, 6)
      return {
        id: random,
        pId: parentId,
        value: random,
        title: isLeaf ? 'Tree Node' : 'Expand to load',
        isLeaf
      }
    },
    onLoadData (treeNode) {
      return new Promise(resolve => {
        const { id } = treeNode.dataRef
        setTimeout(() => {
          this.treeData = this.treeData.concat([
            this.genTreeNode(id, false),
            this.genTreeNode(id, true)
          ])
          resolve()
        }, 300)
      })
    }
  }
}
</script>
