// Firebase section
const firebaseConfig = {
  apiKey: "AIzaSyA3IXIXVz-s0Kh9LL3UQY83PnXRXP8nrjk",
  authDomain: "gowatchgo-test.firebaseapp.com",
  databaseURL:
    "https://gowatchgo-test-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gowatchgo-test",
  storageBucket: "gowatchgo-test.appspot.com",
  messagingSenderId: "423847196030",
  appId: "1:423847196030:web:266e79495aeefcb8206f2f",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const mangaRef = db.ref("manga");
const cardGroupContainer = document.querySelector(".cardGroupContainer");

mangaRef.orderByKey().on("value", (snapshot) => {
  let mangaArr = snapshot.val();
  console.warn(mangaArr);

  for (let manga of mangaArr) {
    let mangaCard = document.createElement("div");
    mangaCard.className = "singleCard";
    mangaCard.innerHTML = `
      <img src="" class="" />
      <div class="mangaInfo">
        <p class="mangaTitle">${manga.name}</p>
        <p class="mangaGrene"></p>
      </div>
    `;

    cardGroupContainer.appendChild(mangaCard);
    console.warn(cardGroupContainer);
  }
});
