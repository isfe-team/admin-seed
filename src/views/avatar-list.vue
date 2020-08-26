<template>
    <div class="avatar-list">
        <ul>
            <li v-for="(item,index) in list" :key="index">
               <img :src="item" alt="">
            </li>
            <li v-for="(item,index) in list" :key="index">
               <img :src="item" alt="">
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  data () {
    return {
      list: []
    }
  },
  mounted () {
    let index = 1
    do {
      this.list.push(require(`../assets/imgs/avatar/${index}.png`))
      index++
    } while (index < 12)
  }
}

</script>
<style lang="less" scoped>
.avatar-list{
    display: flex;
    align-items: center;
    flex-direction: column;
ul{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width:600px;
    li{
        margin:10px;
    }
}

}

</style>
