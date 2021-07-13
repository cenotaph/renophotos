<template>
  <section class="hero is-primary">
    <div class="hero-body">
      <p class="title">
        Snapshots from a work in progress
      </p>
    </div>
  </section>
  <div class="container">
    <div class="columns  is-multiline ">
      <div class="column is-one-third"  v-for="cover in covers" :key="cover.folder_name">
        <router-link :to="'/p/' + cover.folder_name">
          <div class="card">
            <div class="card-image">
              <figure class="image" :class="cover.portrait ? 'portrait is-4by3' : 'is-4by3'">
                <img :class="cover.portrait ? 'portrait' : ''"  :src="prefix +  cover.folder_name + '/medium/' + cover.cover_image" />
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <p class="title is-4">{{ cover.title }}</p>
                <p>{{ cover.description }}</p>
              </div>
              </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { useToast } from "vue-toastification"
  export default {
    name: 'Folders',
    data () {
      return { 
        prefix: process.env.VUE_APP_IMG_PREFIX,
        photos: [],
        covers: []
      }
    },
    mounted () {
      this.axios.get('/folders')
      .then((response) => {
        this.covers = response.data
      })
      .catch(() => {       

        this.toast.error("Error accessing image API!", {
          timeout: 5000
        })
      })
    },
    setup() {
      // Get toast interface
      const toast = useToast()
      return { toast }
    }
    // created () {
    //   const components = require.context('./../data', true, /[a-zA-Z]\w+\.(json)$/)
  
    //   components.keys().forEach(filePath => { 
    //     let json = components(filePath)
    //     this.photos.push(json)
    //     this.covers.push({"title": json.title , "folder_name": json.folder_name, "cover_image": json.images[Math.floor(Math.random() * json.images.length)].filename, "description": json.description})
    //     // components(filePath).then(j => {
    //       // module.default is the vue component
    //       // console.log(j)
    //     // })
    //   })
    // }
  }
</script>