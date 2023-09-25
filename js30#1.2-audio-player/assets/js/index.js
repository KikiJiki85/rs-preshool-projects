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
const volumeContainer = player.querySelector('.music-app__volume-slider');
const volumePercentage = player.querySelector('.music-app__volume-percentage');
const volumeButton = player.querySelector('.music-app__volume-button');
const volumeImg = player.querySelector('.music-app__volume-img');


const songs = [`Hollywood Undead - Rain`,`Pop Evil - Survivor`,`Slipknot - Vermilion, Pt.2`];

let songIndex = 0;
let isPlaying = false;
let isChanging = false;
let soundOn = true;
let _soundLevel;

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
    if (!isPlaying || isChanging) {;
        soundOn ? track.volume = 0.5 : track.volume = 0;
        track.play();
        isPlaying = true;
        imgStatus.src = `./assets/img/pause.png`;
        isChanging = false
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

function updateBarAndTime() {
    progress.style.width = `${(track.currentTime / track.duration) * 100}%`;
    songCurrentTime.textContent = num2time(track.currentTime);
}

function updateVolume() {
    volumePercentage.style.width = `${track.volume *100}%`;
}

function rewind(evt) {
    track.currentTime = (evt.offsetX / this.clientWidth) * track.duration;
}

function volume(evt) {
    track.volume = evt.offsetX / this.clientWidth;
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
track.addEventListener('timeupdate', updateBarAndTime);
track.addEventListener('volumechange', updateVolume);
track.addEventListener('ended', playNext)
track.addEventListener('loadeddata', () => {
    songLength.textContent = num2time(track.duration);
    updateVolume();
});
progressContainer.addEventListener('click', rewind);
volumeContainer.addEventListener('click', volume);
volumeButton.addEventListener('click', () => {
    if (soundOn) {
        volumeImg.src = `./assets/img/mute.png`;
        _soundLevel = track.volume;
        track.volume = 0;
        soundOn = false;
    } else {
        volumeImg.src = `./assets/img/volume.png`;
        track.volume = _soundLevel;
        soundOn = true;
    }
});

loadSong(songs[songIndex]);

console.log(`
1.Вёрстка +10\n
-вёрстка аудиоплеера: есть кнопка Play/Pause, кнопки "Вперёд" и "Назад" для пролистывания аудиотреков, прогресс-бар, отображается название и автор трека +5
-в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5\n
2.Кнопка Play/Pause +10\n
-есть кнопка Play/Pause, при клике по которой можно запустить или остановить проигрывание аудиотрека +5
-внешний вид и функционал кнопки Play/Pause изменяется в зависимости от того, проигрывается ли в данный момент аудиотрек +5\n
3.При кликах по кнопкам "Вперёд" и "Назад" переключается проигрываемый аудиотрек. Аудиотреки пролистываются по кругу - после последнего идёт первый +10\n
4.При смене аудиотрека меняется изображение - обложка аудиотрека +10\n
5.Прогресс-бар отображает прогресс проигрывания текущего аудиотрека. При перемещении ползунка вручную меняется текущее время проигрывания аудиотрека +10\n
6.Отображается продолжительность аудиотрека и его текущее время проигрывания +10\n
7.Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
(высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо)\n
Итого: 70 баллов`);

