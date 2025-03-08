import React, { useState } from 'react';

function MinePlacesAutocomplete({ onSelect }) { // Add onSelect prop
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState('');


  
  const fetchPlaces = async (e) => {
    const query = e.target.value;
    setQuery(query);

    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    const locationiqKey = import.meta.env.VITE_MINE_GEOCOMLPETE;
    const url = `https://api.locationiq.com/v1/autocomplete?key=${locationiqKey}&q=${query}&format=json&limit=5`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const suggestions = data.map(item => ({
        value: item.display_name,
        data: item
      }));
      setSuggestions(suggestions);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  const handleSelect = (suggestion) => {
    setQuery(suggestion.value);
    setSuggestions([]);
    
    // Send the selected value to the parent
    onSelect(suggestion.value); 
  };

  return (
    <>
      <input
        type="text"
        placeholder="Enter a location"
        className="border border-gray-300 p-2 w-full rounded-md border border-input"
        value={query}
        onChange={fetchPlaces}
      />
      {suggestions.length > 0 && (
        <div className="autocomplete-suggestions border border-gray-300 mt-2 rounded-md shadow-lg bg-white">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="autocomplete-suggestion p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(suggestion)}
            >
              <div className="autocomplete-suggestion-name">
                {suggestion.value}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default MinePlacesAutocomplete;