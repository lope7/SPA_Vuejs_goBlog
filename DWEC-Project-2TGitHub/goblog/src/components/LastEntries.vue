<template>
  <div class="general">
    <Slider 
      texto="Latest"
      home="true"
    ></Slider>
    <div class="center">
      <section id="content">
        <h2 class="subheader">Last entries</h2>
        
        <div id="articles">
          <Entries v-bind:entries="entries"></Entries>
        </div>

      </section>
      <Sidebar></Sidebar>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Slider from './Slider.vue';
import Sidebar from './Sidebar.vue';
import Entries from './Entries.vue';
import Global from '../Global';

export default {
  name: "LastEntries",
 components: {
    Slider,
    Sidebar,
    Entries
  },
  mounted() {
    this.getLastEntries();
  },
  data() {
    return {
      url: Global.url,
      entries: null
    };
  },
  methods: {
    getLastEntries() {
      axios.get(this.url+"entries/true").then(res => {
        if (res.data.status == "success") {
          this.entries = res.data.entries;

          console.log(this.entries);
        }
      });
    }
  }
};
</script>