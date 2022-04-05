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

// get data from firebase and put it into (animeIdarrays) variable
animeref.orderByKey().on("value", (snapshot) => {
  let animeIdarrays = snapshot.val();
  const animeIdContainer = [];
  const tempAniArrContainer = [];
  const spliceAnimeCardArrays = [];
  const range = 3;

  console.warn(typeof animeIdarrays);

  // values from (animeIdarrays) to temporaty array for splice data and idContainer array for search bar
  for (let anime of animeIdarrays) {
    tempAniArrContainer.push(anime);
    animeIdContainer.push(anime);

    console.warn(anime);

    let singleAnimeCard = document.createElement("div");
    singleAnimeCard.className = "singleAnimeCardContainer";
    singleAnimeCard.innerHTML = `
    <img src="" class="animePoster" />

              <div class="animeInfo">
                <p class="animeTitle"></p>
                <div class="progressContainer">
                  <div class="progress-circle over50 p80">
                    <span class="percent">80<span>%</span></span>
                    <div class="left-half-clipper">
                      <div class="first50-bar"></div>
                      <div class="value-bar"></div>
                    </div>
                  </div>

                  <span class="score">User Score</span>
                </div>

                <p class="animeGrenes">Action.Supernatural</p>
              </div>
    `;
    cardGroupContainer.appendChild(singleAnimeCard);

    const animePoster = singleAnimeCard.querySelectorAll(".animePoster");
    const animeTitle = singleAnimeCard.querySelectorAll(".animeTitle");
    const animeGrene = singleAnimeCard.querySelectorAll(".animeGrenes");
    const percent = singleAnimeCard.querySelectorAll(".percent");

    function insertdata(Id, idx) {
      let animeid = Id;

      async function getanime() {
        let resource = await fetch(url + animeid + api);

        let data = await resource.json();

        return data;
      }

      getanime()
        .then((data) => {
          console.warn(data.name);
          // let datapercent = data.vote_average * 10;
          // if (datapercent > 50) {
          //   animepercent[
          //     idx
          //   ].parentElement.className = `progress-circle over50 p${datapercent}`;
          // } else {
          //   animepercent[
          //     idx
          //   ].parentElement.className = `progress-circle p${datapercent}`;
          // }

          animeTitle[idx].innerText = data.name;
          animePoster[idx].src = imgurl + data.poster_path;
        })
        .catch((err) => {});
    }
  }

  animeIdContainer.forEach((animeary, index) => {
    insertdata(animeary, index);
    console.log("hello");
  });

  // splice temporary array into small array 3 id per arrays
  // while (tempAniArrContainer.length > 0) {
  //   spliceAnimeCardArrays.push(tempAniArrContainer.splice(0, range));
  // }
});
// ___________________________________________________start 1 _____________________________________________
// let arrays = spliceAnimeCardArrays[0];

// console.error(arrays);
// if (spliceAnimeCardArrays[0]) {
//   arrays.forEach((firstArray) => {
//     console.log(firstArray);
//   });
// }
// ___________________________________________________end  1 _____________________________________________

// ___________________________________________________start 2 _____________________________________________

// let number = 3;

// for (let i = 0; i < number; i++) {
//   console.warn(spliceAnimeCardArrays[i]);
// }
// ___________________________________________________end 2 _____________________________________________

// ___________________________________________________start 3 (vuejs) _____________________________________________

// VUE.js

// Vue.createApp({
//   data() {
//     return {};
//   },
// }).mount("#app");

// ___________________________________________________end 3 (vuejs) _____________________________________________
