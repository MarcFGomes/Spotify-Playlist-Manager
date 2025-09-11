import React, {useState} from 'react';
import './SearchbarResults.css'
import Track from './Track'


function SearchbarResults({songsProps, onAddSong}) {


    return(
        
        <div className='headerResults'>
            
            <h1>Results</h1>

            <div className='songResults'>
                    {songsProps.map((song, index) => 
                    <Track songg={song} key={index} fromSearchResults={true} onToggle={() => onAddSong(song)}/>)}
            </div>
           
            
        </div>
        
    )
}


export default SearchbarResults