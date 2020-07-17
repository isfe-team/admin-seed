<template>
  <Figure class="serve-error" message="500" :description="$t('abnormal.servicesAbnormal')">
    <i class="icon icon-exception icon-exception-500"></i>
  </Figure>
</template>

<script>
import Figure from './Figure'
export default {
  name: 'ServerError',
  components: { Figure }
}
</script>
