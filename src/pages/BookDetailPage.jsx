import React, { useState } from "react";
import { useParams } from "react-router-dom";

const BookDetailPage = () => {
    const { id } = useParams(); // lấy id sách từ URL

    const book = {
        id,
        title: "Lập Trình Python Cơ Bản",
        author: "Nguyễn Văn A",
        description:
            "Cuốn sách cung cấp kiến thức nền tảng về lập trình Python cho người mới bắt đầu, với ví dụ minh họa dễ hiểu và ứng dụng thực tiễn.",
        published_year: 2022,
        quantity: 5,
        image: "https://images.vnuhcmpress.edu.vn/Picture/2023/5/16/image-20230516140731083.jpg",
    };

    const [borrowQuantity, setBorrowQuantity] = useState(1);

    const handleIncrease = () => {
        if (borrowQuantity < book.quantity) {
            setBorrowQuantity(borrowQuantity + 1);
        }
    };

    const handleDecrease = () => {
        if (borrowQuantity > 1) {
            setBorrowQuantity(borrowQuantity - 1);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {/* Hình ảnh */}
                <div className="col-md-5">
                    <img
                        src={book.image}
                        alt={book.title}
                        className="img-fluid rounded shadow"
                    />
                </div>

                {/* Thông tin chi tiết */}
                <div className="col-md-7">
                    <h3>{book.title}</h3>
                    <p>
                        <strong>Tác giả:</strong> {book.author}
                    </p>
                    <p>
                        <strong>Năm xuất bản:</strong> {book.published_year}
                    </p>
                    <p>
                        <strong>Số lượng còn:</strong> {book.quantity}
                    </p>
                    <p>
                        <strong>Mô tả:</strong>
                        <br /> {book.description}
                    </p>

                    <div className="mt-4">
                        <label className="form-label me-3">
                            <strong>Số lượng mượn:</strong>
                        </label>
                        <div
                            className="input-group mb-3"
                            style={{ width: "150px" }}
                        >
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={handleDecrease}
                            >
                                -
                            </button>
                            <input
                                type="text"
                                className="form-control text-center"
                                value={borrowQuantity}
                                readOnly
                            />
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={handleIncrease}
                            >
                                +
                            </button>
                        </div>

                        <button className="btn btn-success me-2">
                            📚 Mượn sách
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetailPage;
