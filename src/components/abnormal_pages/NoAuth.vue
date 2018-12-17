<template>
  <Figure
    class="not-auth"
    message="403"
    description="抱歉，没有访问权限"
  >
    <i class="icon icon-exception icon-exception-403"></i>
  </Figure>
</template>

<script>
import Figure from './Figure'

export default {
  name: 'NoAuth',
  components: { Figure }
}
</script>
