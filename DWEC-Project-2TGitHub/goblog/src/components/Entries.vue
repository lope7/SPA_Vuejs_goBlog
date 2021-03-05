<template>
  <section id="articles-component">
    <div id="articles-list" v-if="entries && entries.length >= 1">
      <article class="article-item" v-for="entry in entries" :key="entry._id">
        <div class="image-wrap">
          <img :src="url+'get-image/'+entry.image" :alt="entry.title" v-if="entry.image" />
          <img src="../assets/images/default.png" :alt="entry.title" v-if="!entry.image" />
        </div>

        <h2>
          <router-link :to="{name: 'entry', params: {id: entry._id}}">{{entry.title}}</router-link>
        </h2>

        <span class="date">{{entry.dateUpload | moment("from", "now") }}</span>
        <router-link :to="{name: 'entry', params: {id: entry._id}}">See more</router-link>

        <div class="clearfix"></div>
      </article>
    </div>
    <div v-else-if="entries && entries.length < 1">No entries to show</div>
    <div v-else>Loading...</div>
  </section>
</template>

<script>
import Global from "../Global";
export default {
  name: "Entries",
  props: ["entries"],
  data() {
    return {
      url: Global.url
    };
  }
};
</script>