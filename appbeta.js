// nav section
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

const popularcards = document.querySelector(".popularcards");
const moviecards = document.querySelector(".moviecards");
const animecards = document.querySelector(".animecards");
const lastupdaecards = document.querySelector(".lastupdatecards");

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

// searchmobile.addEventListener("click", () => {
//   if (searchdiv.id) {
//     navbar.removeAttribute("id");
//     searchmobile.style.display = "none";
//     searchbtn.setAttribute("data-bs-toggle", "collapse");
//     searchbtn.setAttribute("data-bs-target", "#searchToggler");
//     searchbtnicon.classList.remove("fa-bars");
//     searchbtnicon.classList.add("fa-times");
//   }
// });

// searchbtn.addEventListener("click", () => {
//   navbar.setAttribute("id", "navbarToggler");
//   if (searchbtnicon.classList.contains("fa-times")) {
//     searchmobile.style.display = "inline-block";
//     searchbtnicon.classList.remove("fa-times");
//     searchbtnicon.classList.add("fa-bars");
//   }
// });

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

// by hiddan
// const rootref = databasefire.ref("");
const movref = databasefire.ref("movie");
const animeref = databasefire.ref("anime");
const lastref = databasefire.ref("lastanime");

// by blackbear
const mangaref = databasefire.ref("manga");
const lightNovel = databasefire.ref("lightnovel");
const bannerRef = databasefire.ref("banner");

//for banner by (blackbear)

// console.log(courselimgae);
Vue.component("owl-wrapper", {
  template: `
      <div
        class="owl-carousel owl-theme container-fluid col-12 bannerContainer" 
      >
      <div class="slide col-12" v-for="(banner,index) in banners"
      :key="index">
        
          <!-- Banner Background Image  -->
          
          <img
            :src="banner.bgposter"
            alt="background-image"
            class="bannerBg"
          />
          <div class="col-12 contentContainer">
            <!-- Content in Banner Container  -->
            <div class="col-9 col-md-7 contentTitle" v-if="banner.type !== 'nextpj'">
              <h2 class="contentName">{{banner.name}}</h2>
              <div class="tabStatus">
                <div v-if="banner.type == 'Movie'">
                  <span class="tab">
                  <span v-if="banner.onair">Air on {{banner.onair}}</span>
                  <span v-else>Avaliable</span>
                  </span>
                  </div>
                  <div v-if="banner.type == 'Ongoing'">
                    <span class="tab engTab" v-if="banner.engsub">
                    <span>English Sub (Available)</span>
                    </span>
                    <span class="tab burTab" v-if="banner.burmesesub">
                    <span>Burmese Sub (Available)</span
                                            >
                    </span>
                    </div>
                    <div v-if="banner.type == 'Series'">
                      <span class="tab">
                      <span v-if="banner.onair">Every {{banner.onair}}</span>
                      </span>
                      </div>
                <!-- <span class="tab">{{banner.type}}</span>
                <span class="tab">Burmese Sub Available</span>
                <span class="tab">Eng Sub Available</span> -->
              </div>
              <p class="overviewText">
                {{banner.overview}}
              </p>
              <div v-if="!banner.onair && banner.type == 'Movie'">
                <a :href="banner.link" class="btn btn-lg bannerPLayBtn"><i class="fa-solid fa-play mx-2"></i>Play Now</a
                                  >
              </div>
              <div v-if="banner.type !== 'Movie'">
                <a :href="banner.link" class="btn btn-lg bannerPLayBtn"><i class="fa-solid fa-play mx-2"></i>Play Now</a
                                  >
              </div>
            </div>

            <div v-else>
              <div class="col-9 col-md-7 contentTitle">
              <h2 class="contentName">{{banner.name}}
              </h2>
              <p class="coming">This <span v-if="banner.type == movie">movie</span v-else><span>series</span> will be avaliable here soon.</p>
              </div>
              </div>

            <!-- Miniposter Container  -->
            <div class="col-3 col-md-3 miniPosterContainer">
              <img
                class="miniPoster"
                :src="banner.miniposter"
                alt="Mini Poster"
              />
            </div>
          </div>
      </div>
      </div>
  `,
  data() {
    return {
      banners: 5,
    };
  },

  methods: {
    fetchdata: function () {
      bannerRef.orderByKey().on("value", (snapshot) => {
        let bannerData = snapshot.val();
        // this.banners = bannerData.length;
        this.banners = bannerData;
        // console.log(bannerData);
      });
    },
  },

  created: function () {
    this.fetchdata();
  },
});

let app = new Vue({
  el: "#banner",
  data: {},
});

// for popular row by(hidan)
animeref.orderByKey().on("value", (snapshot) => {
  let populararrays = snapshot.val().reverse();
  // console.log(populararrays);

  populararrays = populararrays.filter((popular) => {
    return popular.popular === true;
  });

  // console.log(populararrays[0].id);

  // a.push(populararrays);

  for (popular of populararrays) {
    let popularcard = document.createElement("div");
    popularcard.className = "cards";
    popularcard.innerHTML = `
      <img src="" class="popularimgs" />
      <div class="popularinfo">
        <p class="populartitle"></p>
        <div class="progresscontainer">
          <div class="progress-circle">
            <span class="percent"></span>
            <div class="left-half-clipper">
              <div class="first50-bar"></div>
              <div class="value-bar"></div>
            </div>
          </div>
  
          <span class="score"></span>
        </div>
  
        <p class="populargernes"></p>
      </div>
      `;

    popularcards.appendChild(popularcard);

    const popularimgs = popularcards.querySelectorAll(".popularimgs"),
      populartite = popularcards.querySelectorAll(".populartitle"),
      popularpercent = popularcards.querySelectorAll(".percent"),
      populargernes = popularcards.querySelectorAll(".populargernes"),
      popcards = popularcards.querySelectorAll(".cards");

    function insertdata(Id, idx) {
      let animeid = Id;

      async function getanime() {
        let resource = await fetch(url + animeid + api);

        let data = await resource.json();

        return data;
      }

      getanime()
        .then((data) => {
          // console.log(data);
          let datapercent = Math.floor(data.vote_average * 10);
          if (datapercent > 50) {
            popularpercent[
              idx
            ].parentElement.className = `progress-circle over50 p${datapercent}`;
          } else if (datapercent === 0) {
            popularpercent[
              idx
            ].parentElement.className = `progress-circle over50 p${datapercent}`;
            datapercent = 50;
          } else {
            popularpercent[
              idx
            ].parentElement.className = `progress-circle p${datapercent}`;
          }
          popcards[idx].id = Id;
          popularimgs[idx].src = imgurl + data.poster_path;
          populartite[idx].innerText = data.name;
          popularpercent[idx].innerHTML = datapercent + `<span>%</span>`;
          populargernes[idx].innerText = data.genres[1]
            ? data.genres[1].name
            : data.genres[0].name;
        })
        .catch((err) => {});
    }

    populararrays.forEach((popary, index) => {
      insertdata(popary.id, index);
    });

    popcards.forEach((popcard) => {
      popcard.addEventListener("click", function () {
        window.open("animedetail.html" + "?animeid=" + popcard.id, "_self");
      });
    });
  }

  const cardcontainer = document.querySelector(".popularcards");
  const cards = document.querySelectorAll(".cards");
  const poprightbtn = document.querySelector(".popularright"),
    popleftbtn = document.querySelector(".popularleft");

  poprightbtn.addEventListener("click", goright);
  popleftbtn.addEventListener("click", goleft);

  let xxx = null;
  let yyy = null;

  function getwidth() {
    const windowwidth = screen.width;

    if (windowwidth < 600) {
      cardcontainer.style.width = `${160 * populararrays.length}px`;
    } else {
      cardcontainer.style.width = `${240 * populararrays.length}px`;
      // console.log(260 * populararrays.length);
      xxx = 240 * populararrays.length;
      // console.log(xxx);

      // console.log(windowwidth);

      if (xxx < windowwidth) {
        poprightbtn.style.display = "none";
        popleftbtn.style.display = "none";
      } else {
        yyy = (xxx - windowwidth) / 250;
      }
    }
  }

  getwidth();

  let x = 0;
  // console.log(cards.length);

  function goright() {
    x++;
    let y = 250 * x;
    cardcontainer.style.transform = `translateX(-${y}px)`;

    popleftbtn.style.display = "block";

    const windowwidth = screen.width;

    if (windowwidth < 600) {
      poprightbtn.style.display = "none";
      poprightbtn.style.display = "none";
    } else if (xxx > windowwidth) {
      // console.log(x > yyy);
      if (x > yyy) {
        poprightbtn.style.display = "none";
      }
    }
  }

  function goleft() {
    x--;
    let y = 240 * x;
    cardcontainer.style.transform = `translateX(-${y}px)`;

    poprightbtn.style.display = "block";
    if (x === 0) {
      popleftbtn.style.display = "none";
    }
  }
});

// for movie row by(hidan)

movref.orderByKey().on("value", (snapshot) => {
  let moviearrays = snapshot.val().reverse();
  moviearrays = moviearrays.filter((moviearray) => {
    return moviearray.popular === true;
  });

  moviearrays.forEach((moviearray) => {
    console.log(moviearray.no);
  });

  moviearrays.sort(function (a, b) {
    return a.no - b.no;
  });

  for (movie of moviearrays) {
    let moviecard = document.createElement("div");
    moviecard.className = "movcards";
    moviecard.innerHTML = `
      <img src="" class="movieimgs" />
      <div class="movieinfo">
        <p class="movietitle"></p>
        <div class="progresscontainer">
          <div class="progress-circle">
            <span class="percent"></span>
            <div class="left-half-clipper">
              <div class="first50-bar"></div>
              <div class="value-bar"></div>
            </div>
          </div>
  
          <span class="score"></span>
        </div>
  
        <p class="moviegernes"></p>
      </div>
      `;

    moviecards.appendChild(moviecard);

    const movieimgs = moviecards.querySelectorAll(".movieimgs"),
      movietite = moviecards.querySelectorAll(".movietitle"),
      moviepercent = moviecards.querySelectorAll(".percent"),
      moviegernes = moviecards.querySelectorAll(".moviegernes"),
      movcards = moviecards.querySelectorAll(".movcards");

    // console.log(movcards);

    function insertmoviedata(Id, idx) {
      let movieid = Id;

      async function getmovie() {
        let resource = await fetch(movieurl + movieid + api);

        let data = await resource.json();

        return data;
      }

      getmovie()
        .then((data) => {
          // console.log(data);
          let datapercent = Math.floor(data.vote_average * 10);
          if (datapercent > 50) {
            moviepercent[
              idx
            ].parentElement.className = `progress-circle over50 p${datapercent}`;
          } else {
            moviepercent[
              idx
            ].parentElement.className = `progress-circle p${datapercent}`;
          }
          movcards[idx].id = Id;
          movieimgs[idx].src = imgurl + data.poster_path;
          movietite[idx].innerText = data.title;
          moviepercent[idx].innerHTML = datapercent + `<span>%</span>`;
          moviegernes[idx].innerText = data.genres[1].name;
        })
        .catch((err) => {
          // console.log(err);
        });
    }

    moviearrays.forEach((movary, index) => {
      // console.log(movary.id);
      insertmoviedata(movary.id, index);
    });

    movcards.forEach((movcard) => {
      movcard.addEventListener("click", function (e) {
        window.open("moviedetail.html" + "?movieid=" + movcard.id, "_self");
      });
    });
  }

  const moviecontainer = document.querySelector(".moviecards");
  const cards = document.querySelectorAll(".movcards");
  const movrightbtn = document.querySelector(".movieright"),
    movleftbtn = document.querySelector(".movieleft");

  movrightbtn.addEventListener("click", gomoviearrowright);
  movleftbtn.addEventListener("click", gomoviearrowleft);

  let xxx = null;
  let yyy = null;

  function getwidth() {
    const windowwidth = screen.width;
    // const width = screen.width;
    // console.log("screenwidth = " + width);

    if (windowwidth < 600) {
      moviecontainer.style.width = `${200 * moviearrays.length}px`;
    } else {
      moviecontainer.style.width = `${300 * moviearrays.length}px`;
      // console.log(260 * populararrays.length);
      xxx = 300 * moviearrays.length;
      // console.log(xxx);

      // console.log(windowwidth);

      if (xxx < windowwidth) {
        movrightbtn.style.display = "none";
        movleftbtn.style.display = "none";
      } else {
        yyy = (xxx - windowwidth) / 300;
        // alert(yyy);
      }
    }
  }

  getwidth();

  let x = 0;

  function gomoviearrowright() {
    x++;
    let y = 300 * x;
    moviecontainer.style.transform = `translateX(-${y}px)`;

    movleftbtn.style.display = "block";

    const windowwidth = window.outerWidth;

    if (windowwidth < 600) {
      if (x === cards.length - 2) {
        movrightbtn.style.display = "none";
        // lastrightbtn.style.display = "none";
      }
    } else if (xxx > windowwidth) {
      // console.log();
      if (x > yyy) {
        movrightbtn.style.display = "none";
      }
    }
  }

  function gomoviearrowleft() {
    x--;
    let y = 300 * x;
    moviecontainer.style.transform = `translateX(-${y}px)`;

    movrightbtn.style.display = "block";
    if (x === 0) {
      movleftbtn.style.display = "none";
    }
  }
});
