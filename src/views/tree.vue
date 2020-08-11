<template>
  <div style="display:flex;">
    <div style="margin-right:100px;">
      <h3>受控操作示例 </h3>
      <a-tree
        v-model="checkedKeys"
        checkable
        :expanded-keys="expandedKeys"
        :auto-expand-parent="autoExpandParent"
        :selected-keys="selectedKeys"
        :tree-data="treeData"
        @expand="onExpand"
        @select="onSelect"
      />
    </div>
    <div>
      <div>
        <h3>连接线</h3>
        <div style="margin-bottom: 16px">
          showLine:
          <a-switch v-model="showLine" />
          <br />
          <br />showIcon:
          <a-switch v-model="showIcon" />
        </div>
        <a-tree
          :show-line="showLine"
          :show-icon="showIcon"
          :default-expanded-keys="['0-0-0', '0-0-1', '0-0-2']"
          @select="onSelect"
        >
          <a-icon slot="icon" type="carry-out" />
          <a-tree-node key="0-0">
            <a-icon slot="icon" type="carry-out" />
            <span slot="title" style="color: #1890ff">parent 1</span>
            <a-tree-node key="0-0-0" title="parent 1-0">
              <a-icon slot="icon" type="carry-out" />
              <a-tree-node key="0-0-0-0" title="leaf">
                <a-icon slot="icon" type="carry-out" />
              </a-tree-node>
              <a-tree-node key="0-0-0-1" title="leaf">
                <a-icon slot="icon" type="carry-out" />
              </a-tree-node>
              <a-tree-node key="0-0-0-2" title="leaf">
                <a-icon slot="icon" type="carry-out" />
              </a-tree-node>
            </a-tree-node>
            <a-tree-node key="0-0-1" title="parent 1-1">
              <a-icon slot="icon" type="carry-out" />
              <a-tree-node key="0-0-1-0" title="leaf">
                <a-icon slot="icon" type="carry-out" />
              </a-tree-node>
            </a-tree-node>
            <a-tree-node key="0-0-2" title="parent 1-2">
              <a-icon slot="icon" type="carry-out" />
              <a-tree-node key="0-0-2-0" title="leaf">
                <a-icon slot="icon" type="carry-out" />
              </a-tree-node>
              <a-tree-node key="0-0-2-1" title="leaf">
                <a-icon slot="icon" type="carry-out" />
                <a-icon slot="switcherIcon" type="form" />
              </a-tree-node>
            </a-tree-node>
          </a-tree-node>
        </a-tree>
      </div>
    </div>
    <div style="margin-left:100px;">
      <h3>目录 </h3>
      <a-directory-tree multiple default-expand-all @select="onSelect1" @expand="onExpand1">
        <a-tree-node key="1-0" title="parent 0">
          <a-tree-node key="1-0-0" title="leaf 0-0" is-leaf />
          <a-tree-node key="1-0-1" title="leaf 0-1" is-leaf />
        </a-tree-node>
        <a-tree-node key="1-1" title="parent 1">
          <a-tree-node key="1-1-0" title="leaf 1-0" is-leaf />
          <a-tree-node key="1-1-1" title="leaf 1-1" is-leaf />
        </a-tree-node>
      </a-directory-tree>
    </div>
  </div>
</template>
<script>
const treeData = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' }
        ]
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' }
        ]
      },
      {
        title: '0-0-2',
        key: '0-0-2'
      }
    ]
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' }
    ]
  },
  {
    title: '0-2',
    key: '0-2'
  }
]

export default {
  data () {
    return {
      expandedKeys: ['0-0-0', '0-0-1'],
      autoExpandParent: true,
      checkedKeys: ['0-0-0'],
      selectedKeys: [],
      treeData,
      showLine: true,
      showIcon: false
    }
  },
  watch: {
    checkedKeys (val) {
      console.log('onCheck', val)
    }
  },
  methods: {

    onSelect (selectedKeys, info) {
      console.log('selected', selectedKeys, info)
    },
    onExpand (expandedKeys) {
      console.log('onExpand', expandedKeys)
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onExpand1 (expandedKeys) {
      console.log('onExpand', expandedKeys)
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      // this.expandedKeys = expandedKeys
      // this.autoExpandParent = false
    },
    onCheck (checkedKeys) {
      console.log('onCheck', checkedKeys)
      this.checkedKeys = checkedKeys
    },
    onSelect1 (selectedKeys, info) {
      console.log('onSelect', info)
      // this.selectedKeys = selectedKeys
    }
  }
}
</script>
