<template>
  <Figure
    class="serve-error"
    image-src="https://gw.alipayobjects.com/zos/rmsportal/RVRUAYdCGeYNBWoKiIwB.svg"
    message="500"
    description="抱歉，服务异常了"
  />
</template>

<script>
import Figure from './Figure'

export default {
  name: 'ServerError',
  components: { Figure }
}
</script>
