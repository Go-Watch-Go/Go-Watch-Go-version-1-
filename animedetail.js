const querystring = window.location.search;
const urlParams = new URLSearchParams(querystring);

// firebase api
const firebaseConfig = {
  apiKey: "AIzaSyCjIdGk7N1_EFygPZuion7NKJ5Q0PFqhhg",
  authDomain: "animedetails-e879f.firebaseapp.com",
  databaseURL:
    "https://animedetails-e879f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "animedetails-e879f",
  storageBucket: "animedetails-e879f.appspot.com",
  messagingSenderId: "626691076375",
  appId: "1:626691076375:web:8497da34373b66a88cc752",
  measurementId: "G-PS65V2TC7V",
};

// TMDB api
const api = "?api_key=73146692a33e76d73a4399ffb91168cb";
const url = "https://api.themoviedb.org/3/tv/";
const imgurl = "https://image.tmdb.org/t/p/w1280";

firebase.initializeApp(firebaseConfig);
const databasefire = firebase.database();

// const movieid = urlParams.get("movieid");
let seasoncontiner = document.querySelector(".seasoncontainers");
const animeid = "82684";

const epcontainrs = Vue.createApp({
  data() {
    return {
      episodes: [],
      datas: null,
    };
  },
  mounted() {
    const rootref = databasefire.ref(animeid);

    rootref.orderByKey().on("value", (snapshot) => {
      let val1 = snapshot.val();
      for (v in val1) {
        let btn = document.createElement("div");
        btn.classList.add("seasons");
        btn.innerText = "Season" + v;
        btn.value = v;
        seasoncontiner.appendChild(btn);
      }

      let ssbtns = seasoncontiner.querySelectorAll(".seasons");
      ssbtns[0].classList.add("active");
      let ss = "1";
      ssbtns.forEach((ssbtn) => {
        ssbtn.addEventListener("click", () => {
          // console.log(ssbtn.value);
          removeactive();
          ssbtn.classList.toggle("active");

          ss = ssbtn.value;

          this.episodes = val1[ss];

          async function getanime() {
            let resource = await fetch(url + animeid + "/season/" + ss + api);

            let data = await resource.json();

            return data;
          }

          getanime()
            .then((data) => {
              this.datas = data.episodes;
            })
            .catch((err) => {
              console.log(err);
            });
        });
      });

      function removeactive() {
        ssbtns.forEach((ssbtn) => {
          ssbtn.classList.remove("active");
        });
      }

      this.episodes = val1[ss];

      async function getanime() {
        let resource = await fetch(url + animeid + "/season/" + ss + api);

        let data = await resource.json();

        return data;
      }

      getanime()
        .then((data) => {
          this.datas = data.episodes;
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
  },
  methods: {
    senddata(link) {
      // console.log(epnum);
      window.open("anime.html" + "?animeid=" + animeid + "&" + "link=" + link);
    },
  },
});

epcontainrs.mount("#app");

async function getanime() {
  let resource = await fetch(url + animeid + api);

  let data = await resource.json();

  return data;
}

getanime()
  .then((data) => {
    // console.log(data);
    let age = data.adult === false ? "13" : "18";
    let airdate = data.first_air_date;
    let getyear = airdate.slice(0, 4);
    const percent = document.querySelector(".percent");
    let datapercent = data.vote_average * 10;
    if (datapercent > 50) {
      percent.parentElement.className = `progress-circle over50 p${datapercent}`;
    } else {
      percent.parentElement.className = `progress-circle p${datapercent}`;
    }
    document.querySelector(".movieimg").src = imgurl + data.backdrop_path;
    document.querySelector(".titles").innerText = data.name;
    percent.innerHTML = datapercent + `<span>%</span>`;
    document.querySelector(".gernes").innerText =
      data.genres[0].name + " . " + data.genres[1].name;
    document.querySelector(".ratings span").innerText = `PG-${age}`;
    document.querySelector(".releasedates").innerText = getyear;
    document.querySelector(".numberofseasons").innerText =
      data.number_of_seasons + " Seasons";
    document.querySelector(".article").innerText = data.overview;
  })
  .catch((err) => {
    // console.log(err);
  });
