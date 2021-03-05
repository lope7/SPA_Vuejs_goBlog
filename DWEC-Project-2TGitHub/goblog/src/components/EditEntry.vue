<template src="./CreateEntry.html"></template>

<script>
import Sidebar from "./Sidebar.vue";
import Global from "../Global";
import Entry from "../models/Entry";
import axios from "axios";
import { required } from "vuelidate/lib/validators";
import swal from "sweetalert";

export default {
  name: "EditEntry",
  components: {
    Sidebar,
  },
  data() {
    return {
      url: Global.url,
      file: "",
      entry: new Entry("", "", null, ""),
      submitted: false,
      isEdit: true,
    };
  },
  validations: {
    entry: {
      title: {
        required,
      },
      content: {
        required,
      },
    },
  },
  mounted() {
    var entryId = this.$route.params.id;
    this.getEntry(entryId);
  },
  methods: {
    fileChange() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },
    getEntry(entryId) {
      axios.get(this.url + "entry/" + enrtyId).then((res) => {
        if (res.data.status == "success") {
          this.entry = res.data.entry;
        }
      });
    },
    save() {
      this.submitted = true;
      var entryId = this.$route.params.id;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return false;
      } else {
        axios
          .put(this.url + "entry/" + entryId, this.entry)
          .then((response) => {
            if (response.data.status == "success") {
              if (
                this.file != null &&
                this.file != undefined &&
                this.file != ""
              ) {
                const formData = new FormData();
                formData.append("file0", this.file, this.file.name);
                var entryId = response.data.entry._id;

                axios
                  .post(this.url + "upload-image/" + entryId, formData)
                  .then((response) => {
                    if (response.data.entry) {
                      swal("Entry edited", "Successfull edition", "success");

                      this.entry = response.data.entry;
                      this.$router.push("/entry/" + this.entry._id);
                    } else {
                      swal("Error");
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else {
                swal("Entry edited", "Succesfull edition", "success");

                this.entry = response.data.entry;
                this.$router.push("/entry/" + this.entry._id);
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>