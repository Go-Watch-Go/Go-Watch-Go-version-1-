const querystring = window.location.search;
const urlParams = new URLSearchParams(querystring);

const playbtn = document.querySelector(".watchs");
const downloadbtn = document.querySelector(".downloads");

const movieid = urlParams.get("movieid");
// const movieid = "8392";

const firebaseConfig = {
  apiKey: "AIzaSyDr6HRu208uWXJxnhZNVUi0zMcxMpRL6As",
  authDomain: "moviedatabse.firebaseapp.com",
  databaseURL:
    "https://moviedatabse-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "moviedatabse",
  storageBucket: "moviedatabse.appspot.com",
  messagingSenderId: "15520933175",
  appId: "1:15520933175:web:74055da6c8c98efd69a6b2",
};

firebase.initializeApp(firebaseConfig);
const databasefire = firebase.database();

const rootref = databasefire.ref(movieid);

rootref.orderByKey().on("value", (snapshot) => {
  let val1 = snapshot.val();
  // console.log(val1.download);
  if (val1.download === false) {
    downloadbtn.style.display = "none";
  }

  downloadbtn.addEventListener("click", () => {
    window.open(val1.download);
  });

  document.querySelector(".tranname").innerText = val1.tran;
});

// TMBD api
const api = "?api_key=73146692a33e76d73a4399ffb91168cb";
const movieurl = "https://api.themoviedb.org/3/movie/";
const imgurl = "https://image.tmdb.org/t/p/original";

async function getanime() {
  let resource = await fetch(movieurl + movieid + api);

  let data = await resource.json();

  return data;
}

getanime()
  .then((data) => {
    // console.log(data);
    let runtime = data.runtime / 60;
    let hr = Math.floor(runtime);
    let min = data.runtime % 60;
    let age = data.adult === false ? "13" : "18";
    let airdate = data.release_date;
    let getyear = airdate.slice(0, 4);
    const percent = document.querySelector(".percent");
    let datapercent = data.vote_average * 10;
    if (datapercent > 50) {
      percent.parentElement.className = `progress-circle over50 p${datapercent}`;
    } else {
      percent.parentElement.className = `progress-circle p${datapercent}`;
    }
    document.querySelector(".movieimg").src = imgurl + data.backdrop_path;
    document.querySelector(".titles").innerText = data.title;
    percent.innerHTML = datapercent + `<span>%</span>`;
    document.querySelector(".gernes").innerText =
      data.genres[0].name + " . " + data.genres[1].name;
    document.querySelector(".ratings span").innerText = `PG-${age}`;
    document.querySelector(".releasedates").innerText = getyear;
    document.querySelector(".runtimes").innerText = `${hr}h${min}m`;
    document.querySelector(".article").innerText = data.overview;
  })
  .catch((err) => {
    console.log(err);
  });

playbtn.addEventListener("click", () => {
  window.open("movie.html" + "?movieid=" + movieid);
});

// navbar background chg
const nav = document.querySelector("nav");
const menubtn = document.querySelector(".menus");
const bar = document.querySelector(".bars i");

menubtn.addEventListener("click", () => {
  document.querySelector("nav").classList.toggle("click");
  document.body.classList.toggle("click");

  if (bar.classList.contains("fa-bars")) {
    nav.classList.add("bg-dark");
    bar.classList.remove("fa-bars");
    bar.classList.add("fa-times");
  } else {
    nav.classList.remove("bg-dark");
    bar.classList.remove("fa-times");
    bar.classList.add("fa-bars");
  }
});
