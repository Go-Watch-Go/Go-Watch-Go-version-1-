// TMDB api
const api = "?api_key=73146692a33e76d73a4399ffb91168cb";
const url = "https://api.themoviedb.org/3/tv/";
const movieurl = "https://api.themoviedb.org/3/movie/";
const imgurl = "https://image.tmdb.org/t/p/w500";

const cardGroupContainer = document.querySelector(".cardGroupContainer");
console.log(cardGroupContainer);

// Firebase section
const firebaseConfig = {
  apiKey: "AIzaSyBz6icw-tMMpgqeVDgMNTAIt-FaLNPXyzE",
  authDomain: "index-ui-7c2c9.firebaseapp.com",
  databaseURL:
    "https://index-ui-7c2c9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "index-ui-7c2c9",
  storageBucket: "index-ui-7c2c9.appspot.com",
  messagingSenderId: "201752924778",
  appId: "1:201752924778:web:2b2c5a421f2427cb9a3013",
  measurementId: "G-V4PK7STEM8",
};

firebase.initializeApp(firebaseConfig);
const databasefire = firebase.database();

const animeref = databasefire.ref("anime");

animeref.orderByKey().on("value", (snapshot) => {
  let animeIdValue = snapshot.val();
  const animeIdContainer = [];
  const tempAniArrContainer = [];
  const spliceAnimeCardArrays = [];
  const range = 3;

  for (let anime of animeIdValue) {
    tempAniArrContainer.push(anime);
    animeIdContainer.push(anime);
  }

  while (tempAniArrContainer.length > 0) {
    spliceAnimeCardArrays.push(tempAniArrContainer.splice(0, range));
  }

  async function getAnimeData() {
    let resource = await fetch(url + 137045 + api);

    let data = await resource.json();

    return data;
  }

  getAnimeData()
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log("Sorry!");
    });
});
