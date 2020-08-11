<template>
  <div>
    <div>
      <h3>基础列表</h3>
      <a-list item-layout="horizontal" :data-source="dataBase">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-list-item-meta
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          >
            <a slot="title" href="https://www.antdv.com/">{{ item.title }}</a>
            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>
    <div  style="margin:30px 0;">
      <h3 :style="{ marginBottom: '16px' }">默认大小</h3>
      <a-list bordered :data-source="data">
        <a-list-item slot="renderItem" slot-scope="item">{{ item }}</a-list-item>
        <div slot="header">Header</div>
        <div slot="footer">Footer</div>
      </a-list>
      <h3 :style="{ margin: '16px 0' }">小号</h3>
      <a-list size="small" bordered :data-source="data">
        <a-list-item slot="renderItem" slot-scope="item">{{ item }}</a-list-item>
        <div slot="header">Header</div>
        <div slot="footer">Footer</div>
      </a-list>
      <h3 :style="{ margin: '16px 0' }">大号</h3>
      <a-list size="large" bordered :data-source="data">
        <a-list-item slot="renderItem" slot-scope="item">{{ item }}</a-list-item>
        <div slot="header">Header</div>
        <div slot="footer">Footer</div>
      </a-list>
    </div>
  </div>
</template>
<script>
const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.'
]
const dataBase = [
  {
    title: 'Ant Design Title 1'
  },
  {
    title: 'Ant Design Title 2'
  },
  {
    title: 'Ant Design Title 3'
  },
  {
    title: 'Ant Design Title 4'
  }
]
export default {
  data () {
    return {
      data,
      dataBase: dataBase
    }
  }
}
</script>
<style></style>
