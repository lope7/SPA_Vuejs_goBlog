<template>
  <div class="general">
    <Slider :texto="'Search: ' + searchString"></Slider>
    <div class="center">
      <section id="content">

        <h1 class="subheader" v-if="entries">Coincidences</h1>
        <h1 class="subheader" v-else>No results</h1>

        <div id="entries" v-if="entries">
          <Entries :entries="entries"></Entries>
        </div>
        <div v-else>
            <h2>No coincidences</h2>
        </div>

      </section>
      <Sidebar></Sidebar>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Global from '../Global';
import Slider from "./Slider.vue";
import Sidebar from "./Sidebar.vue";
import Entries from "./Entries";

export default {
  name: "Search",
  components: {
    Slider,
    Sidebar,
    Entries
  },
  mounted() {
    this.searchString = this.$route.params.searchString;
    this.getEntriesBySearch(this.searchString);
  },
  data() {
    return {
      url: Global.url,
      entries: null,
      searchString: null
    };
  },
  methods: {
    getEntriesBySearch(searchString) {
      axios.get(this.url+"search/"+searchString).then(res => {
        if (res.data.status == "success") {
          this.entries = res.data.entries;

          console.log(this.entries);
        }
      });
    }
  }
};
</script>