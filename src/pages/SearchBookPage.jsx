import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchBook = () => {
    const navigate = useNavigate();

    const allBooks = [
        {
            id: 1,
            title: "Lập Trình Python Cơ Bản",
            author: "Nguyễn Văn A",
            image: "https://down-vn.img.susercontent.com/file/dd0a7f2645100f64b802968777d14e9f",
        },
        {
            id: 2,
            title: "Trí Tuệ Nhân Tạo",
            author: "Trần Thị B",
            image: "https://cantholib.org.vn/uploads/news/gts/thang04/tri-tue-nhan-tao.jpg",
        },
        {
            id: 3,
            title: "Cơ Sở Dữ Liệu",
            author: "Lê Văn C",
            image: "https://images.vnuhcmpress.edu.vn/Picture/2023/5/16/image-20230516140731083.jpg",
        },
        {
            id: 4,
            title: "Nhập Môn Machine Learning",
            author: "Phạm Văn D",
            image: "https://salt.tikicdn.com/cache/w1200/ts/product/01/68/a3/c2ffdea4d314b4fdda4f30fde43785fc.jpg",
        },
    ];

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredBooks, setFilteredBooks] = useState(allBooks);

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredBooks(allBooks);
        } else {
            const keyword = searchTerm.toLowerCase();
            const results = allBooks.filter(
                (book) =>
                    book.title.toLowerCase().includes(keyword) ||
                    book.author.toLowerCase().includes(keyword)
            );
            setFilteredBooks(results);
        }
    }, [searchTerm]);

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

            {filteredBooks.length > 0 ? (
                <div className="row">
                    {filteredBooks.map((book) => (
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
                                    <button
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() => navigate("/books/1")}
                                    >
                                        Xem chi tiết
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="alert alert-warning text-center">
                    Không tìm thấy kết quả phù hợp.
                </div>
            )}
        </div>
    );
};

export default SearchBook;
