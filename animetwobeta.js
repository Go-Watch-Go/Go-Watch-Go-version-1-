const querystring = window.location.search;
const urlParams = new URLSearchParams(querystring);

const animeid = urlParams.get("animeid");
const animelink = urlParams.get("link");

// const animeid = "82684";
// const animelink = "12FMv4bXrPOtIauc1uul1vFBw84FMmPbg";

let src = `https://drive.google.com/file/d/${animelink}/preview`;
// console.log(src);
document.querySelector(".src").src = src;

// firebase
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

// TMBD api
const api = "?api_key=73146692a33e76d73a4399ffb91168cb";
const url = "https://api.themoviedb.org/3/tv/";
const imgurl = "https://image.tmdb.org/t/p/w1280";

const cardcontainer = document.querySelector(".epcards");
const cards = document.querySelectorAll(".epcard");
const poprightbtn = document.querySelector(".right"),
  popleftbtn = document.querySelector(".left");

let seasoncontiner = document.querySelector(".seasoncontainers");

let x = 0;

firebase.initializeApp(firebaseConfig);
const databasefire = firebase.database();

const rootref = databasefire.ref(animeid);

rootref.orderByKey().on("value", (snapshot) => {
  let val1 = snapshot.val();
  let val2 = val1.season;
  // console.log(val2);
  let val3 = val1.tran;
  document.querySelector(".tranname").innerText = val3;

  for (v in val2) {
    let btn = document.createElement("li");
    btn.className = "dropdown-item seasons";
    btn.innerText = "Season" + v;
    btn.value = v;
    seasoncontiner.appendChild(btn);
  }

  let ssbtns = seasoncontiner.querySelectorAll(".seasons");

  let ss = 1;

  let eparrays = val2[ss];

  // console.log(eparrays);

  // data call from firebase function
  datacall(eparrays, ss);

  // season btn fundtion
  ssbtns.forEach((ssbtn) => {
    ssbtn.addEventListener("click", () => {
      // console.log(ssbtn.value);

      cardcontainer.innerHTML = "";

      ss = ssbtn.value;
      // console.log(ss);

      eparrays = val2[ss];
      // console.log(eparrays);
      document.querySelector(".btns").innerText = "Season" + ss;

      datacall(eparrays, ss);
    });
  });
});

// data call from firebase function
function datacall(eparrays, ss) {
  for (ep of eparrays) {
    let epcard = document.createElement("div");
    epcard.className = "col-4 epcard";
    epcard.innerHTML = `
    <div class="imgcontainer">
    <img src="" class="epimg" alt="">
  </div>

  <div class="epdivs my-3">
    <p class="epnum"><span>Episode</span><span></span></p>
  <div class="subs"><span class="eng">English </span><span class="mm"> , Burmese</span></div>
  </div>
    `;

    cardcontainer.appendChild(epcard);

    const epimg = cardcontainer.querySelectorAll(".epimg"),
      epnum = cardcontainer.querySelectorAll(".epnum"),
      eng = cardcontainer.querySelectorAll(".eng"),
      mm = cardcontainer.querySelectorAll(".mm"),
      eps = cardcontainer.querySelectorAll(".epcard");

    // console.log(epimg);

    function insertdata(Id, idx) {
      let anid = Id;

      async function getanime() {
        let resource = await fetch(url + anid + "/season/" + ss + api);
        // console.log(resource);

        let data = await resource.json();

        return data;
      }

      getanime()
        .then((data) => {
          // console.log(data);
          epimg[idx].src = imgurl + data.episodes[idx].still_path;
          epnum[idx].innerText = "Episode " + data.episodes[idx].episode_number;
          // console.log(eparrays[idx].mm);
          if (eparrays[idx].eng === false) {
            eng[idx].style.display = "none";
          }

          if (eparrays[idx].mm === false) {
            // console.log("hhhh");
            mm[idx].style.display = "none";
          }
        })
        .catch((err) => {
          // console.log(err.message);
        });
    }

    eparrays.forEach((epary, index) => {
      insertdata(animeid, index);
    });

    eps.forEach((ep, index) => {
      ep.addEventListener("click", function (e) {
        console.log(index);
        let link = eparrays[index].watch;
        console.log(link);
        window.open(
          "animevtwo.html" + "?animeid=" + animeid + "&" + "link=" + link,
          "_self"
        );
      });
    });
  }

  poprightbtn.addEventListener("click", goright);
  popleftbtn.addEventListener("click", goleft);

  let yyy = null;
  let xxx = null;

  function getwidth() {
    const windowwidth = screen.width;
    if (windowwidth < 600) {
      cardcontainer.style.width = `${142 * eparrays.length}px`;
    } else {
      cardcontainer.style.width = `${250 * eparrays.length}px`;
      // console.log(260 * populararrays.length);
      xxx = 257 * eparrays.length;
      // console.log(xxx);

      // console.log(windowwidth);

      if (xxx < windowwidth) {
        poprightbtn.style.display = "none";
        popleftbtn.style.display = "none";
      } else {
        yyy = (xxx - windowwidth) / 257;
      }
    }
  }

  getwidth();

  let x = 0;
  // let c = 5;
  // console.log(cards.length);

  function goright() {
    x++;
    // c++;
    let y = 257 * x;
    cardcontainer.style.transform = `translateX(-${y}px)`;

    popleftbtn.style.display = "block";

    // const windowwidth = screen.width;

    // console.log(eparrays.length);
    console.log(x, yyy);

    if (x > yyy) {
      poprightbtn.style.display = "none";
    }
  }

  function goleft() {
    x--;
    let y = 257 * x;
    cardcontainer.style.transform = `translateX(-${y}px)`;

    poprightbtn.style.display = "block";
    if (x === 0) {
      popleftbtn.style.display = "none";
    }
  }
}

// anime titel call
async function getanime() {
  let resource = await fetch(url + animeid + api);

  let data = await resource.json();

  return data;
}

getanime()
  .then((data) => {
    // console.log(data);
    document.querySelector(".titles").innerText = data.name;
    document.querySelector(".tabTitle").innerText =
      "Go Watch Go - " + data.name;
  })
  .catch((err) => {
    console.log(err);
  });

if (window.orientation !== undefined) {
  // console.log("mobile");
}

const isMobile = function () {
  const match = window.matchMedia("(pointer:coarse)");
  return match && match.matches;
};

const boxs = document.querySelector(".boxs");

if (isMobile() === true) {
  console.log("mobile");
  boxs.classList.add("mobile");
  popleftbtn.classList.add("mobile");
  poprightbtn.classList.add("mobile");
} else {
  boxs.classList.remove("mobile");
  popleftbtn.classList.remove("mobile");
  poprightbtn.classList.remove("mobile");
}
