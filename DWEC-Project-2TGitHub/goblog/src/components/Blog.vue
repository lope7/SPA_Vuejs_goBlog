<template>
  <div class="general">
    <div class="center">
      <section id="content">
        <h1 class="subheader">Blog</h1>

        <div id="entries" v-if="entries">
          <Entries :entries="entries"></Entries>
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
import Sidebar from "./Sidebar.vue";
import Entries from "./Entries";

export default {
  name: "Blog",
  components: {
    Sidebar,
    Entries
  },
  mounted() {
    this.getEntries();
  },
  data() {
    return {
      url: Global.url,
      entries: null
    };
  },
  methods: {
    getEntries() {
      axios.get(this.url+"entries").then(res => {
        if (res.data.status == "success") {
          this.entries = res.data.entries;

          console.log(this.entries);
        }
      });
    }
  }
};
</script>