import React, {useState} from 'react';
import './Tracklist.css'
import Track from './Track'


function Tracklist({songs, onSavePlaylist, onRemoveSong, playlistName,onChangeName, access}) {


    return(
        
        <div className='headerResults'>
            
            <input type="text" value={playlistName} onChange={(e) => onChangeName(e.target.value)} className="playlistNameInput"/>

            <div className='listOfTracks'>
                 {songs.map((song) => (<Track key={song.id} songg={song} onToggle={() => onRemoveSong(song)}/>))}
            </div>
           
            <div className="add">
                <button onClick={onSavePlaylist}>SAVE TO SPOTIFY</button>
            </div>
        </div>
        
    )
}


export default Tracklist