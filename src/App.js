
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import HomePage from 'pages/HomePage';
import Navbar from 'components/Navbar';
import BookDetailPage from 'pages/BookDetailPage';
import BorrowedBooksPage from 'pages/BorrowedBooksPage';
import ReturnBookPage from 'pages/ReturnBookPage';
import SearchBookPage from 'pages/SearchBookPage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/books" element={<SearchBookPage />} />
        <Route path="/books/:id" element={<BookDetailPage />} />
        <Route path="/borrowed" element={<BorrowedBooksPage />} />
        <Route path="/return-book" element={<ReturnBookPage />} />
      </Routes>
    </>
  );
}

export default App;
