<template>
<v-app>
  <v-card
    color="grey lighten-4"
    flat
    tile
  >
    <v-toolbar>
        <v-btn
        fab
        dark
        right
        color="primary"
        style="margin-right: 2vw">
        TEAM<br>A
        </v-btn>
        <v-spacer />
      <v-toolbar-title><h2>Aチーム</h2></v-toolbar-title>

      <v-spacer></v-spacer>
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
    color="green darken-4"
  >
    <v-btn
      value="home"
      to="/"
      color="green accent-2"

    >
      <span>Home</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn
      value="MainMission"
      to="/mainMission"
      color="green accent-2"
    >
      <span>MainMission</span>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn
      value="SubMission"
      to="/subMission"
      color="green accent-2"

    >
      <span>SubMission</span>
      <v-icon>mdi-note</v-icon>
    </v-btn>

    <v-btn
      value="Library"
      to="/library"
      color="green accent-2"

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
