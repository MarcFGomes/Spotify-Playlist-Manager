// SavedPlaylists.jsx
import React from 'react';
import './SavedPlaylists.css'
import Track from './Track';
import TrackSavedPlaylist from './TrackSavedPlaylist';



function SavedPlaylists({SavedPlaylists, onRemovePlaylist}) {

    return(
    <div className='savedPlaylists'>
        <h1>Saved Playlists</h1>
        <div className='playlistResults'>
           {SavedPlaylists.map((playlists, index) =>
           <TrackSavedPlaylist playlist={playlists} key={index} onClick={() => onRemovePlaylist(playlists)}/>)}
        </div>
    </div>
    )
}

export default SavedPlaylists