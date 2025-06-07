import useGetBooks from "hooks/useGetBooks";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchBook = () => {
    const navigate = useNavigate();
    const { loading, books, getAllBooks } = useGetBooks();

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setTimeout(() => {
                getAllBooks();
            }, 200);
        } else {
            const keyword = searchTerm.toLowerCase();
            setTimeout(() => {
                getAllBooks(`keyword=${keyword}`);
            }, 200);
        }
    }, [searchTerm]);

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div
                    className="spinner-border text-primary"
                    role="status"
                    style={{ width: "4rem", height: "4rem" }}
                >
                    <span className="visually-hidden">Đang tải...</span>
                </div>
                <p className="mt-3">Đang tải dữ liệu, vui lòng đợi...</p>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h3 className="mb-4 text-center">🔍 Tìm Kiếm Sách</h3>

            <div className="row mb-4 justify-content-center">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập tên sách hoặc tác giả..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="row">
                {books.map((book) => (
                    <div className="col-md-4 mb-4" key={book.id}>
                        <div className="card h-100">
                            <img
                                src={book.image}
                                className="card-img-top"
                                alt={book.title}
                                style={{
                                    height: "200px",
                                    objectFit: "cover",
                                }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{book.title}</h5>
                                <p className="card-text">
                                    Tác giả: {book.author}
                                </p>
                                <p className="card-text">
                                    <strong>Đơn giá:</strong>{" "}
                                    <strong className="text-success">
                                        {Math.round(book.price)} VNĐ
                                    </strong>
                                </p>
                                <button
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={() =>
                                        navigate(`/books/${book.id}`)
                                    }
                                >
                                    Xem chi tiết
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchBook;
