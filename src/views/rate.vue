<template>
  <div>
    <h3>最简单的用法</h3>
    <a-rate v-model="value" />
    <br />
    <a-rate :default-value="2.5" allow-half />
    <span>
      <h3 style="margin:30px 0 5px 0;">文案展现 </h3>
      <a-rate v-model="value" :tooltips="desc" />
      <span class="ant-rate-text">{{ desc[value - 1] }}</span>
    </span>
    <div>
      <h3 style="margin:30px 0 5px 0;">其他字符</h3>
      <a-rate allow-half>
        <a-icon slot="character" type="heart" />
      </a-rate>
      <br />
      <a-rate character="A" allow-half style="fontSize: 36px" />
      <br />
      <a-rate character="好" allow-half />
      <br />
    </div>
    <div>
      <h3 style="margin:30px 0 5px 0;">清除</h3>
      <a-rate :default-value="3" />
      <span class="ant-rate-text">allowClear: true</span>
      <br />
      <a-rate :allow-clear="false" :default-value="3" />
      <span class="ant-rate-text">allowClear: false</span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: 2,
      desc: ['terrible', 'bad', 'normal', 'good', 'wonderful']
    }
  }
}
</script>
    };
  },
};
</script>
