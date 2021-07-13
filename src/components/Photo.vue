<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <router-link :to="{name: 'Folder', params: { id: folder }}" tag="button" class="button is-link">Back to collection</router-link>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <img :class="portrait ? 'portrait' : ''" :src="url" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Photo',
    props: {
        portrait: Boolean
    },
    data () {
      return {
        folder: this.$route.params.id,
        url:  process.env.VUE_APP_IMG_PREFIX + this.$route.params.id + '/' + this.$route.params.photo_id
      }
    }
  }
</script>