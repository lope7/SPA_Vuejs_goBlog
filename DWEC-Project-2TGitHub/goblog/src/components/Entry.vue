<template>
  <div class="general">
    <div class="center">
      <section id="content">
        <article class="article-item article-detail" v-if="entry">
          <div class="image-wrap" v-if="entry.image">
            <img :src="url + 'get-image/' + entry.image" :alt="entry.title" />
          </div>

          <h1 class="subheader">{{entry.title}}</h1>
          <span class="date">{{entry.date | moment("from", "now") }}</span>
          <p>{{entry.content}}</p>

          <div class="clearfix"></div>

          <router-link :to="'/edit/'+entry._id" class="btn btn-warning">Edit</router-link>
          <a @click="deleteEntry(entry._id)" class="btn btn-danger">Delete</a>
        </article>
      </section>
      <Sidebar></Sidebar>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
import Sidebar from "./Sidebar.vue";
import Global from "../Global";
import axios from "axios";
import swal from "sweetalert";

export default {
  name: "Entry",
  components: {
    Sidebar
  },
  data() {
    return {
      url: Global.url,
      entry: null
    };
  },
  mounted() {
    var entryId = this.$route.params.id;
    this.getEntry(entryId);
  },
  methods: {
    getEntry(entryId) {
      axios.get(this.url + "entry/" + entryId).then(res => {
        if (res.data.status == "success") {
          this.entry = res.data.entry;
        }
      });
    },
    deleteEntry(entryId) {
      swal({
        title: "Are you sure to delete it?",
        text:
          "If you delete the entry you will not recover it!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          axios.delete(this.url + "entry/" + entryId).then(response => {
            swal(
              "Deleted entry",
              "Successfull remove",
              "success"
            );

            this.$router.push("/blog");
          });
        } else {
          swal("The entry wasn´t remove");
        }
      });
    
    }
  }
  
};
</script>