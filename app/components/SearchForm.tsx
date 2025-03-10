'use client';

import React, { FormEvent, useState } from 'react';

function SearchForm() {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSubmit = function (e: FormEvent) {
    e.preventDefault();
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
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
