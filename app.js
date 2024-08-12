const btnPlay = document.querySelector(".play");
const btnNext = document.querySelector(".next");
const btnPrev = document.querySelector(".prev");
const audio = document.querySelector("audio");
const image = document.querySelector(".cover");
const title = document.querySelector(".title");
const progresContainer = document.querySelector(".progress-container");
const progres = document.querySelector(".progress");
const container = document.querySelector(".container");
const volume = document.getElementById("volume");
const volumeIcon = document.querySelector(".volume-form span");
const songs = [
  "INNA - Amazing",
  "Lola Yuldasheva - Toshkent Samarqand",
  "Maroon 5 - Wait",
  "Matrang - заманчивая",
  "The weekend - save your tears",
];

let indexSong = 0;

btnPlay.addEventListener("click", () => {
  if (container.classList.contains("play")) {
    playFunc("play");
  } else {
    playFunc("pause");
  }
});

// PLAY FUNC
function playFunc(param) {
  container.classList.toggle("play");
  param == "play" ? audio.pause() : audio.play();
  btnPlay.innerHTML = `<i class="fas fa-${param}"></i>`;
}

// BUTTON NEXT CLICK

btnNext.addEventListener("click", nextFunc);
btnPrev.addEventListener("click", prevFunc);
// NEXT FUNCTION

function nextFunc() {
  indexSong++;
  indexSong = indexSong > songs.length - 1 ? 0 : indexSong;

  title.textContent = songs[indexSong];
  image.src = `./album/${songs[indexSong]}.jpg`;
  audio.src = `musics/${songs[indexSong]}.mp3`;
  if (container.classList.contains("play")) {
    audio.play();
  }
}
function prevFunc() {
  indexSong--;
  indexSong = indexSong < 0 ? songs.length - 1 : indexSong;

  title.textContent = songs[indexSong];
  image.src = `./album/${songs[indexSong]}.jpg`;
  audio.src = `musics/${songs[indexSong]}.mp3`;
  if (container.classList.contains("play")) {
    audio.play();
  }
}

volume.addEventListener("input", () => {
  let auidioVolum = volume.value / 10;
  audio.volume = auidioVolum;
  if (auidioVolum < 0.1) {
    volumeIcon.innerHTML = `<i class="fa-solid fa-volume-off"</i>`;
  } else if (auidioVolum < 0.5) {
    volumeIcon.innerHTML = `<i class="fa-solid fa-volume-low"</i>`;
  } else {
    volumeIcon.innerHTML = `<i class="fa-solid fa-volume-high"</i>`;
  }
});
