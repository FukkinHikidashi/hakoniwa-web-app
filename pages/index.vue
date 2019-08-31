<template>
<div>

<v-btn color="primary">
  ストーリー
</v-btn>

<v-btn style="margin-right: 5vw">
  遊び方
</v-btn>

総得点：{{totalPoint}}点

<v-container class="mt-5">
  <h3>メインミッション : 現在{{mainPoint}}点</h3>
  <v-card class="mb-5" to="/mainMission/">
    <v-layout>
    <v-flex xs5>
      <v-img src="https://images.unsplash.com/photo-1560013764-b45ee3b3d786?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9"
      aspect-ratio="1" />
    </v-flex>
    <v-flex xs7>
      <v-layout row wrap>
      <v-container>
        <p>【トレージャーバトル】<br>～謎の塔の宝物～</p>
        <p>ビンゴをクリアして進み４階にある宝箱を目指せ！</p>
      </v-container>
      </v-layout>
    </v-flex>
    </v-layout>
  </v-card>

  <h3>サブストーリー : 現在{{subPoint}}点</h3>
  <v-card class="mb-5" to="/subMission/">
    <v-layout>
    <v-flex xs5>
      <v-img src="https://images.unsplash.com/photo-1549315311-697952be6cce?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9"
      aspect-ratio="1" />
    </v-flex>
    <v-flex xs7>
      <v-layout row wrap>
      <v-container>
        <p>【クイズ好きな女の子】</p>
        <p>イベント進行とともに解放されるクイズを進めて女の子を探し出せ！</p>
      </v-container>
      </v-layout>    </v-flex>
    </v-layout>
  </v-card>

  <h3>イベント : 現在{{eventPoint}}点</h3>
  <v-card class="mb-5">
    <v-layout>
    <v-flex xs5>
      <v-img src="https://images.unsplash.com/photo-1464692805480-a69dfaafdb0d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9"
      aspect-ratio="1" />
    </v-flex>
    <v-flex xs7>
      <v-layout row wrap>
      <v-container>
        <p>突発イベントも開催！？<br>【現在準備中】</p>
      </v-container>
      </v-layout>
    </v-flex>
    </v-layout>
  </v-card>
</v-container>
</div>
</template>

<script>
export default {
    async beforeCreate(){
      const uid = await this.$auth.currentUser.uid
      await console.log({uid})
      await this.$firestore.doc(`Team/${uid}`)
        .get()
        .then(doc=>{
          this.team = doc.data().team
          this.totalPoint = doc.data().point.totalPoint
          this.mainPoint = doc.data().point.mainPoint
          this.subPoint = doc.data().point.subPoint
          this.eventPoint = doc.data().point.eventPoint

      })


    },
    data () {
      return {
        team: null,
        mainPoint: null,
        subPoint: null,
        eventPoint: null,
        totalPoint: null,
        activeBtn: 1,
        bottomNav: true
      }
    }

}
</script>

<style>

.point {
  text-align: right;

}

p {
  font-size: 0.9rem;
}
</style>
