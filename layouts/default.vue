<template>
<v-app>
<v-card>
    <v-toolbar color="light-blue lighten-1">
        <v-btn
        fab
        dark
        color="blue-grey lighten-3"
        >
        TEAM<br>A
        </v-btn>
      <v-toolbar-title style="margin-left: 5vw"><h2 style="color: white">Aチーム</h2></v-toolbar-title>

      <v-spacer></v-spacer>
        <v-btn
        fab
        dark
        fixed
        right
        color="green"
        style="margin-right: 18vw">
        LINE
        </v-btn>
        <v-spacer />

        <v-btn
        fab
        dark
        right
        fixed
        color="green">
        <v-icon>mdi-phone</v-icon>
        </v-btn>

    </v-toolbar>
</v-card>


  <nuxt class="mt-3" style="margin-bottom: 10vh"/>

  <v-bottom-navigation
    v-model="bottomNav"
    fixed
    color="amber darken-3"
  >
    <v-btn
      value="home"
      to="/"
      color="amber accent-1"
    >
      <span>Home</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn
      value="MainMission"
      to="/mainMission"
      color="amber accent-1"
    >
      <span>MainMission</span>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn
      value="SubMission"
      to="/subMission"
      color="amber accent-1"

    >
      <span>SubMission</span>
      <v-icon>mdi-note</v-icon>
    </v-btn>

    <v-btn
      value="Library"
      to="/library"
      color="amber accent-1"

    >
      <span>Library</span>
      <v-icon>mdi-book</v-icon>
    </v-btn>

  </v-bottom-navigation>

</v-app>
</template>

<script>
  import lineIcon from "@/static/line-icon.png";
  export default {
    data () {
      return {
        activeBtn: 1,
        bottomNav: true
      }
    },
    methods: {
      createMission(){ //ミッション登録用に便利なので一応おいておく
        const datas = {
          id: "a016",
          title: "自販機",
          text: "自販機が4台写った写真を撮る",
          missionType: "challenge",
          answerType: "photo",
          photoUrl: "",
          difficulty: 1
        }

        this.$firestore.collection("Mission").doc("mission16").set(datas)
      console.table(datas)
      }
    }
  }
</script>
