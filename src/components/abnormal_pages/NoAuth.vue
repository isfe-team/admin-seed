<template>
  <Figure
    class="not-auth"
    image-src="https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnb.svg"
    message="403"
    description="抱歉，没有访问权限"
  />
</template>

<script>
import Figure from './Figure'

export default {
  name: 'NoAuth',
  components: { Figure }
}
</script>
