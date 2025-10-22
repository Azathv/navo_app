const songs = [
  { title: "Dil so'zi", artist: "Maftuna", src: "https://www2.cs.uic.edu/~i101/SoundFiles/StarWars3.wav" },
  { title: "Ona yurt", artist: "Avaz", src: "https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand3.wav" },
  { title: "Sevgi nidosi", artist: "Jasur", src: "https://www2.cs.uic.edu/~i101/SoundFiles/ImperialMarch60.wav" }
];

let currentIndex = 0;
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const songTitleEl = document.getElementById('song-title');
const songArtistEl = document.getElementById('song-artist');
const playlistEl = document.getElementById('playlist');

function init(){
  renderPlaylist();
  loadSong(0);
  bindEvents();
}

function renderPlaylist(){
  playlistEl.innerHTML = '';
  songs.forEach((s, i) => {
    const div = document.createElement('div');
    div.className = 'item';
    div.dataset.index = i;
    div.innerHTML = `<div><div class='title'>${s.title}</div><div class='meta'>${s.artist}</div></div><div class='meta'>▶</div>`;
    div.addEventListener('click', ()=> loadSong(i));
    playlistEl.appendChild(div);
  });
}

function bindEvents(){
  playBtn.addEventListener('click', togglePlay);
  nextBtn.addEventListener('click', ()=> loadSong((currentIndex+1)%songs.length));
  prevBtn.addEventListener('click', ()=> loadSong((currentIndex-1+songs.length)%songs.length));
  audio.addEventListener('ended', ()=> loadSong((currentIndex+1)%songs.length));
}

function togglePlay(){
  if(audio.paused){
    audio.play();
    playBtn.textContent = '⏸️';
  } else {
    audio.pause();
    playBtn.textContent = '▶️';
  }
}

function loadSong(index){
  currentIndex = index;
  const s = songs[index];
  audio.src = s.src;
  songTitleEl.textContent = `${s.title} — ${s.artist}`;
  songArtistEl.textContent = s.artist;
  audio.play().catch(()=>{ /* autoplay may be blocked, user can press play */ });
  playBtn.textContent = '⏸️';
  highlightActive();
}

function highlightActive(){
  Array.from(playlistEl.children).forEach(el=>{
    el.style.background = el.dataset.index==currentIndex ? 'rgba(2,119,189,0.08)' : 'transparent';
  });
}

document.addEventListener('DOMContentLoaded', init);
