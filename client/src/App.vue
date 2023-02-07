<script>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'

export default {
  components: {
    NavBar,
    RouterLink,
    RouterView
  }
}


</script>

<template>
  <NavBar />
  <RouterView />
</template>