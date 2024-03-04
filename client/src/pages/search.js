import React, { useState } from "react";
import './Search.css';

const Search = () => {
    const [searchInput, setSearchInput] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for: ', searchInput);
        // Add API logic
    };

    return (
        <div className="search-containder">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Enter a location"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="search-input"
                />
                <button type="submit" className="search-button">Search</button>
            </form>
        </div>
    );
};

export default Search;
