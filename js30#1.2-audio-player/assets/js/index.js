const player = document.querySelector('.music-app');
const playBtn = player.querySelector('.play');
const prevBtn = player.querySelector('.prev');
const nextBtn = player.querySelector('.next');
const track = player.querySelector('.music-app__track');
const progressContainer = player.querySelector('.music-app__progress-container');
const progress = player.querySelector('.music-app__progress');
const currentSong = player.querySelector('.music-app__current-song');
const coverImg = player.querySelector('.music-app__cover-img');
const status = player.querySelector('.music-app__status');

const songs = [`Beyonce - Don't Hurt Yourself`,`Dua Lipa - Don't Start Now`];

let songIndex = 0;
let isPlaying = false;

function loadSong(song) {
    currentSong.textContent = song;
    coverImg.src = `./assets/img/cover${songIndex + 1}.png`; 
    track.src = `./assets/audio/${song}.mp3`;
}

function playSong() {
    if (!isPlaying) {
        track.play();
        isPlaying = true;
    } else {
        track.pause();
        isPlaying = false;
    }
}

playBtn.addEventListener('click', playSong);

loadSong(songs[songIndex]);


