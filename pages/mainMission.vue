<template>
<div>
  <h2>This is mainMission</h2>
  <v-container>
    <v-card color="warning" class="ma-2 align-center justify-center" style="height: 30vh"
    @click="dialog = true">
      <p>ここにミッションの内容を表示</p>
    <v-layout>
  </v-layout>
    </v-card>
  </v-container>

  <v-dialog v-model="dialog">
    <v-card>
    ここに回答ボタンを設置
    </v-card>
    </v-dialog>

  <!--ビンゴカード -->



  
</div>
</template>

<script>
  export default{
    data() {
      return{
        dialog: false,
        nowStage: 1,
        missionDatas: [
          {
            id: 1,
            title: "mission1",
            text: "ここに問題文",
            photoUrl: "https://app-senbonknock.com/wp-content/uploads/2019/05/icon.png",
            answerType: "text", // ["text", "photo"]
            missionType: "eachPoint", // ["eachPoint", "everywhere", "quiz"]
            difficulty: 1 // num
          }
        ]

      }
    }
    }
  

</script>
