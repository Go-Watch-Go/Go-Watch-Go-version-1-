const nav = document.querySelector(".navs");
const navbar = document.querySelector(".navbars");
const searchdiv = document.querySelector(".searchdivs");
const menu = document.querySelector(".menus");
const bar = document.querySelector(".bars i");
const searchbtn = document.querySelector(".searchbtns");
const searchbtnicon = document.querySelector(".searchbtns i");
const searchmobile = document.querySelector(".searchmobilebtns");

// api
const api = "?api_key=73146692a33e76d73a4399ffb91168cb";
const url = "https://api.themoviedb.org/3/tv/";
const movieurl = "https://api.themoviedb.org/3/movie/";
const imgurl = "https://image.tmdb.org/t/p/w500";

const animecards = document.querySelector(".animeadds");

// nav function
menu.addEventListener("click", () => {
  // nav.classList.toggle("fixed-top");
  if (bar.classList.contains("fa-bars") && navbar.id) {
    searchdiv.removeAttribute("id");
    bar.classList.remove("fa-bars");
    bar.classList.add("fa-times");
  } else {
    searchdiv.setAttribute("id", "searchToggler");
    bar.classList.remove("fa-times");
    bar.classList.add("fa-bars");
  }
});

searchmobile.addEventListener("click", () => {
  if (searchdiv.id) {
    navbar.removeAttribute("id");
    searchmobile.style.display = "none";
    searchbtn.setAttribute("data-bs-toggle", "collapse");
    searchbtn.setAttribute("data-bs-target", "#searchToggler");
    searchbtnicon.classList.remove("fa-bars");
    searchbtnicon.classList.add("fa-times");
  }
});

searchbtn.addEventListener("click", () => {
  navbar.setAttribute("id", "navbarToggler");
  if (searchbtnicon.classList.contains("fa-times")) {
    searchmobile.style.display = "inline-block";
    searchbtnicon.classList.remove("fa-times");
    searchbtnicon.classList.add("fa-bars");
  }
});

//   input anime data
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
  let animearrays = snapshot.val().reverse();
  //   console.log(animearrays);
  animearrays = animearrays.filter((anime) => {
    return anime.show === true;
  });

  // a.push(populararrays);

  for (anime of animearrays) {
    let div = document.createElement("div");
    div.className = "col-4 col-md-3 col-lg-2 cards";
    let animecard = document.createElement("div");
    animecard.className = "animeposter";
    animecard.innerHTML = `
        <img src="" class="animeimgs" />
        <div class="animeinfo">
          <p class="animetitle">Jujutsu Kaisen</p>
          <div class="progresscontainer">
            <div class="progress-circle over50 p80">
              <span class="percent">80<span>%</span></span>
              <div class="left-half-clipper">
                <div class="first50-bar"></div>
                <div class="value-bar"></div>
              </div>
            </div>
    
            <span class="score">User Score</span>
          </div>
    
          <p class="animegernes">Action.Supernatural</p>
        </div>
        `;

    div.appendChild(animecard);
    animecards.appendChild(div);

    const animeimgs = animecards.querySelectorAll(".animeimgs"),
      animetite = animecards.querySelectorAll(".animetitle"),
      animepercent = animecards.querySelectorAll(".percent"),
      animegernes = animecards.querySelectorAll(".animegernes"),
      animeccs = animecards.querySelectorAll(".animeposter");

    // console.log(animeimgs);

    async function insertdata(Id, idx) {
      let animeid = Id;

      async function getanime() {
        let resource = await fetch(url + animeid + api);

        let data = await resource.json();

        return data;
      }

      await getanime()
        .then((data) => {
          //   console.log(data);
          let datapercent = data.vote_average * 10;
          if (datapercent > 50) {
            animepercent[
              idx
            ].parentElement.className = `progress-circle over50 p${datapercent}`;
          } else {
            animepercent[
              idx
            ].parentElement.className = `progress-circle p${datapercent}`;
          }
          animeccs[idx].id = Id;
          animeimgs[idx].src = imgurl + data.poster_path;
          animetite[idx].innerText = data.name;
          animepercent[idx].innerHTML = datapercent + `<span>%</span>`;
          animegernes[idx].innerText = data.genres[1].name;
        })

        .catch((err) => {});
    }

    animearrays.forEach((aniary, index) => {
      insertdata(aniary.id, index);
    });

    animeccs.forEach((animecard) => {
      animecard.addEventListener("click", function (e) {
        window.open("animedetail.html" + "?animeid=" + animecard.id, "_self");
      });
    });

    // start searchbar
    const searchbar = document.getElementById("searchbar");
    const mains = animecards.querySelectorAll(".cards");
    // console.log(mains);
    searchbar.addEventListener("input", (e) => searchdata(e.target.value));

    function searchdata(search) {
      // console.log(search);
      mains.forEach((main) => {
        if (main.innerText.toLowerCase().includes(search.toLowerCase())) {
          main.style.display = "block";
        } else {
          main.style.display = "none";
        }
      });
    }
  }
});
