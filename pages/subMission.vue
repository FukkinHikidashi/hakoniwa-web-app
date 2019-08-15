<template>
  <div style="margin-top:10px;width:96vw; margin-left:auto;margin-right:auto;">
    <div >
      <div style="background-color:rgb(91,192,222,0.5);width:30%;text-align:center">
        <h3>ストーリー</h3>
      </div>
      <div style="margin-top:5px;margin-bottom:10px;border:solid 2px rgb(91,192,222,0.5)">
        むかしむかしあるところに

      </div>
    </div>

    <v-btn fab color="accondary" @click="createTaxi(20)">
      <v-icon>mdi-taxi</v-icon>
    </v-btn>

    <div style="background-color:rgb(91,192,222,0.5);width:30%;text-align:center">
        <h3>ミッション</h3>
    </div>

    <v-expansion-panels
      v-model="panel"

      multiple
      style="margin-top:5px"
    >
      <v-expansion-panel v-show="false" style="border:solid 2px rgb(91,192,222,0.5)">
        <div style="background-color:rgb(91,192,222,0.5)">1.捕らわれの女の子</div>
        <v-expansion-panel-header>
          <div style="width:30%"><p>未回答</p></div>
          <div style="width:70%"><p>キーワード：魚</p></div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div>
            ストーリー
          </div>
          <div>
            問題文
          </div>

        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <div>2.#########</div>
        <v-expansion-panel-header>Panel 2</v-expansion-panel-header>
        <v-expansion-panel-content>
          Some content
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <div>3.#########</div>
        <v-expansion-panel-header>Panel 3</v-expansion-panel-header>
        <v-expansion-panel-content>
          Some content
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <div>4.#########</div>
        <v-expansion-panel-header>Panel 4</v-expansion-panel-header>
        <v-expansion-panel-content>
          Some content
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <div>5.#########</div>
        <v-expansion-panel-header>Panel 5</v-expansion-panel-header>
        <v-expansion-panel-content>
          Some content
        </v-expansion-panel-content>
      </v-expansion-panel>


    </v-expansion-panels>
  </div>
</template>

<script>
  export default {
    data: () => ({
      disabled: true,
      panel: [0, 1, 2, 3],
//      mission:{
//       quiz1:{
//          title: "1.捕らわれの女の子",
//          text:,
//          story:,
//          reply:,
//          photoUrl:,
//          keyword:,
//          answers:,
//        },
//      },
    }),
    methods:{
      createTaxi(){
        const lat = 100;
        const lng = 200;


        this.$firestore.collection('taxis').add({
          d:{
            carPhotoUrl:"",
            carType:"",
            driver:{
              name:"吉岡里帆",
              faceUrl:"",
              phone:"",
              rate:4.8,
              description:"" + Math.random
            },
            number:"AAA",
            location:{lat:lat,lng:lng}
          },

        })
      },
    }
  }
</script>
