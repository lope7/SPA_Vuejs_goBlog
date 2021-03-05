<template src="./CreateEntry.html"></template>

<script>
import Sidebar from "./Sidebar.vue";
import Global from "../Global";
import Entry from "../models/Entry";
import axios from "axios";
import { required } from "vuelidate/lib/validators";
import swal from "sweetalert";

export default {
  name: "CreateEntry",
  components: {
    Sidebar
  },
  data() {
    return {
      url: Global.url,
      file: "",
      entry: new Entry("", "", null, ""),
      submitted: false
    };
  },
  validations: {
    entry: {
      title: {
        required
      },
      content: {
        required
      }
    }
  },
  methods: {
    fileChange() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },
    save() {
      this.submitted = true;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return false;
      } else {
        axios
          .post(this.url + "save", this.entry)
          .then(response => {
            if (response.data.status == "success") {

              // Upload the file
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
                  .then(response => {
                    if (response.data.entry) {
                     swal(
                        "Entry uploaded",
                        "Succesful uploaded",
                        "success"
                      );
                      
                      this.entry = response.data.entry;
                      this.$router.push("/blog");
                    } else {
                      
                      swal(
                        "Faill",
                        "You didn´t upload the image",
                        "error"
                      );
                      
                    }
                  })
                  .catch(error => {
                    console.log(error);
                  });
              } else {
                swal(
                  "Entry created",
                  "success"
                );

                this.entry = response.data.entry;
                this.$router.push("/blog");
              }
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>