'use client';

import React, { FormEvent, useState } from 'react';
import { fetchForecast } from '../Store/slices/forecastSlice';
import { useAppDispatch } from '../Store/hook';

function SearchForm() {
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useAppDispatch();

  const handleSubmit = function (e: FormEvent) {
    e.preventDefault();
    if (searchTerm.trim() === '') {
      // TODO More Professional Alert
      alert('Please enter a city to search!');
    } else {
      dispatch(fetchForecast(searchTerm));
      setSearchTerm('');
    }
  };
  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="search"> Search: </label>
      <input
        type="text"
        id="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a City"
        required
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
