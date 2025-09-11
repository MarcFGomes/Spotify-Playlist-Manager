
// TrackSavedPlaylist.jsx
import React from "react";  
import './TrackSavedPlaylist.css'

function TrackSavedPlaylist({playlist, onClick}) {
return(
    <section className="track-saved-playlist">
        <div className="displaySavedPlaylists">
            <h1>{playlist.name}</h1>
        </div>
         <div className='deletePlaylist'>
            <a href="#" onClick={(e) => { e.preventDefault(); onClick(); }}>
                <h1>-</h1>
            </a>
        </div>
    </section>
)
}



export default TrackSavedPlaylist;