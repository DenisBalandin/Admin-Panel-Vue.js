<template>
  <div class="md-layout">
    <div class="md-layout-item">
    <div v-if="duplicateKiosk" class="alert">
    <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
    The kiosk name already exist kindly, add a unique kiosk name.
    </div>
    <p @click='$router.go(-1)' class='back'>back</p>
      <md-card>
        <md-card-content>
          <md-field>
            <label>Title</label>
            <md-input v-model="kiosk.name" type="text"></md-input>
          </md-field>
          <md-field>
            <label>Slug</label>
            <md-input v-model="kiosk.slug" disabled type="text"></md-input>
          </md-field>
          <md-field>
            <label>Description</label>
            <md-textarea
              v-model="kiosk.description"
              md-autogrow
              md-counter="200"
            ></md-textarea>
          </md-field>
          <md-field>
            <label>Teamviewer ID</label>
            <md-input v-model="kiosk.teamviewer_id" type="text"></md-input>
          </md-field>
          <md-field>
            <label>Teamviewer Password</label>
            <md-input v-model="kiosk.teamviewer_password" type="text"></md-input>
          </md-field>
          <!-- <md-field>
            <label>Location</label>
            <md-select v-model="location">
              <md-option
                v-for="location in locations"
                :key="location.id"
                :value="location.id"
                >{{ location.name }}</md-option
              >
            </md-select>
          </md-field> -->
        </md-card-content>
        <md-card-actions md-alignment="space-between">
          <md-button class="md-primary md-round md-small" @click="save"
            >Save</md-button
          >
        </md-card-actions>
      </md-card>
    </div>
  </div>
</template>

<script>
import Fuse from "fuse.js";
import { db } from "@/config/firebaseInit";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      kiosk: {
        name: "",
        slug: "",
        description: "",
        location: null,
        teamviewer_id: null,
        teamviewer_password: null
      },
      location:null,
      type_options: [
        { val: "video", text: "Video" },
        { val: "image", text: "Image" },
        { val: "survey", text: "Survey" },
        { val: "iframe", text: "iFrame" }
      ],
      files: [],
      upload_progress: null,
      upload_error: null,
      videos: [],
      surveys: [],
      locations: [],
      duplicateKiosk:false
    };
    
  },
  watch: {
    kiosk: {
      handler(val) {
        if (!this.kiosk.created) {
          this.kiosk.slug = val.name.replace(/[^a-zA-Z0-9]/g, "-");
        }

        if (!this.kiosk.teamviewer_id || !this.kiosk.teamviewer_password) {
          this.kiosk.teamviewer_id = '';
          this.kiosk.teamviewer_password = '';
        }
      },
      deep: true
    },
    location(val) {
      this.kiosk.location = db.collection('locations').doc(val)
    }
  },
  firestore() {
    return {
      // locations: db.collection("locations"),
      kiosk: db.collection("kiosks").doc(this.$route.params.kiosk_id),
      videos: db.collection("videos"),
      surveys: db.collection("surveys"),
    };
  },
  methods: {
   async save() {
      let kioskRef = await db.collection("kiosks").get()
      let exist = false
      let kioskDocuments = kioskRef.docs
      for(let kiosk of kioskDocuments){
      if(kiosk.data().name===this.kiosk.name){
        exist = true
        break
      }
    }
      if(!exist){
        console.log("Saving kiosk")
        this.duplicateKiosk=false
      if (!this.kiosk.created) {
        this.kiosk.created = new Date();
      }
      let vm = this;
      return db
        .collection("kiosks")
        .doc(this.$route.params.kiosk_id)
        .set(vm.kiosk, { merge: true })
        .then(() => {
          return Swal.fire("Success", "Page Updated", "success");
        });
      }else{
        this.duplicateKiosk = true
      }
    }
  },
  checkIfKioskNameExist(kioskDocuments,name){
    for(let kiosk of kioskDocuments){
      if(kiosk.data()===name){
        return true
      }
    }
    return false
  },
  created() {
    

  },
  mounted() {
    // Fuse search initialization.
    this.fuseSearch = new Fuse(this.tableData, {
      keys: ["name", "url"],
      threshold: 0.3
    });
  }
};
</script>

<style lang="css" scoped>
.md-card .md-card-actions{
  border: 0;
  margin-left: 20px;
  margin-right: 20px;
}
</style>
