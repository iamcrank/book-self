import React, { useState, useEffect } from 'react';

function BookSearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [bookshelf, setBookshelf] = useState(
    JSON.parse(localStorage.getItem('bookshelf')) || []
  );

  useEffect(() => {
    fetchData();
  }, [query]);

  const fetchData = async () => {
    if (query) {
      try {
        const response = await fetch(`/search.json?q=${query.toLowerCase()}&limit=10&page=1`);
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }
        const searchData = await response.json();
        setResults(searchData.docs);
      } catch (error) {
        console.error('Error searching:', error);
      }
    } else {
      setResults([]);
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  const addToBookshelf = (book) => {
    const newBookshelf = [...bookshelf, book];
    setBookshelf(newBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(newBookshelf));
    window.alert(`${book.title} has been added to your bookshelf!`);
  };

  return (
    <div className="p-4">
       <h1 className="text-3vw flex-grow">Book Search</h1>
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books..."
          className="p-2 border rounded w-full"
        />
        <button 
          onClick={handleSearch} 
          className="bg-[#FFC100] text-white px-4 py-2 rounded text-3vw"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {results.map((book) => (
          <div key={book.key} className="border p-4 rounded shadow">
            <h2 className="text-xl font-medium">{book.title}</h2>
            <p>Author: {book.author_name?.join(', ')}</p>
            <p>Language: {book.language?.[0]}</p>
            <p>First Publish Year: {book.first_publish_year}</p>
            <p>Publisher: {book.publisher?.[0]}</p>
            <p>Type:{book.type}</p>
            <p>Subject: {book.subject?.[0]}</p>
            <button 
              onClick={() => addToBookshelf(book)} 
              className="bg-[#FDDE55] text-white px-2 py-1 rounded mt-2 hover:bg-[#FF6500]"
            >
              add to bookshelf
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookSearchPage;
