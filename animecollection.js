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
  let animeIdarray = snapshot.val();

  console.log(typeof animeIdarray);
  console.warn(animeIdarray.length);

  for (let anime of animeIdarray) {
    const animeCard = document.createElement("div");
    animeCard.className = "animeEachCard";
    animeCard.innerHTML = `
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

    cardGroupContainer.appendChild(animeCard);
    console.warn(animeCard);

    const card = document.querySelectorAll(".animeEachCard");
    const poster = document.querySelectorAll(".animePoster");
    const animeTitle = document.querySelectorAll(".animeTitle");
    const percent = document.querySelectorAll(".percent");
    const grenes = document.querySelectorAll(".animeGrenes");

    function insertData(Id, idx) {
      let animeId = Id;
      let animeindex = idx;
      console.log(animeId, animeindex);
      async function getanime() {
        let resource = await fetch(url + animeId + api);

        let data = await resource.json();

        return data;
      }

      getanime()
        .then((data) => {
          // console.warn(data);

          // let datapercent = data.vote_average * 10;
          // if (datapercent > 50) {
          //   moviepercent[
          //     idx
          //   ].parentElement.className = `progress-circle over50 p${datapercent}`;
          // } else {
          //   moviepercent[
          //     idx
          //   ].parentElement.className = `progress-circle p${datapercent}`;
          // }

          card[idx].id = animeId;
          poster[idx].src = data.poster_path;
          animeTitle[idx].innerText = data.title;
          grenes[idx].innerText = data.grenes.name;
          percent[idx].innerHTML = datapercent + `<span>%</span>`;
        })
        .catch((error) => {
          console.log("Sorry There is no data you resquested!");
        });
    }

    animeIdarray.forEach((animearr, index) => {
      insertData(animearr, index);
    });
  }
});

// splice temporary array into small array 3 id per arrays
// while (tempAniArrContainer.length > 0) {
//   spliceAnimeCardArrays.push(tempAniArrContainer.splice(0, range));
// }
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
