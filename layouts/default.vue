<template>
<div>
  <nuxt />
  <v-bottom-navigation
    v-model="bottomNav"
    fixed
  >
    <v-btn value="recent">
      <span>Recent</span>
      <v-icon>add</v-icon>
    </v-btn>

    <v-btn value="favorites">
      <span>Favorites</span>
      <v-icon>favorite</v-icon>
    </v-btn>

    <v-btn value="nearby">
      <span>Nearby</span>
      <v-icon>place</v-icon>
    </v-btn>
  </v-bottom-navigation>

</div>
</template>

<script>
  export default {
    data () {
      return {
        bottomNav: 'recent',
      }
    },
  }
</script>
