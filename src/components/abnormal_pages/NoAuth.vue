<template>
  <Figure class="no-auth" message="403" :description="$t('abnormal.pageForbiddenm')">
    <i class="icon icon-exception icon-exception-403"></i>
  </Figure>
</template>

<script>
import Figure from './Figure'
export default {
  components: { Figure }
}
</script>
