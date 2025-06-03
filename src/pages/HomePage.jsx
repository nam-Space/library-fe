import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    // Danh sách sách giả định (dữ liệu cứng để hiển thị giao diện)
    const books = [
        {
            id: 1,
            title: "Lập Trình Python Cơ Bản",
            author: "Nguyễn Văn A",
            image: "https://down-vn.img.susercontent.com/file/dd0a7f2645100f64b802968777d14e9f",
        },
        {
            id: 2,
            title: "Học Máy và Trí Tuệ Nhân Tạo",
            author: "Trần Thị B",
            image: "https://cantholib.org.vn/uploads/news/gts/thang04/tri-tue-nhan-tao.jpg",
        },
        {
            id: 3,
            title: "Cấu Trúc Dữ Liệu và Giải Thuật",
            author: "Lê Văn C",
            image: "https://images.vnuhcmpress.edu.vn/Picture/2023/5/16/image-20230516140731083.jpg",
        },
    ];

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
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate("/books/1")}
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
