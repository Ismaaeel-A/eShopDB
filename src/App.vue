<template>
  <NavBar />
  <!--   <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <router-view />

</template>

<style src="./assets/css/style.css"></style>

<script>
import NavBar from "./components/NavBar.vue";


export default {
  components: {
    NavBar
  },
};
</script>
