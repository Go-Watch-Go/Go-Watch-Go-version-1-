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
const app = Vue.createApp({
  data() {
    return {
      banners: null,
      active: 0,
      num: 1,
    };
  },

  methods: {
    fetchdata: function () {
      bannerRef.orderByKey().on("value", (snapshot) => {
        let bannerData = snapshot.val();
        this.banners = bannerData;
        // console.log(bannerData[3].miniposter);
      });
    },
    addnum() {
      this.num + 1;
    },
  },

  created: function () {
    this.fetchdata();
  },
});

app.mount("#banner");

// courselimgae[0].classList.add("active");

// for popular row by(hidan)
animeref.orderByKey().on("value", (snapshot) => {
  let populararrays = snapshot.val().reverse();
  // console.log(populararrays);

  populararrays = populararrays.filter((popular) => {
    return popular.popular === true;
  });

  console.log(populararrays);

  // a.push(populararrays);

  for (popular of populararrays) {
    let popularcard = document.createElement("div");
    popularcard.className = "cards";
    popularcard.innerHTML = `
      <img src="" class="popularimgs" />
      <div class="popularinfo">
        <p class="populartitle">Jujutsu Kaisen</p>
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
  
        <p class="populargernes">Action.Supernatural</p>
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
          let datapercent = data.vote_average * 10;
          if (datapercent > 50) {
            popularpercent[
              idx
            ].parentElement.className = `progress-circle over50 p${datapercent}`;
          } else {
            popularpercent[
              idx
            ].parentElement.className = `progress-circle p${datapercent}`;
          }
          popcards[idx].id = Id;
          popularimgs[idx].src = imgurl + data.poster_path;
          populartite[idx].innerText = data.name;
          popularpercent[idx].innerHTML = datapercent + `<span>%</span>`;
          populargernes[idx].innerText = data.genres[1].name;
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

  function getwidth() {
    const windowwidth = window.outerWidth;

    if (windowwidth < 600) {
      cardcontainer.style.width = `${160 * populararrays.length}px`;
    } else {
      cardcontainer.style.width = `${240 * populararrays.length}px`;
      // console.log(260 * populararrays.length);
    }
  }

  getwidth();

  let x = 0;
  // console.log(cards.length);

  function goright() {
    x++;
    let y = 260 * x;
    cardcontainer.style.transform = `translateX(-${y}px)`;

    popleftbtn.style.display = "block";

    const windowwidth = window.outerWidth;

    if (windowwidth < 600) {
      poprightbtn.style.display = "none";
      poprightbtn.style.display = "none";
    } else if (windowwidth > 600 && windowwidth < 992) {
      if (x === cards.length - 3) {
        poprightbtn.style.display = "none";
      }
    } else if (windowwidth > 992 && windowwidth < 1200) {
      if (x === cards.length - 4) {
        poprightbtn.style.display = "none";
      }
    } else {
      if (x === cards.length - 6) {
        poprightbtn.style.display = "none";
      }
    }
  }

  function goleft() {
    x--;
    let y = 280 * x;
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
    return moviearray.show === true;
  });
  // console.log(moviearrays);

  for (movie of moviearrays) {
    let moviecard = document.createElement("div");
    moviecard.className = "movcards";
    moviecard.innerHTML = `
      <img src="" class="movieimgs" />
      <div class="movieinfo">
        <p class="movietitle">Jujutsu Kaisen</p>
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
  
        <p class="moviegernes">Action.Supernatural</p>
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
          let datapercent = data.vote_average * 10;
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

  function getwidth() {
    const windowwidth = window.outerWidth;

    if (windowwidth < 600) {
      moviecontainer.style.width = `${200 * moviearrays.length}px`;
    } else {
      moviecontainer.style.width = `${360 * moviearrays.length}px`;
      // console.log(260 * populararrays.length);
    }
  }

  getwidth();

  let x = 0;

  function gomoviearrowright() {
    x++;
    let y = 267 * x;
    moviecontainer.style.transform = `translateX(-${y}px)`;

    movleftbtn.style.display = "block";

    const windowwidth = window.outerWidth;

    if (windowwidth < 600) {
      if (x === cards.length - 2) {
        movrightbtn.style.display = "none";
        // lastrightbtn.style.display = "none";
      }
    } else if (windowwidth > 600 && windowwidth < 992) {
      if (x === cards.length - 1) {
        movrightbtn.style.display = "none";
      }
    } else if (windowwidth > 992 && windowwidth < 1200) {
      if (x === cards.length - 2) {
        movrightbtn.style.display = "none";
      }
    } else {
      if (x === cards.length - 3) {
        movrightbtn.style.display = "none";
      }
    }
  }

  function gomoviearrowleft() {
    x--;
    let y = 330 * x;
    moviecontainer.style.transform = `translateX(-${y}px)`;

    movrightbtn.style.display = "block";
    if (x === 0) {
      movleftbtn.style.display = "none";
    }
  }
});

// for anime row by(hidan)
animeref.orderByKey().on("value", (snapshot) => {
  let animearrays = snapshot.val().reverse();

  animearrays = animearrays.filter((anime) => {
    return anime.show === true;
  });
  // console.log(animearrays);

  // a.push(populararrays);

  for (anime of animearrays) {
    let animecard = document.createElement("div");
    animecard.className = "anicards";
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

    animecards.appendChild(animecard);

    const animeimgs = animecards.querySelectorAll(".animeimgs"),
      animetite = animecards.querySelectorAll(".animetitle"),
      animepercent = animecards.querySelectorAll(".percent"),
      animegernes = animecards.querySelectorAll(".animegernes");
    animeccs = animecards.querySelectorAll(".anicards");

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
  }

  const cardcontainer = document.querySelector(".animecards");
  const cards = document.querySelectorAll(".anicards");
  const poprightbtn = document.querySelector(".animeright"),
    popleftbtn = document.querySelector(".animeleft");

  poprightbtn.addEventListener("click", goright);
  popleftbtn.addEventListener("click", goleft);

  function getwidth() {
    const windowwidth = window.outerWidth;

    if (windowwidth < 600) {
      cardcontainer.style.width = `${160 * animearrays.length}px`;
    } else {
      cardcontainer.style.width = `${260 * animearrays.length}px`;
      // console.log(260 * populararrays.length);
    }
  }

  getwidth();

  let x = 0;
  // console.log(cards.length);

  function goright() {
    x++;
    let y = 260 * x;
    cardcontainer.style.transform = `translateX(-${y}px)`;

    popleftbtn.style.display = "block";

    const windowwidth = window.outerWidth;

    if (windowwidth < 600) {
      poprightbtn.style.display = "none";
      poprightbtn.style.display = "none";
    } else if (windowwidth > 600 && windowwidth < 992) {
      if (x === cards.length - 3) {
        poprightbtn.style.display = "none";
      }
    } else if (windowwidth > 992 && windowwidth < 1200) {
      if (x === cards.length - 4) {
        poprightbtn.style.display = "none";
      }
    } else {
      if (x === cards.length - 6) {
        poprightbtn.style.display = "none";
      }
    }
  }

  function goleft() {
    x--;
    let y = 280 * x;
    cardcontainer.style.transform = `translateX(-${y}px)`;

    poprightbtn.style.display = "block";
    if (x === 0) {
      popleftbtn.style.display = "none";
    }
  }
});

// for lastupdate row by (hidan)
lastref.orderByKey().on("value", (snapshot) => {
  let val1 = snapshot.val().reverse();
  // console.log(val1[0].id);

  let lastupdatearrays = [];
  for (let i = 0; i < val1.length; i++) {
    lastupdatearrays.push(val1[i].id);
    // console.log(lastupdatearrays);
  }
  // console.log(lastupdatearrays);

  for (lastupdate of lastupdatearrays) {
    let lastcard = document.createElement("div");
    lastcard.className = "lastcards";
    lastcard.innerHTML = `
    <img
    src="https://www.gstatic.com/webp/gallery/4.sm.jpg"
    class="lastimgs"
  />
  <div class="lastinfo">
    <p class="lasttitle">Jujutsu Kaisen</p>
    <p class="lastep">Episode 7</p>
  </div>
      `;

    lastupdaecards.appendChild(lastcard);

    const lastimgs = lastupdaecards.querySelectorAll(".lastimgs"),
      lasttitle = lastupdaecards.querySelectorAll(".lasttitle"),
      lastep = lastupdaecards.querySelectorAll(".lastep");

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
          lastimgs[idx].src = imgurl + data.backdrop_path;
          lasttitle[idx].innerText = data.name;
          lastep[idx].innerText = "Episode" + val1[idx].ep;
        })
        .catch((err) => {});
    }

    lastupdatearrays.forEach((lastary, index) => {
      insertdata(lastary, index);
    });
  }

  const moviecontainer = document.querySelector(".lastupdatecards");
  const cards = document.querySelectorAll(".lastcards");
  const movrightbtn = document.querySelector(".lastupdateright"),
    movleftbtn = document.querySelector(".lastupdateleft");

  movrightbtn.addEventListener("click", gomoviearrowright);
  movleftbtn.addEventListener("click", gomoviearrowleft);

  function getwidth() {
    const windowwidth = window.outerWidth;

    if (windowwidth < 600) {
      moviecontainer.style.width = `${200 * lastupdatearrays.length}px`;
    } else {
      moviecontainer.style.width = `${360 * lastupdatearrays.length}px`;
      // console.log(260 * populararrays.length);
    }
  }

  getwidth();

  let x = 0;

  function gomoviearrowright() {
    x++;
    let y = 330 * x;
    moviecontainer.style.transform = `translateX(-${y}px)`;

    movleftbtn.style.display = "block";

    const windowwidth = window.outerWidth;

    if (windowwidth < 600) {
      if (x === cards.length - 2) {
        movrightbtn.style.display = "none";
        // lastrightbtn.style.display = "none";
      }
    } else if (windowwidth > 600 && windowwidth < 992) {
      if (x === cards.length - 1) {
        movrightbtn.style.display = "none";
      }
    } else if (windowwidth > 992 && windowwidth < 1200) {
      if (x === cards.length - 2) {
        movrightbtn.style.display = "none";
      }
    } else {
      if (x === cards.length - 3) {
        movrightbtn.style.display = "none";
      }
    }
  }

  function gomoviearrowleft() {
    x--;
    let y = 330 * x;
    moviecontainer.style.transform = `translateX(-${y}px)`;

    movrightbtn.style.display = "block";
    if (x === 0) {
      movleftbtn.style.display = "none";
    }
  }
});

// for manga row by(black bear)
let getMangaData = () => {
  let http = new XMLHttpRequest();
  http.open("GET", "manga.json", true);
  http.send();

  http.onload = function () {
    if (this.readyState == 4 && this.status == 200) {
      // console.warn("Manga Get Data Work");
      let resource = JSON.parse(this.responseText);
      let mangaBox = "";
      let mangaImgContainer = document.querySelector(".mangacards");
      console.error(resource.length);
      console.warn(typeof resource);
      for (let manga of resource) {
        mangaBox += `
        <div class="mangaCardBox">
           <img src="${manga.image}" class="mangaImage" />
          <div class="mangaInfo">
            <p class="mangaName">${manga.name}</p>
            <p class="mangaGrenes">${manga.grenes}</p> 
          </div>
        </div>
        `;
      }

      mangaImgContainer.innerHTML = mangaBox;
    }
  };

  const mangarightbtn = document.querySelector(".mangaRight");
  const mangaleftbtn = document.querySelector(".mangaLeft");

  const mangaCards = document.querySelector(".mangacards");
  const mangaCardBox = document.querySelector(".mangaCardBox");

  mangarightbtn.addEventListener("click", mangaGoRight);
  mangaleftbtn.addEventListener("click", mangaGoLeft);

  let number = 0;

  // function for move manga card to next side
  function mangaGoRight() {
    console.error();
    mangaleftbtn.style.display = "block";
    number++;
    let position = 225 * number;
    mangaCards.style.transform = `translateX(${-position}px)`;

    let resource = JSON.parse(this.responseText);
    console.log(resource);
    const windowwidth = window.outerWidth;
    console.warn(windowwidth);
    console.warn(resource.length);
    if (windowwidth < 600) {
      if (number === resource.length - 2) {
        mangarightbtn.style.display = "none";
      }
    } else if (windowwidth > 600 && windowwidth < 992) {
      if (number === resource.length - 1) {
        mangarightbtn.style.display = "none";
      }
    } else if (windowwidth > 992 && windowwidth < 1200) {
      if (number === resource.length - 2) {
        mangarightbtn.style.display = "none";
      }
    } else {
      if (number === resource.length - 3) {
        mangarightbtn.style.display = "none";
      }
    }
  }

  // function for move manga card to prev side
  function mangaGoLeft() {
    console.log("I am left");
    number--;
    let position = 225 * number;
    mangaCards.style.transform = `translateX(${-position}px)`;

    mangarightbtn.style.display = "block";
    if (number == 0) {
      mangaleftbtn.style.display = "none";
    }
  }
};

getMangaData();

// for lightnovel row by (black bear)
let getLightnovelData = () => {
  let http = new XMLHttpRequest();

  http.open("GET", "lightnovel.json", true);
  http.send();

  http.onload = function () {
    if (this.readyState == 4 && this.status == 200) {
      // console.warn("Light novel data work");
      let resource = JSON.parse(this.responseText);
      let lightnovelBox = "";
      let lightnovelCards = document.querySelector(".lightnovelcards");

      // console.warn(lightnovelCards);

      for (let lightnovel of resource) {
        lightnovelBox += `
        <div class="lightnovelCardBox">
          <img src="${lightnovel.image}" class="lightnovelPoster" />
          <div class="lightnovelInfo">
            <p class="lightnovelName">${lightnovel.name}</p>
            <p class="lightnovelGrenes">${lightnovel.grenes}</p>
          </div>
        </div>
        `;

        lightnovelCards.innerHTML = lightnovelBox;
      }
    }
  };
};

getLightnovelData();

// api
// const api = "?api_key=73146692a33e76d73a4399ffb91168cb";
// const url = "https://api.themoviedb.org/3/tv/";
// const movieurl = "https://api.themoviedb.org/3/movie/";
// const imgurl = "https://image.tmdb.org/t/p/w500";

// const popularcards = document.querySelector(".popularcards");
// const moviecards = document.querySelector(".moviecards");
// const animecards = document.querySelector(".animecards");
// const lastupdaecards = document.querySelector(".lastupdatecards");
// const mangacards = document.querySelector(".mangacards");

// firestore test
