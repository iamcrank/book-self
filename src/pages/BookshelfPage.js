import React, { useState } from 'react';

function BookshelfPage() {
  const [bookshelf, setBookshelf] = useState(
    JSON.parse(localStorage.getItem('bookshelf')) || []
  );

  const removeFromBookshelf = (bookToRemove) => {
    const updatedBookshelf = bookshelf.filter(book => book.key !== bookToRemove.key);
  
    if (updatedBookshelf.length === 0) {
      setBookshelf([]); 
      localStorage.removeItem('bookshelf'); 
    } else {
      setBookshelf(updatedBookshelf); 
      localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf)); 
    }
  };
  

  return (
    <div className="p-4">
      <h1 className="text-3vw mb-4">My Bookshelf</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {bookshelf.map((book) => (
          <div key={book.key} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{book.title}</h2>
            <p><strong>Author:</strong> {book.author_name?.join(', ')}</p>
            <p><strong>Language:</strong> {book.language?.[0]}</p>
            <p><strong>First Publish Year:</strong> {book.first_publish_year}</p>
            <p><strong>Publisher:</strong> {book.publisher?.[0]}</p>
            <p><strong>Type:</strong> {book.type}</p>
            <p><strong>Subject:</strong> {book.subject?.[0]}</p>
            <button 
              onClick={() => removeFromBookshelf(book)} 
              className="bg-red-500 text-white px-4 py-2 rounded mt-2 hover:bg-[#FFC100]"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookshelfPage;
