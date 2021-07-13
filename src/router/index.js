import { createWebHistory, createRouter } from "vue-router"
import Folder from '@/components/Folder'
import Folders from '@/components/Folders'
import Photo from '@/components/Photo'

const routes = [
  {
    path: '/',
    name: 'Folders',
    component: Folders
  },
  { 
    path: "/p/:id",
    name: 'Folder',
    component: Folder
  },
  { 
    path: "/p/:id/:photo_id",
    name: 'Photo',
    component: Photo,
    props: { portrait: false }
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router