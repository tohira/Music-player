const container = document.querySelector('.container')
const title = document.querySelector('.title')
const cover = document.querySelector('.cover')
const progressContainer = document.querySelector('.progress-container')
const progress = document.querySelector('.progress')
const prevBtn = document.querySelector('.prev')
const playBtn = document.querySelector('.play')
const nextBtn = document.querySelector('.next')
const audio = document.querySelector('audio')
const audioTime = document.getElementById('start')
const audioDur = document.getElementById('end')
const volume = document.getElementById('volume')
const volumeIcon = document.getElementById('volume-icon')


const songs =[
    'Ending - Isak Danielson',
    'Heather - Conan Gray',
    'Osmonlarda - Xamdam Sobirov',
    'U okna - HammAli & Navai'
]

let songIndex = 0

playSong(songs[songIndex])


function playSong(song) {
    title.textContent = song
    audio.src = `./musics/${song}.mp3`
    cover.src = `./album/${song}.jpg`
}

// function
function playMusic() {
    const isPlay = container.classList.contains('play')
    if (isPlay) {
        pause()
    } else {
        play()
    }
}

function play() {
    container.classList.add('play')
    playBtn.innerHTML = "<i class='fas fa-pause'></i>"
    audio.play()
}

function pause() {
    container.classList.remove('play')
    playBtn.innerHTML = "<i class='fas fa-play'></i>"
    audio.pause()
}

function next() {
    songIndex++
    if (songIndex > songs.length - 1){
        songIndex = 0
    }
    playSong(songs[songIndex])
    play()
}

function prev() {
    songIndex--
    if (songIndex < 0){
        songIndex = songs.length - 1
    }
    playSong(songs[songIndex])
    play()
}
// events

playBtn.addEventListener('click', playMusic)
nextBtn.addEventListener('click', next)
prevBtn.addEventListener('click', prev)
audio.addEventListener('timeupdate', progres)
audio.addEventListener('ended', next)
volume.addEventListener('input', changeVol)
progressContainer.addEventListener('click', setProgress)




// Progress

function progres(e) {
    const duration = e.srcElement.duration
    const currentTime = e.srcElement.currentTime
    progress.style.width = `${currentTime / duration * 100}%`

    // end
    const endMin = Math.floor(duration / 60)
    let endSec = Math.floor(duration % 60) 
    if (!endMin || !endSec) {
        audioDur.textContent = '0:00'
    } else {
        audioDur.textContent = `${endMin}:${endSec = endSec < 10 ? '0' + endSec : endSec}`
    }

    // start
    const startMin = Math.floor(currentTime / 60)
    let startSec = Math.floor(currentTime % 60) 
    audioTime.textContent = `${startMin}:${startSec = startSec < 10 ? '0' + startSec : startSec}`
}

// setProgress

function setProgress(e) {
    const width = this.clientWidth
    const offsetX = e.offsetX
    const duration = audio.duration
    console.log(offsetX, width)
    audio.currentTime = (offsetX / width) * duration
}

// Volume

function changeVol(e) {
    const volValue = Number(volume.value) / volume.max
    audio.volume = volValue
    if (volValue == 0){
        volumeIcon.setAttribute('class', 'fas fa-volume-xmark')
    } else if (volValue < 0.5) {
        volumeIcon.setAttribute('class', 'fas fa-volume-low')
    } else {
        volumeIcon.setAttribute('class', 'fas fa-volume-high')
    } 
}

volumeIcon.addEventListener('click', () => {
    if (audio.volume != 0){
        audio.volume = 0
        volumeIcon.setAttribute('class', 'fas fa-volume-xmark')
    } 
    else if (audio.volume == 0 && +volume.value != 0){
        if (+volume.value < 5) {
            volumeIcon.setAttribute('class', 'fas fa-volume-low')
        } else {
            volumeIcon.setAttribute('class', 'fas fa-volume-high')
        }
        audio.volume = +volume.value / volume.max
    }
})

// Volume range style
for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
  e.style.setProperty('--value', e.value);
  e.style.setProperty('--min', e.min == '' ? '0' : e.min);
  e.style.setProperty('--max', e.max == '' ? '100' : e.max);
  e.addEventListener('input', () => e.style.setProperty('--value', e.value));
}