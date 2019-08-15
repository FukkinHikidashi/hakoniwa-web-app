import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const config = {
  apiKey: "AIzaSyC918nZqRY9o_Hyjxb0ei42AybHXDhvuyQ",
  authDomain: "hakoniwa-190818.firebaseapp.com",
  databaseURL: "https://hakoniwa-190818.firebaseio.com",
  projectId: "hakoniwa-190818",
  storageBucket: "hakoniwa-190818.appspot.com",
  messagingSenderId: "981253948772",
  appId: "1:981253948772:web:015f088779308572"
}

firebase.initializeApp(config)

const firestore = firebase.firestore()
const GeoPoint = firebase.firestore.GeoPoint;
const auth = firebase.auth()

export default function(app,inject){
  inject("firestore",firestore)  //this.$firestore
  inject("auth",auth) //this.$auth
  inject("GeoPoint", GeoPoint)

  const {redirect} = app;

  auth.onAuthStateChanged(user=>{
    if(!user){
      console.warn("not logined")
      redirect("/login")
    }
    console.log({user})

  })

}
