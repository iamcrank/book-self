import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookSearchPage from './pages/BookSearchPage';
import BookshelfPage from './pages/BookshelfPage';

function App() {
  return (
    <Router>
      <nav className='flex justify-between items-center px-10 py-5'>
      <h1 className='text-2xl font-semibold text-[#FFC100]'>Book.com</h1>
        <div>
        <Link to="/" className='px-3 py-2  hover:text-[#FFC100] '>Search Books</Link>
        <Link to="/bookshelf" className='px-3 py-2 hover:text-[#FFC100] '>My Bookshelf</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<BookSearchPage />} />
        <Route path="/bookshelf" element={<BookshelfPage />} />
      </Routes>
    </Router>
  );
}

export default App;
