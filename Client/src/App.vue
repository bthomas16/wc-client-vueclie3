<template>
  <b-container fluid>
    <app-header></app-header>
    <transition name="slide" >
      <router-view :key="$route.fullPath"></router-view>
    </transition>
      
  </b-container> 
</template>

<script>
import Header from './components/Header.vue'

  export default {

    components: {
      appHeader: Header
    }
}
</script>

<style>
</style>
