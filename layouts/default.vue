<template>
<v-app>
<v-card>
    <v-toolbar>
        <v-btn
        fab
        dark
        color="primary"
        >
        TEAM<br>A
        </v-btn>
      <v-toolbar-title style="margin-left: 5vw"><h2>Aチーム</h2></v-toolbar-title>

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
