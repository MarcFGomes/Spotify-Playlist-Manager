import React, { useState } from 'react'
import './App.css'
import Searchbar from './components/Searchbar';
import SearchbarResults from './components/SearchbarResults';
import Tracklist from './components/Tracklist';
import searchTracks from './utils/spotifyApi';
import SavedPlaylists from './components/SavedPlaylists';
import TrackSavedPlaylist from './components/TrackSavedPlaylist';
import SavingScreen from './components/SavingScreen';



/*const songs = [{
  id :1,
  name: 'Tiny Dancer',
  artist: 'Elton John',
  album: 'Madman across the water'
},{
name: 'Tiny Dancer',
artist: 'Tim McGraw',
album: 'Love Story'
}, {
id:2,
name :'Tiny Dancer',
artist: 'Rockabye Baby!',
album: 'Lullaby Renditions of Elton John'
}, {
id:3,
song: 'Tiny Dancer',
artist: 'The White Raven',
album: 'Tiny Dancer'
}, {
id: 4,
name: 'Tiny Dancer - Live Album Version',
artist: 'Ben Folds',
album: 'Ben Folds Live'
}, {
id: 4,
name: 'Tiny Dancer - Live Album Version',
artist: 'Ben Folds',
album: 'Ben Folds Live'
}, {
id: 4,
name: 'Tiny Dancer - Live Album Version',
artist: 'Ben Folds',
album: 'Ben Folds Live'
}, {
id: 4,
name: 'Tiny Dancer - Live Album Version',
artist: 'Ben Folds',
album: 'Ben Folds Live'
}, {
id: 4,
name: 'Tiny Dancer - Live Album Version',
artist: 'Ben Folds',
album: 'Ben Folds Live'
}
]*/

function App() {

  const [playlist, setPlaylist] = useState([]);
  const [searchSong, setSearchSong] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [savPlaylist, setSavPlaylist] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
const [saveProgress, setSaveProgress] = useState(0);
 

 const addSong = (song) => {
  setPlaylist((prev) => {
    // check if song already exists in playlist
    if (prev.find((s) => s.id === song.id)) {
      return prev; // return unchanged playlist
    }
    return [...prev, song];
  });
};

  const removeSong = (song) => {
    setPlaylist((prev) => prev.filter((s) => s.id !== song.id));
  };

  const updatePlaylistName = (name) => {
  setPlaylistName(name);
};

  //save a playlist
  const wrapSavePlaylist = () => {
  setIsSaving(true);
  setSaveProgress(0);

  const duration = 3000; // 3 seconds
  const intervalTime = 50; // update every 50ms
  const increment = (intervalTime / duration) * 100; // percentage per interval

  const interval = setInterval(() => {
    setSaveProgress(prev => {
      const next = prev + increment;
      if (next >= 100) {
        clearInterval(interval);

        // Actually save playlist when done
        setSavPlaylist(prev => {
          if (prev.find(s => s.name === playlistName)) return prev;
          return [...prev, { name: playlistName }];
        });

        setIsSaving(false);
        return 100;
      }
      return next;
    });
  }, intervalTime);
  };
  
  //delete a playlist
  const removePlaylist = (playlst) => {
    setSavPlaylist((prev) => prev.filter((s) => s.name !== playlst.name));
  };


  // Search for songs using Spotify API
  const searchForSong = async (query) => {
      const results = await searchTracks(query); // no accessToken needed
      console.log('Spotify search results:', results);
      setSearchSong(results);

  };

    // Filter search results to exclude songs already in playlist
  const filteredSearchResults = searchSong.filter(
    (song) => !playlist.some((s) => s.id === song.id)
  );


  return (
    <>
      {/* Saving screen overlay */}
      {isSaving && <SavingScreen progress={saveProgress} />}

      <div className='header'>
        <h1>spotify <span className='title'>playlist</span> manager</h1>
      </div>
      
      <div className='body'>
        <img className="headerImg" src="./public/background_photo_desktop.jpg" alt="Background"/>
        <div className='overlay'>
          <div className='searchBarWrapper'>
            <Searchbar onSearch={searchForSong}/>
          </div>
          <div className="listsDisplays">
            <div className="results">
              <SearchbarResults songsProps={filteredSearchResults} onAddSong={addSong}/>
            </div>
            <div className="playlist">
              <Tracklist songs={playlist}  onSavePlaylist={wrapSavePlaylist} playlistName={playlistName} onRemoveSong={removeSong} onChangeName={updatePlaylistName}/>
            </div>
          </div>
          <section className='playlistFeature'>
            <div className='createdPlaylists'>
              <SavedPlaylists SavedPlaylists={savPlaylist} onRemovePlaylist={removePlaylist}/>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default App
