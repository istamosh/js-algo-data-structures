const playlistSongs = document.getElementById('playlist-songs');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const nextButton = document.getElementById('next');
const previousButton = document.getElementById('previous');
const shuffleButton = document.getElementById('shuffle');

const allSongs = [
    {
        id: 0,
        title: "Scratching The Surface",
        artist: "Quincy Larson",
        duration: "4:25",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/scratching-the-surface.mp3"
    }, {
        id: 1,
        title: "Can't Stay Down",
        artist: "Quincy Larson",
        duration: "4:15",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cant-stay-down.mp3"
    }, {
        id: 2,
        title: "Still Learning",
        artist: "Quincy Larson",
        duration: "3:51",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/still-learning.mp3"
    },
    {
      id: 3,
      title: "Cruising for a Musing",
      artist: "Quincy Larson",
      duration: "3:34",
      src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cruising-for-a-musing.mp3",
    },
    {
      id: 4,
      title: "Never Not Favored",
      artist: "Quincy Larson",
      duration: "3:35",
      src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/never-not-favored.mp3",
    },
    {
      id: 5,
      title: "From the Ground Up",
      artist: "Quincy Larson",
      duration: "3:12",
      src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/from-the-ground-up.mp3",
    },
    {
      id: 6,
      title: "Walking on Air",
      artist: "Quincy Larson",
      duration: "3:25",
      src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/walking-on-air.mp3",
    },
    {
      id: 7,
      title: "Can't Stop Me. Can't Even Slow Me Down.",
      artist: "Quincy Larson",
      duration: "3:52",
      src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cant-stop-me-cant-even-slow-me-down.mp3",
    },
    {
      id: 8,
      title: "The Surest Way Out is Through",
      artist: "Quincy Larson",
      duration: "3:10",
      src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/the-surest-way-out-is-through.mp3",
    },
    {
      id: 9,
      title: "Chasing That Feeling",
      artist: "Quincy Larson",
      duration: "2:43",
      src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/chasing-that-feeling.mp3",
    }
];

// HTML Web Audio API
const audio = new Audio();

// curret song playing goes here and using spread operator to list all current available songs there
let userData = {
    songs: [...allSongs],
    currentSong: null,
    songCurrentTime: 0
};

// This will iterate and search for song ID passed back into playSong func.
const playSong = id => {
    const song = userData?.songs.find(song => song.id === id);

    // get the current song audio source and title
    audio.src = song.src;
    audio.title = song.title;

    if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
        audio.currentTime = 0;
    } else {
        audio.currentTime = userData?.songCurrentTime;
    }

    // update the current song being played as well as the appearance of the playButton element.
    userData.currentSong = song;

    // append css .playing declaration style into playbutton
    playButton.classList.add('playing');
    
    highlightCurrentSong();

    setPlayerDisplay();

    setPlayButtonAccessibleText();

    // finally play the audio file
    audio.play();
};

// pausing the currently playing song
// excludes optional chaining (userData?.) because it won't be a null or undefined value
const pauseSong = () => {
    userData.songCurrentTime = audio.currentTime;

    // remove styling when paused and pause the audio
    playButton.classList.remove('playing');
    audio.pause();
};

const playNextSong = () => {
    if (userData?.currentSong === null) {
        playSong(userData?.songs[0].id);
    } else {
        const currentSongIndex = getCurrentSongIndex();

        const nextSong = userData?.songs[currentSongIndex + 1];
        playSong(nextSong.id);
    }
};

const playPreviousSong = () => {
    if (userData?.currentSong === null) return;
    else {
        const currentSongIndex = getCurrentSongIndex();

        const previousSong = userData?.songs[currentSongIndex - 1];
        playSong(previousSong.id);
    }
};

const shuffle = () => {
    // random placement between a and b by 50% with lexicograph method
    userData?.songs.sort(() => Math.random() - 0.5);

    userData.currentSong = null;
    userData.songCurrentTime = 0;

    renderSongs(userData?.songs);
    pauseSong();
    setPlayerDisplay();
    setPlayButtonAccessibleText();
};

const deleteSong = id => {
    if (userData?.currentSong?.id === id) {
        userData.currentSong = null;
        userData.songCurrentTime = 0;
        pauseSong();
        setPlayerDisplay();
    }

    userData.songs = userData?.songs.filter((song) => song.id !== id);
    
    renderSongs(userData?.songs);
    highlightCurrentSong();
    setPlayButtonAccessibleText();

    // check if playlist is empty, if so, create a reset button
    if (userData?.songs.length === 0) {
        const resetButton = document.createElement('button');
        const resetText = document.createTextNode('Reset Playlist');
        resetButton.id = 'reset';
        resetButton.ariaLabel = 'Reset playlist';
        resetButton.appendChild(resetText);
        playlistSongs.appendChild(resetButton);

        resetButton.addEventListener('click', () => {
            userData.songs = [...allSongs];

            renderSongs(sortSongs());
            setPlayButtonAccessibleText();
            resetButton.remove();
        });
    }
};

const setPlayerDisplay = () => {
    const playingSong = document.getElementById('player-song-title');
    const songArtist = document.getElementById('player-song-artist');
    const currentTitle = userData?.currentSong?.title;
    const currentArtist = userData?.currentSong?.artist;

    playingSong.textContent = currentTitle ? currentTitle : '';
    songArtist.textContent = currentArtist ? currentArtist : '';
};

const highlightCurrentSong = () => {
    const playlistSongElements = document.querySelectorAll('.playlist-song');
    const songToHighlight = document.getElementById(`song-${userData?.currentSong?.id}`);

    playlistSongElements.forEach(songEl => {
        songEl.removeAttribute('aria-current');
    });

    if (songToHighlight) {
        songToHighlight.setAttribute('aria-current', 'true');
    }
}

// using function expression (arrow function) with array as its parameter
// array mapping into new variable, takes song as mapping parameter with callback function (do operation inside a single line)
// ${} is an interpolation symbol
const renderSongs = (array) => {
    const songsHTML = array.map((song) => {
        return `
        <li id="song-${song.id}" class="playlist-song">
        <button class="playlist-song-info" onclick="playSong(${song.id})">
            <span class="playlist-song-title">${song.title}</span>
            <span class="playlist-song-artist">${song.artist}</span>
            <span class="playlist-song-duration">${song.duration}</span>
        </button>
        <button onclick="deleteSong(${song.id})" class="playlist-song-delete" aria-label="Delete ${song.title}">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
        </button>
        </li>
        `;
    }).join(""); // join the mapped array side by side with empty space as separator

    // append playlist HTML using returned songsHTML
    playlistSongs.innerHTML = songsHTML;
};

// This function will set the aria-label attribute to the current song, or to the first song in the playlist. And if the playlist is empty, it sets the aria-label to "Play".
const setPlayButtonAccessibleText = () => {
    const song = userData?.currentSong || userData?.songs[0];
    playButton.setAttribute('aria-label', 
        song?.title ? `Play ${song.title}` : "Play"
    );
};

// get the index of each song
const getCurrentSongIndex = () => 
    // get and return the index for the current song
    userData?.songs.indexOf(userData?.currentSong);
;

// add the functionality to the play button so that it will play the current song when it is clicked on
// pass the empty callback func. with arrow func.
playButton.addEventListener('click', () => {
    // ensure the first song in the playlist is played first
    if (userData?.currentSong === null) {
        playSong(userData?.songs[0].id);
    } else {
        // ensures that the currently playing song will continue to play when the play button is clicked
        playSong(userData?.currentSong.id);
    }
});

// trigger pauseSong func. on pause button click
pauseButton.addEventListener('click', pauseSong);
nextButton.addEventListener('click', playNextSong);
previousButton.addEventListener('click', playPreviousSong);
shuffleButton.addEventListener('click', shuffle);

audio.addEventListener('ended', () => {
    const currentSongIndex = getCurrentSongIndex();
    const nextSongExists = userData?.songs[currentSongIndex +1] !== undefined;

    if (nextSongExists) {
        playNextSong();
    } else {
        userData.currentSong = null;
        userData.songCurrentTime = 0;
        
        pauseSong();
        setPlayerDisplay();
        highlightCurrentSong();
        setPlayButtonAccessibleText();
    }
});

// sort them before renders based on UTF-16 encoding
// sort them by the title using sort callback function
// compare titles lexicographically (characters by characters from a-b, b-c, c-d, etc.)
// return -1 means it will stays that way, just like 0 (A < B, John > Jack)
// store them in a function
const sortSongs = () => {
    userData?.songs.sort((a, b) => {
        if (a.title < b.title) { return -1; }
        if (a.title > b.title) { return 1; }
        return 0;
    });

    return userData?.songs;
};

// render listed songs in the playlist
// see the songs in alphabetical order
renderSongs(sortSongs());
setPlayButtonAccessibleText();