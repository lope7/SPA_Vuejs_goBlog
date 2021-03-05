<template>
  <aside id="sidebar">
    <div id="nav-blog" class="sidebar-item">
      <router-link to="/create-entry" class="btn btn-success">New entry</router-link>
    </div>

    <div id="search" class="sidebar-item">
      <h3>Search</h3>
      <form @submit.prevent="goSearch">
        <input type="text" name="search" v-model="searchString" />
        <input type="submit" name="submit" value="Search" class="btn" />
      </form>
    </div>
  </aside>
</template>

<script>
export default {
  name: "Sidebar",
  data(){
    return {
      searchString: null
    }
  },
  methods: {
    goSearch(){
      this.$router.push('/redirect/'+this.searchString);
    }
  }
};
</script>