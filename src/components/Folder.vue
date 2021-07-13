<template>
  <div class="modal" :class="enteringPassword ? 'is-active' : ''">
    <div class="modal-background"></div>
    <div class="modal-content">
      <p>Enter edit password:</p>
      <input class="input" v-model="editPassword" />
      <button @click="enteringPassword = !enteringPassword">Save</button>
    </div>
    <button class="modal-close is-large" @click="enteringPassword = !enteringPassword" aria-label="close"></button>
  </div>
  <section class="hero is-primary">
    <div class="hero-body">
      <p class="title">{{ metadata.title }}</p>

      <p class="subtitle">{{ metadata.description }}</p>

    </div>
  </section>

  <div class="container">
    <div class="columns">
      <div class="column">
        <button class="button is-secondary" @click="(enteringPassword = !enteringPassword) && (editMode = !editMode)">Edit</button>
        <router-link :to="{name: 'Folders'}" tag="button" class="button is-link">Back to index</router-link>
        <button class="button is-secondary" @click="sendUpdate" v-show="editMode">Update</button>
      </div>
    </div>
    <div class="columns  is-multiline ">
      <div class="column is-one-third"  v-for="image in images" :key="image.filename">      
        <div class="card">
          <div class="card-image">
            <div v-if="image.video" class="videocontent">
              <video controls :poster="prefix + metadata.folder_name + '/' + image.filename.replace(/\.mp4$/i, '') + '/poster.jpg'">
                <source :src="prefix + metadata.folder_name + '/' + image.filename" type="video/mp4">
              </video>
            </div>
            <router-link v-else :to="{name: 'Photo', params: {id: metadata.folder_name, photo_id: image.filename}, query: { portrait: image.portrait }}">
              <figure   class="image" :class="image.portrait ? 'portrait is-4by3' : 'is-4by3'">
                <img :class="image.portrait ? 'portrait' : ''" :src="prefix +  metadata.folder_name + '/medium/' + image.filename" />
              </figure>
            </router-link>
          </div>
          <div class="card-content">
            <form v-if="editMode">
              <input v-model="image.title" class="input" />
              <textarea v-model="image.description" />
              <br />
              <input type="checkbox" v-model="image.portrait" /> Rotate 90' for portrait mode
            </form>
            <div  v-else class="content">
              <p class="title is-4">{{ image.title }}</p>
              <p>{{ image.description }}</p>
              <p class="is-size-7 has-text-right">{{  moment(image.timestamp) }} </p>
            </div>     
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { useToast } from "vue-toastification"
  import moment from 'moment'

  export default {
    name: 'Folder',
    data () {
      return { 
        prefix: process.env.VUE_APP_IMG_PREFIX,
        images: [],
        videoRefs: [],
        metadata: {},
        editMode: false,
        editPassword: null,
        enteringPassword: false
      }
    },
    methods : {
      moment: function (date) {
        return moment(date).format('Do MMM YYYY')
      },
      sendUpdate() {

        let params = new URLSearchParams({
          password: this.editPassword
        }).toString()
        this.axios.put('/folder/' + this.$route.params.id + '?' + params, this.metadata)
          .then((response) => {
            if (response.status === 200) {
              this.editMode = false
              this.toast.success("Updated OK", {
                timeout: 2000
              })
            }
           })
           .catch(() => {       
              this.editMode = false      
              this.toast.error("No good!", {
                timeout: 2000
              })
            })
      }
    },
    setup() {
      // Get toast interface
      const toast = useToast()
      return { toast }
    },
    mounted () {
      document.addEventListener('keyup', function(e) {
        if (e.keyCode == 27) {
          this.openeModal = null
        }
      })
      this.axios.get('/folder/' + this.$route.params.id)
      .then((response) => {

        this.metadata = response.data
        this.images = this.metadata.images.sort((a,b) => { return a["timestamp"] - b["timestamp"] })
      })
      .catch(() => {       

        this.toast.error("Error accessing image API!", {
          timeout: 5000
        })
      })

      
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