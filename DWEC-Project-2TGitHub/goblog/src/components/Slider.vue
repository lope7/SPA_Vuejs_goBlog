<template>
  <div
    id="slider"
    :class="{
      'slider-big': home,
      'slider-small': !home,
    }"
  >
    <h1>Welcome to Go-Blog®</h1>
    <h3>Create your digital blog!</h3>
    <router-link to="/album" class="btn-white" v-if="showBtn"><strong>Go!</strong></router-link
    >
  </div>
</template>
<script>
export default {
  name: "Slider",
  props:['home','showBtn','texto']
};
</script>