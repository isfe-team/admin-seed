<template>
  <div>
    <div>
      <h3>基本用法</h3>
      <a-transfer
        :data-source="mockData"
        :titles="['Source', 'Target']"
        :target-keys="targetKeys"
        :selected-keys="selectedKeys"
        :render="item => item.title"
        :disabled="disabled"
        @change="handleChange"
        @selectChange="handleSelectChange"
        @scroll="handleScroll"
      />
      <a-switch
        un-checked-children="enabled"
        checked-children="disabled"
        :checked="disabled"
        style="margin-top: 16px"
        @change="handleDisable"
      />
    </div>
    <div style="margin-top:30px;">
      <h3>带搜索框</h3>
      <a-transfer
        :data-source="mockDataDemo"
        show-search
        :filter-option="filterOption"
        :target-keys="targetKeys_1"
        :render="item => item.title"
        @change="handleChange_1"
        @search="handleSearch"
      />
    </div>
    <div  style="margin-top:30px;">
      <h3>树穿梭框</h3>
      <a-transfer
        class="tree-transfer"
        :data-source="dataSource"
        :target-keys="targetKeysDemo"
        :render="item => item.title"
        :show-select-all="false"
        @change="onChange"
      >
        <template
          slot="children"
          slot-scope="{
          props: { direction, selectedKeys },
          on: { itemSelect },
        }"
        >
          <a-tree
            v-if="direction === 'left'"
            blockNode
            checkable
            checkStrictly
            defaultExpandAll
            :checkedKeys="[...selectedKeys, ...targetKeysDemo]"
            :treeData="treeData"
            @check="(_, props) => {onChecked(_, props, [...selectedKeys, ...targetKeysDemo],itemSelect)}"
            @select="(_, props) => {onChecked(_, props, [...selectedKeys, ...targetKeysDemo],itemSelect)}"
          />
        </template>
      </a-transfer>
    </div>
  </div>
</template>
<script>
const treeData = [
  { key: '0-0', title: '0-0' },
  {
    key: '0-1',
    title: '0-1',
    children: [{ key: '0-1-0', title: '0-1-0' }, { key: '0-1-1', title: '0-1-1' }]
  },
  { key: '0-2', title: '0-3' }
]

const transferDataSource = []
function flatten (list = []) {
  list.forEach(item => {
    transferDataSource.push(item)
    flatten(item.children)
  })
}
flatten(JSON.parse(JSON.stringify(treeData)))

function isChecked (selectedKeys, eventKey) {
  return selectedKeys.indexOf(eventKey) !== -1
}

function handleTreeData (data, targetKeys = []) {
  data.forEach(item => {
    item['disabled'] = targetKeys.includes(item.key)
    if (item.children) {
      handleTreeData(item.children, targetKeys)
    }
  })
  return data
}

export default {
  data () {
    const mockData = []
    let mockDataDemo = []
    for (let i = 0; i < 20; i++) {
      mockData.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        disabled: i % 3 < 1
      })
    }
    mockDataDemo = mockData.map((item) => item)

    const oriTargetKeys = mockData
      .filter((item) => +item.key % 3 > 1)
      .map((item) => item.key)
    const oriTargetKeysDemo = mockDataDemo
      .filter((item) => +item.key % 3 > 1)
      .map((item) => item.key)

    return {
      mockData,
      targetKeys: oriTargetKeys,
      selectedKeys: ['1', '4'],
      disabled: false,
      mockDataDemo,
      targetKeys_1: oriTargetKeysDemo,
      targetKeysDemo: [],
      dataSource: transferDataSource
    }
  },
  computed: {
    treeData () {
      return handleTreeData(treeData, this.targetKeys)
    }
  },
  methods: {
    onChange (targetKeys) {
      console.log('Target Keys:', targetKeys)
      this.targetKeysDemo = targetKeys
    },
    onChecked (_, e, checkedKeys, itemSelect) {
      const { eventKey } = e.node
      itemSelect(eventKey, !isChecked(checkedKeys, eventKey))
    },
    handleChange (nextTargetKeys, direction, moveKeys) {
      this.targetKeys = nextTargetKeys

      console.log('targetKeys: ', nextTargetKeys)
      console.log('direction: ', direction)
      console.log('moveKeys: ', moveKeys)
    },
    filterOption (inputValue, option) {
      return option.description.indexOf(inputValue) > -1
    },
    handleChange_1 (nextTargetKeys, direction, moveKeys) {
      this.targetKeys_1 = nextTargetKeys

      console.log('targetKeys: ', nextTargetKeys)
      console.log('direction: ', direction)
      console.log('moveKeys: ', moveKeys)
    },
    handleSearch (dir, value) {
      console.log('search:', dir, value)
    },
    handleSelectChange (sourceSelectedKeys, targetSelectedKeys) {
      this.selectedKeys = [...sourceSelectedKeys, ...targetSelectedKeys]

      console.log('sourceSelectedKeys: ', sourceSelectedKeys)
      console.log('targetSelectedKeys: ', targetSelectedKeys)
    },
    handleScroll (direction, e) {
      console.log('direction:', direction)
      console.log('target:', e.target)
    },
    handleDisable (disabled) {
      this.disabled = disabled
    }
  }
}
</script>
