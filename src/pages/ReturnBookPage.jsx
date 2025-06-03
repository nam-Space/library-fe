import React, { useState } from "react";

const ReturnBookPage = () => {
    // Dữ liệu sách đã mượn (giả lập)
    const initialBooks = [
        {
            id: 1,
            title: "Hệ Cơ Sở Dữ Liệu",
            author: "Nguyễn Văn A",
            borrowed_date: "2025-05-10",
            due_date: "2025-06-01",
            total_quantity: 10,
            price: 10000,
        },
        {
            id: 2,
            title: "Nhập Môn Trí Tuệ Nhân Tạo 1",
            author: "Trần Thị B",
            borrowed_date: "2025-05-20",
            due_date: "2025-06-10",
            total_quantity: 10,
            price: 20000,
        },
        {
            id: 3,
            title: "Nhập Môn Trí Tuệ Nhân Tạo 2",
            author: "Trần Thị B",
            borrowed_date: "2025-05-20",
            due_date: "2025-06-10",
            total_quantity: 10,
            price: 20000,
        },
        {
            id: 4,
            title: "Nhập Môn Trí Tuệ Nhân Tạo 3",
            author: "Trần Thị B",
            borrowed_date: "2025-05-20",
            due_date: "2025-06-10",
            total_quantity: 10,
            price: 20000,
        },
        {
            id: 5,
            title: "Nhập Môn Trí Tuệ Nhân Tạo 4",
            author: "Trần Thị B",
            borrowed_date: "2025-05-20",
            due_date: "2025-06-10",
            total_quantity: 10,
            price: 20000,
        },
    ];

    const [books, setBooks] = useState(initialBooks); // Chưa trả
    const [returnedBooks, setReturnedBooks] = useState([]); // Đã trả
    const [successMsg, setSuccessMsg] = useState("");

    const handleReturn = (bookId) => {
        const returnedBook = books.find((b) => b.id === bookId);
        setBooks(books.filter((b) => b.id !== bookId));
        setReturnedBooks([returnedBook, ...returnedBooks]);
        setSuccessMsg(`✅ Đã trả sách: "${returnedBook.title}"`);
    };

    return (
        <div className="container mt-5">
            <h3 className="mb-4 text-center">↩️ Danh sách sách đã mượn</h3>

            {successMsg && (
                <div className="alert alert-success text-center">
                    {successMsg}
                </div>
            )}

            {books.length === 0 ? (
                <div className="alert alert-info text-center">
                    Bạn không còn sách nào cần trả.
                </div>
            ) : (
                <table className="table table-bordered mb-5">
                    <thead className="table-light">
                        <tr>
                            <th>#</th>
                            <th>Tên sách</th>
                            <th>Tác giả</th>
                            <th>Ngày mượn</th>
                            <th>Hạn trả</th>
                            <th>Số lượng</th>
                            <th>Đơn giá</th>
                            <th>Tổng tiền</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book, idx) => (
                            <tr key={book.id}>
                                <td>{idx + 1}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.borrowed_date}</td>
                                <td>{book.due_date}</td>
                                <td>{book.total_quantity}</td>
                                <td>{book.price}</td>
                                <td>{book.price * book.total_quantity}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleReturn(book.id)}
                                    >
                                        Trả nốt
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Danh sách sách đã trả */}
            <h4 className="mb-3">📘 Danh sách sách đã trả</h4>
            {returnedBooks.length === 0 ? (
                <div className="alert alert-secondary">
                    Chưa có sách nào được trả.
                </div>
            ) : (
                <table className="table table-striped">
                    <thead className="table-light">
                        <tr>
                            <th>#</th>
                            <th>Tên sách</th>
                            <th>Tác giả</th>
                            <th>Ngày mượn</th>
                            <th>Hạn trả</th>
                            <th>Số lượng</th>
                            <th>Đơn giá</th>
                            <th>Tổng tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {returnedBooks.map((book, idx) => (
                            <tr key={book.id}>
                                <td>{idx + 1}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.borrowed_date}</td>
                                <td>{book.due_date}</td>
                                <td>{book.total_quantity}</td>
                                <td>{book.price}</td>
                                <td>{book.price * book.total_quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ReturnBookPage;
