const querystring = window.location.search;
const urlParams = new URLSearchParams(querystring);

// const movieid = urlParams.get("movieid");
const animeid = "95479";

const epcontainrs = Vue.createApp({
  data() {
    return {
      episodes: [],
      datas: [],
      imgurl: "https://image.tmdb.org/t/p/w500/veG3J8KaBudM8omuGi58fYOMDTz.jpg",
    };
  },
  mounted() {
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

    firebase.initializeApp(firebaseConfig);
    const databasefire = firebase.database();

    const rootref = databasefire.ref(animeid);

    rootref.orderByKey().on("value", (snapshot) => {
      let val1 = snapshot.val();
      console.log(val1);
      this.episodes = val1;

      // TMBD api
      const api = "?api_key=73146692a33e76d73a4399ffb91168cb";
      const movieurl = "https://api.themoviedb.org/3/tv/";
      const imgurl = "https://image.tmdb.org/t/p/w500";

      async function getanime() {
        let resource = await fetch(movieurl + animeid + "/season/1" + api);

        let data = await resource.json();

        return data;
      }

      getanime()
        .then((data) => {
          console.log(data);
          this.datas = data.episodes;
          // console.log(this.datas[0].name);
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
  },
});

epcontainrs.mount("#app");

const api = "?api_key=73146692a33e76d73a4399ffb91168cb";
const url = "https://api.themoviedb.org/3/tv/";
const imgurl = "https://image.tmdb.org/t/p/w1280";

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
