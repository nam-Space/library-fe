import useGetBooks from "hooks/useGetBooks";
import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();
    const { loading, books, getAllBooks } = useGetBooks();

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
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Thư Viện Trực Tuyến</h2>

            <div className="row">
                {books.map((book) => (
                    <div className="col-md-4 mb-4" key={book.id}>
                        <div className="card h-100">
                            <img
                                src={book.image}
                                className="card-img-top"
                                alt={book.title}
                                style={{ height: "250px", objectFit: "cover" }}
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
                                    className="btn btn-primary"
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

export default HomePage;
