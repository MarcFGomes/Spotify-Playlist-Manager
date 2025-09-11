
// SearchBar.jsx
import React, {useState} from 'react';
import './Searchbar.css'



function Searchbar({ onSearch }) {

    const [searchSong, setSearchSong] = useState('');

    const handleChange = ({ target }) => {
    const {name, value}= target;
  
    if (name==="searchSong") {
    setSearchSong(value);}
    }
    



    const updateSearch = (event)=> {
    event.preventDefault();
    console.log(`Searching with Spotify`);
    onSearch(searchSong)
    };

    return (
    <form onSubmit={updateSearch}>
    <div className='input1'>
        <input name="searchSong" value={searchSong} onChange={handleChange} placeholder="Enter A Song Title"/>
    </div>
    
        
    <div className="SearchBar-submit">
        <button >SEARCH</button>
    </div>
    </form>
    )
}


export default Searchbar;
