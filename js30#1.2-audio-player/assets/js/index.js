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
const songLength = player.querySelector('.music-app__time-total');
const songCurrentTime = player.querySelector('.music-app__time-current');

const songs = [`Beyonce - Don't Hurt Yourself`,`Dua Lipa - Don't Start Now`,`Slipknot - Vermilion, Pt.2`];

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
    isChanging = true;
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
    playSong();
}

function playNext() {
    songIndex++;
    updateSong();
    playSong();
}

function updateProgressBarAndSongCurrentTime() {
    progress.style.width = `${(track.currentTime / track.duration) * 100}%`;
    songCurrentTime.textContent = num2time(track.currentTime);
}

function rewind(evt) {
    track.currentTime = (evt.offsetX / this.clientWidth) * track.duration;
}

function num2time(num) {
    let sec = parseInt(num);
    let min = parseInt(sec / 60);
    sec -= min * 60; 
    let h = parseInt(min / 60);
    min -= h * 60;

    if(h === 0) return `${min}:${String(sec % 60).padStart(2,0)}`;
    return `${String(h).padStart(2,0)}:${min}:${String(sec % 60).padStart(2,0)}`;
}

playBtn.addEventListener('click', playSong);
prevBtn.addEventListener('click', playPrev);
nextBtn.addEventListener('click', playNext);
track.addEventListener('timeupdate', updateProgressBarAndSongCurrentTime);
track.addEventListener('ended', playNext)
track.addEventListener('loadeddata', () => {
    songLength.textContent = num2time(track.duration);
});
progressContainer.addEventListener('click', rewind);

loadSong(songs[songIndex]);

