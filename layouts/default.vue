<template>
<div>
  <v-card
    color="grey lighten-4"
    flat
    height="200px"
    tile
  >
    <v-toolbar extended extension-height="100">
      <v-toolbar-title>TeamName</v-toolbar-title>

      <div >
        <span>残り時間</span>
      </div>

        <v-btn fab >
          <v-img
            src="https://www.homepage-tukurikata.com/image/lion.jpg"
            cover
          >
          </v-img>
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
      <v-icon>add</v-icon>
    </v-btn>

    <v-btn
      value="MainMission"
      to="/mainMission"
    >
      <span>MainMission</span>
      <v-icon>favorite</v-icon>
    </v-btn>

    <v-btn
      value="SubMission"
      to="/subMission"
    >
      <span>SubMission</span>
      <v-icon>place</v-icon>
    </v-btn>

    <v-btn
      value="Library"
      to="/library"
    >
      <span>Library</span>
      <v-icon>place</v-icon>
    </v-btn>

  </v-bottom-navigation>

</div>
</template>

<script>
  export default {
    data () {
      return {
        activeBtn: 1,
      }
    },
  }
</script>
