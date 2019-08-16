<template>
  <div style="margin-top:10px;width:96vw; margin-left:auto;margin-right:auto;">
    <div >
      <div style="background-color:rgb(91,192,222,0.5);width:30%;text-align:center" @click="test">
        <h3>ストーリー</h3>
      </div>
      <div style="margin-top:5px;margin-bottom:10px;border:solid 2px rgb(91,192,222,0.5)">
        むかしむかしあるところに

      </div>
    </div>

    <div style="background-color:rgb(91,192,222,0.5);width:30%;text-align:center" @click="getSubstory">
        <h3>ミッション</h3>
    </div>

    <v-expansion-panels
      v-model="panel"

      multiple
      style="margin-top:5px"
    >
      <v-expansion-panel style="border:solid 2px rgb(91,192,222,0.5)">
        <div style="background-color:rgb(91,192,222,0.5)"  @click="test">ppp</div>
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
    beforeCreate(){
      //const uid = this.$auth.currentUser.uid
      const uid = "wPenfOmOi4Y8ibxERyqzLU63TTe2"
      this.$firestore.collection("Substory").get()
      .then(snapshot => {
        snapshot.forEach(doc =>{
          this.substoryDatas.push(doc.data())
          //console.log(this.substoryDatas)
        })
      })

      this.$firestore.doc(`Team/teamXX`).get()
      .then(doc=>{
          this.teamStatus = doc.data()
          console.log(this.teamStatus)
        })

    },
    data:() =>({
        panel: [0, 1, 2, 3],
        substoryDatas:[],
        teamStatus:[]
     }),
    methods:{
      get(){
        this.$firestore.doc(`Team/teamXX`).get()
        .then(doc => {console.table(doc.data())}
        )

      },
      allget(){console.log(substory);},
      getSubstory(){
        substory = this.$firestore.collection('Substory').get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.substoryDatas.push(doc.data())
          })
          console.log(substory);
        })

          .catch(err => {
            console.log('Error getting documents', err);
        });
        const wife ="うづ"
        console.log(wife)

      },
      test(){
        console.log(substoryDatas)
      }

    }
  }
</script>
