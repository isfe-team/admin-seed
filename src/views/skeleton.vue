<template>
  <div class="skeleton">
    <div>
      <h3>基本样式</h3>
      <a-skeleton />
    </div>
    <div class="s-demo-border">
      <h3>一般列表占位符</h3>
      <a-switch :checked="!loading" @change="onChange" />
      <a-list item-layout="vertical" size="large" :data-source="listData">
        <a-list-item slot="renderItem" key="item.title" slot-scope="item">
          <div v-if="!loading">
            <template v-for="{ type, text } in actions" slot="actions">
              <span :key="type">
                <a-icon :type="type" style="margin-right: 8px" />
                {{ text }}
              </span>
            </template>

            <img
              slot="extra"
              width="272"
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          </div>

          <a-skeleton :loading="loading" active avatar>
            <a-list-item-meta :description="item.description">
              <a slot="title" :href="item.href">{{ item.title }}</a>
              <a-avatar slot="avatar" :src="item.avatar" />
            </a-list-item-meta>
            {{ item.content }}
          </a-skeleton>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>
<script>
const listData = []
for (let i = 0; i < 3; i++) {
  listData.push({
    href: 'https://www.antdv.com/',
    title: `ant design vue part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
  })
}
export default {
  data () {
    return {
      loading: true,
      listData,
      actions: [
        { type: 'star-o', text: '156' },
        { type: 'like-o', text: '156' },
        { type: 'message', text: '2' }
      ]
    }
  },
  methods: {
    onChange (checked) {
      this.loading = !checked
    }
  }
}
</script>
<style lang="less" scoped>
.skeleton {
  .s-demo-border {
    margin-top:30px;
  }
  h3 {
    margin: 20px 0px 10px 0;
  }
}
</style>
