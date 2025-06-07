
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
import StatsBorrowedBooksPage from 'pages/StatsBorrowedBooksPage';
import StatsReturnBookPage from 'pages/StatsReturnBookPage';

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
        <Route path="/stats-borrowed" element={<StatsBorrowedBooksPage />} />
        <Route path="/return-book" element={<ReturnBookPage />} />
        <Route path="/stats-return-book" element={<StatsReturnBookPage />} />
      </Routes>
    </>
  );
}

export default App;
