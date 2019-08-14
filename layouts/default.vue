<template>
<v-app>
  <v-card
    color="grey lighten-4"
    flat
    tile
  >
    <v-toolbar>
      <v-toolbar-title>TeamName</v-toolbar-title>

        <v-btn
        fab
        dark
        right
        color="green"
        style="margin-right: 3vw">
        LINE
        </v-btn>

        <v-btn
        fab
        dark
        right
        color="green">
        <v-icon>mdi-phone</v-icon>
        </v-btn>

    </v-toolbar>
  </v-card>


  <nuxt />
  <v-bottom-navigation
    v-model="bottomNav"
    fixed
  >
    <v-btn
      value="home"
      to="/"
    >
      <span>Home</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn
      value="MainMission"
      to="/mainMission"
    >
      <span>MainMission</span>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn
      value="SubMission"
      to="/subMission"
    >
      <span>SubMission</span>
      <v-icon>mdi-note</v-icon>
    </v-btn>

    <v-btn
      value="Library"
      to="/library"
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
  }
</script>
