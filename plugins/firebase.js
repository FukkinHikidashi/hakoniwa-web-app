import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const config = {
  apiKey: "AIzaSyC918nZqRY9o_Hyjxb0ei42AybHXDhvuyQ",
  authDomain: "hakoniwa-web-app.firebaseapp.com",
  databaseURL: "https://hakoniwa-web-app.firebaseio.com",
  projectId: "hakoniwa-web-app",
  storageBucket: "",
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
