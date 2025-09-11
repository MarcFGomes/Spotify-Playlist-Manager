import React from 'react';
import './Track.css'


function Track({ songg, fromSearchResults, onToggle}) {

    return(
    <div className='displaySongs'>
        <div className='info'>
            <h1>{songg.name}</h1>
            <h2>{songg.artist} | {songg.album}</h2>
            {songg.preview ? (
            <audio controls src={songg.preview}>
            Your browser does not support the audio element.
            </audio>
            ) : (
            <p className="no-preview">No preview available</p>
            )}
        </div>
        <div className='addSong'>
            <a href="#" onClick={(e) => { e.preventDefault(); onToggle(); }}>
                <h1>{fromSearchResults ? '+' : '-'}</h1>
            </a>
        </div>
    </div>
    )
}

export default Track