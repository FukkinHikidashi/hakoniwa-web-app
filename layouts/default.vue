<template>
<v-app>
<v-card>
    <v-toolbar color="yellow">
        <v-btn
        dark
        fab
        color="grey darken-3"
        >
        TEAM<br>{{team}}
        </v-btn>
      <v-toolbar-title style="margin-left: 10vw"><h2 style="color: brown">HAKONIWA</h2></v-toolbar-title>

      <v-spacer></v-spacer>

        <v-spacer />

        <v-btn
        fab
        dark
        right
        fixed
        color="green">
        LINE
        </v-btn>

    </v-toolbar>
</v-card>


  <nuxt class="mt-3" style="margin-bottom: 10vh"/>

  <v-bottom-navigation
    v-model="bottomNav"
    fixed
    color="deep-orange darken-4"
    height="70"
  >
    <v-btn
      value="home"
      to="/"
      color="yellow"
    >
      <span>Home</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn
      value="MainMission"
      to="/mainMission"
      color="yellow"
    >
      <span>Main Mission</span>
      <v-icon>mdi-note</v-icon>
    </v-btn>

    <v-btn
      value="SubMission"
      to="/subMission"
      color="yellow"

    >
      <span>Sub Story</span>
      <v-icon>mdi-alarm</v-icon>
    </v-btn>

    <v-btn
      value="Library"
      to="/library"
      color="yellow"

    >
      <span>Library</span>
      <v-icon>mdi-book</v-icon>
    </v-btn>

  </v-bottom-navigation>

</v-app>
</template>

<script>
  export default {
      async beforeCreate(){
      const uid = this.$auth.currentUser.uid
      await console.log("aaa")
      await this.$firestore.doc(`Team/${uid}`)
        .get()
        .then(doc=>{
          this.team = doc.data().team

      })


    },
    data () {
      return {
        team: "",
        activeBtn: 1,
        bottomNav: true,
        depressed:true
      }
    },
    methods: {
      createMission(){ //ミッション登録用に便利なので一応おいておく
        const datas = {
          id: "a030",
          title: "30",
          text: "30のミッション",
          missionType: "point",
          answerType: "photo",
          photoUrl: "",
          difficulty: 1,
          
        }

        this.$firestore.collection("Mission").doc("mission30").set(datas)
      console.table(datas)
      }
    }
  }
</script>
