const player = document.querySelector('.music-app');
const playBtn = player.querySelector('.play');
const prevBtn = player.querySelector('.prev');
const nextBtn = player.querySelector('.next');
const track = player.querySelector('.music-app__track');
const progressContainer = player.querySelector('.music-app__progress-container');
const progress = player.querySelector('.music-app__progress');
const currentSong = player.querySelector('.music-app__current-song');
const coverImg = player.querySelector('.music-app__cover-img');
const imgStatus = player.querySelector('.music-app__status');

const songs = [`Beyonce - Don't Hurt Yourself`,`Dua Lipa - Don't Start Now`];

let songIndex = 0;
let isPlaying = false;
let isChanging = false;

function loadSong(song) {
    currentSong.textContent = song;
    coverImg.src = `./assets/img/cover${songIndex + 1}.png`; 
    track.src = `./assets/audio/${song}.mp3`;
}

function updateSong() {
    if(songIndex < 0) songIndex = songs.length - 1;
    else if (songIndex > songs.length - 1) songIndex = 0;
    loadSong(songs[songIndex]);
}

function playSong() {
    if (!isPlaying || isChanging) {
        track.play();
        isPlaying = true;
        imgStatus.src = `./assets/img/pause.png`;
        isChanging = false;
    } else {
        track.pause();
        isPlaying = false;
        imgStatus.src = `./assets/img/play.png`;
    }
}

function playPrev() {
    songIndex--;
    updateSong();
    isChanging = true;
    playSong();

}

function playNext() {
    songIndex++;
    updateSong();
    isChanging = true;
    playSong();
}

playBtn.addEventListener('click', playSong);
prevBtn.addEventListener('click', playPrev);
nextBtn.addEventListener('click', playNext);

loadSong(songs[songIndex]);

