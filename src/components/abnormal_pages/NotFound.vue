<template>
  <Figure message="404" :description="$t('abnormal.pageNotExist')">
    <i class="icon icon-exception icon-exception-404"></i>
  </Figure>
</template>

<script>
import Figure from './Figure'
export default {
  components: { Figure }
}
</script>
