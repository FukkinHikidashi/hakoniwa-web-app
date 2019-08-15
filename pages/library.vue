<template>
<div>

        <v-tabs
        v-model="tab"
        hide-slider
        class="mt-3"
        >
        <v-layout>
            <v-tab>Photos</v-tab>
            <v-tab>Logs</v-tab>
            <v-tab disabled>Trails</v-tab>
        </v-layout>
        </v-tabs>

</div>
</template>

<script>
  export default{
    data(){
      return {
        tab: null

      }
    }
  }

</script>
