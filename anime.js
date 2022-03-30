const querystring = window.location.search;
const urlParams = new URLSearchParams(querystring);

const animeid = urlParams.get("animeid");
const animelink = urlParams.get("link");

let src = `https://drive.google.com/file/d/${animelink}/preview`;
console.log(src);
document.querySelector(".src").src = src;

// TMBD api
const api = "?api_key=73146692a33e76d73a4399ffb91168cb";
const animeurl = "https://api.themoviedb.org/3/tv/";

async function getanime() {
  let resource = await fetch(animeurl + animeid + api);

  let data = await resource.json();

  return data;
}

getanime()
  .then((data) => {
    // console.log(data);
    document.querySelector(".titles").innerText = data.name;
  })
  .catch((err) => {
    console.log(err);
  });
