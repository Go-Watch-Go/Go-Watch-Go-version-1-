const querystring = window.location.search;
const urlParams = new URLSearchParams(querystring);

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
  // console.log(val1.tran);

  document.querySelector(".tranname").innerText = val1.tran;

  let src = `https://drive.google.com/file/d/${val1.watch}/preview`;
  console.log(src);
  document.querySelector(".src").src = src;
});

// TMBD api
const api = "?api_key=73146692a33e76d73a4399ffb91168cb";
const movieurl = "https://api.themoviedb.org/3/movie/";

const nav = document.querySelector(".navs");
const navbar = document.querySelector(".navbars");
const menu = document.querySelector(".menus");
const bar = document.querySelector(".bars i");

async function getanime() {
  let resource = await fetch(movieurl + movieid + api);

  let data = await resource.json();

  return data;
}

getanime()
  .then((data) => {
    // console.log(data);
    document.querySelector(".titles").innerText = data.title;
    document.querySelector(".moviesPlayerTitle").innerText =
      "Go Watch Go - " + data.title;
  })
  .catch((err) => {
    console.log(err);
  });

menu.addEventListener("click", () => {
  // nav.classList.toggle("fixed-top");
  if (bar.classList.contains("fa-bars") && navbar.id) {
    // searchdiv.removeAttribute("id");
    bar.classList.remove("fa-bars");
    bar.classList.add("fa-times");
  } else {
    // searchdiv.setAttribute("id", "searchToggler");
    bar.classList.remove("fa-times");
    bar.classList.add("fa-bars");
  }
});
