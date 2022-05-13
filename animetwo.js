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

  let ss = 1;

  let eparrays = val2[ss];
  console.log(eparrays);

  for (ep of eparrays) {
    let epcard = document.createElement("div");
    epcard.className = "col-4 epcard mx-2";
    epcard.innerHTML = `
    <div class="imgcontainer">
    <img src="" class="epimg" alt="">
  </div>

  <div class="d-flex justify-content-between">
    <p class="epnum"><span>Episode</span><span></span></p>
  <div class="subs"><span>English </span><span> , Burmese</span></div>
  </div>
    `;

    cardcontainer.appendChild(epcard);

    const epimg = cardcontainer.querySelectorAll(".epimg"),
      epnum = cardcontainer.querySelectorAll(".epnum");

    // console.log(epimg);

    function insertdata(Id, idx) {
      let anid = Id;

      async function getanime() {
        let resource = await fetch(url + anid + "/season/" + 1 + api);
        // console.log(resource);

        let data = await resource.json();

        return data;
      }

      getanime()
        .then((data) => {
          console.log(data.episodes);
          epimg[idx].src = imgurl + data.episodes[idx].still_path;
          epnum[idx].innerText = "Episode " + data.episodes[idx].episode_number;
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    eparrays.forEach((epary, index) => {
      insertdata(animeid, index);
    });
  }

  poprightbtn.addEventListener("click", goright);
  popleftbtn.addEventListener("click", goleft);

  function getwidth() {
    const windowwidth = window.outerWidth;

    if (windowwidth < 600) {
      cardcontainer.style.width = `${160 * eparrays.length}px`;
    } else {
      cardcontainer.style.width = `${249 * eparrays.length}px`;
      // console.log(260 * populararrays.length);
    }
  }

  getwidth();

  let x = 0;
  let c = 5;
  // console.log(cards.length);

  function goright() {
    x++;
    let y = 249 * x;
    cardcontainer.style.transform = `translateX(-${y}px)`;

    popleftbtn.style.display = "block";

    const windowwidth = window.outerWidth;

    console.log(eparrays.length);

    if (windowwidth < 600) {
      poprightbtn.style.display = "none";
      poprightbtn.style.display = "none";
    } else if (windowwidth > 600 && windowwidth < 992) {
      if (c === eparrays.length - 3) {
        poprightbtn.style.display = "none";
      }
    } else if (windowwidth > 992 && windowwidth < 1200) {
      if (c === eparrays.length - 4) {
        poprightbtn.style.display = "none";
      }
    } else {
      if (c === eparrays.length) {
        poprightbtn.style.display = "none";
      } else if (c === eparrays.length - 5) {
        poprightbtn.style.display = "none";
      }
    }
  }

  function goleft() {
    x--;
    let y = 249 * x;
    cardcontainer.style.transform = `translateX(-${y}px)`;

    poprightbtn.style.display = "block";
    if (x === 0) {
      popleftbtn.style.display = "none";
    }
  }
});

// const epcontainrs = Vue.createApp({
//   data() {
//     return {
//       episodes: null,
//       datas: null,
//     };
//   },
//   mounted() {
//     const rootref = databasefire.ref(animeid);

//     rootref.orderByKey().on("value", (snapshot) => {
//       let val1 = snapshot.val();
//       let val2 = val1.season;
//       console.log(val2);
//       let val3 = val1.tran;
//       document.querySelector(".tranname").innerText = val3;
//       // console.log(val3);
//       // for (v in val2) {
//       //   let btn = document.createElement("div");
//       //   btn.classList.add("seasons");
//       //   btn.innerText = "Season" + v;
//       //   btn.value = v;
//       //   seasoncontiner.appendChild(btn);
//       // }

//       // let ssbtns = seasoncontiner.querySelectorAll(".seasons");
//       // ssbtns[0].classList.add("active");
//       let ss = "1";
//       // ssbtns.forEach((ssbtn) => {
//       //   ssbtn.addEventListener("click", () => {
//       //     // console.log(ssbtn.value);
//       //     removeactive();
//       //     ssbtn.classList.toggle("active");

//       //     ss = ssbtn.value;

//       //     this.episodes = val2[ss];
//       //     console.log(this.episodes);

//       //     async function getanime() {
//       //       let resource = await fetch(url + animeid + "/season/" + ss + api);

//       //       let data = await resource.json();

//       //       return data;
//       //     }

//       //     getanime()
//       //       .then((data) => {
//       //         this.datas = data.episodes;
//       //       })
//       //       .catch((err) => {
//       //         console.log(err);
//       //       });
//       //   });
//       // });

//       // function removeactive() {
//       //   ssbtns.forEach((ssbtn) => {
//       //     ssbtn.classList.remove("active");
//       //   });
//       // }

//       this.episodes = val2[ss];

//       async function getanime() {
//         let resource = await fetch(url + animeid + "/season/" + ss + api);

//         let data = await resource.json();

//         return data;
//       }

//       getanime()
//         .then((data) => {
//           this.datas = data.episodes;
//         })
//         .catch((err) => {
//           console.log(err.message);
//         });
//     });
//   },
//   methods: {
//     senddata(link) {
//       // console.log(epnum);
//       window.open("anime.html" + "?animeid=" + animeid + "&" + "link=" + link);
//     },
//   },
// });

// epcontainrs.mount("#app");

// async function getanime() {
//   let resource = await fetch(url + animeid + api);

//   let data = await resource.json();

//   return data;
// }

// getanime()
//   .then((data) => {
//     // console.log(data);
//     document.querySelector(".titles").innerText = data.name;
//   })
//   .catch((err) => {
//     console.log(err);
//   });
