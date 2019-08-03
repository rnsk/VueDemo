<template>
  <div class="preview">
    <PreviewSingle />
    <hr>
    <PreviewMultiple />
  </div>
</template>

<script>
// @ is an alias to /src
import PreviewSingle from '@/components/PreviewSingle.vue'
import PreviewMultiple from '@/components/PreviewMultiple.vue'

export default {
    name: 'preview',
    components: {
      PreviewSingle,
      PreviewMultiple
    }
}
</script>
