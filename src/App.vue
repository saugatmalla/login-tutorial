<template>
  <div id="app">
    <div id="nav">
      <Navbar/>
    </div>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  name: "app",
  components: {
    Navbar
  }
};
</script>

<style>
* {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  border-radius: 0px important;
  background-color: #f5f3ef;
}
</style>
