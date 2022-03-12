// api
const api = "?api_key=73146692a33e76d73a4399ffb91168cb";
const url = "https://api.themoviedb.org/3/tv/";
const movieurl = "https://api.themoviedb.org/3/movie/";
const imgurl = "https://image.tmdb.org/t/p/w500";

const popularcards = document.querySelector(".popularcards");
const moviecards = document.querySelector(".moviecards");

let populararrays = [94664, 118821, 123525, 135292, 115911, 120142];
let moviearrays = [568160, 198375, 8392, 568160, 198375, 8392];

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
    populargernes = popularcards.querySelectorAll(".populargernes");

  function insertdata(Id, idx) {
    let animeid = Id;

    async function getanime() {
      let resource = await fetch(url + animeid + api);

      let data = await resource.json();

      return data;
    }

    getanime().then((data) => {
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
      popularimgs[idx].src = imgurl + data.poster_path;
      populartite[idx].innerText = data.name;
      popularpercent[idx].innerHTML = datapercent + `<span>%</span>`;
      populargernes[idx].innerText = data.genres[1].name;
    });
  }

  populararrays.forEach((popary, index) => {
    insertdata(popary, index);
  });
}

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
    moviegernes = moviecards.querySelectorAll(".moviegernes");

  function insertmoviedata(Id, idx) {
    let movieid = Id;

    async function getmovie() {
      let resource = await fetch(movieurl + movieid + api);

      let data = await resource.json();

      return data;
    }

    getmovie().then((data) => {
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
      movieimgs[idx].src = imgurl + data.poster_path;
      movietite[idx].innerText = data.title;
      moviepercent[idx].innerHTML = datapercent + `<span>%</span>`;
      moviegernes[idx].innerText = data.genres[1].name;
    });
  }

  moviearrays.forEach((movary, index) => {
    insertmoviedata(movary, index);
  });
}

// popular arrow move section
const cardcontainer = document.querySelector(".popularcards");
const moviecontainer = document.querySelector(".moviecards");
const cards = document.querySelectorAll(".cards");
const lastrightbtn = document.querySelector(".popularright"),
  lastleftbtn = document.querySelector(".popularleft");

const movrightbtn = document.querySelector(".movieright"),
  movleftbtn = document.querySelector(".movieleft");

lastrightbtn.addEventListener("click", goright);
lastleftbtn.addEventListener("click", goleft);
movrightbtn.addEventListener("click", gomoviearrowright);
movleftbtn.addEventListener("click", gomoviearrowleft);

function getwidth() {
  cardcontainer.style.width = `${260 * populararrays.length}px`;
  moviecontainer.style.width = `${360 * moviearrays.length}px`;
  console.log(260 * populararrays.length);
}

getwidth();

let x = 0;
// console.log(cards.length);

function goright() {
  x++;
  let y = 280 * x;
  cardcontainer.style.transform = `translateX(-${y}px)`;

  lastleftbtn.style.display = "block";

  const windowwidth = window.outerWidth;

  if (windowwidth < 600) {
    lastrightbtn.style.display = "none";
    lastrightbtn.style.display = "none";
  } else if (windowwidth > 600 && windowwidth < 992) {
    if (x === cards.length - 3) {
      lastrightbtn.style.display = "none";
    }
  } else if (windowwidth > 992 && windowwidth < 1200) {
    if (x === cards.length - 4) {
      lastrightbtn.style.display = "none";
    }
  } else {
    if (x === cards.length - 5) {
      lastrightbtn.style.display = "none";
    }
  }
}

function goleft() {
  x--;
  let y = 280 * x;
  cardcontainer.style.transform = `translateX(-${y}px)`;

  lastrightbtn.style.display = "block";
  if (x === 0) {
    lastleftbtn.style.display = "none";
  }
}

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
