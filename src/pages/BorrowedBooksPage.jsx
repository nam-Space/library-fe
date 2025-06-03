import React, { useState } from "react";

const BorrowBook = () => {
    // Danh sách sách giả định (để chọn mượn)
    const availableBooks = [
        { id: "B001", title: "Lập Trình Python Cơ Bản" },
        { id: "B002", title: "Trí Tuệ Nhân Tạo Nhập Môn" },
        { id: "B003", title: "Cơ Sở Dữ Liệu" },
    ];

    const [selectedBookId, setSelectedBookId] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [borrowedList, setBorrowedList] = useState([]);

    const handleBorrow = (e) => {
        e.preventDefault();

        if (!selectedBookId || quantity <= 0) {
            alert("Vui lòng nhập đầy đủ thông tin mượn sách.");
            return;
        }

        const selectedBook = availableBooks.find(
            (b) => b.id === selectedBookId
        );

        const newEntry = {
            id: Date.now(),
            bookTitle: selectedBook.title,
            quantity,
            borrowedDate: new Date().toISOString().split("T")[0],
        };

        setBorrowedList([newEntry, ...borrowedList]);
        setQuantity(1);
        setSelectedBookId("");
    };

    return (
        <div className="container mt-5">
            <h3 className="mb-4 text-center">📚 Mượn Sách</h3>

            {/* Form mượn sách */}
            <form onSubmit={handleBorrow}>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Chọn sách</label>
                        <select
                            className="form-select"
                            value={selectedBookId}
                            onChange={(e) => setSelectedBookId(e.target.value)}
                            required
                        >
                            <option value="">-- Chọn sách --</option>
                            {availableBooks.map((book) => (
                                <option key={book.id} value={book.id}>
                                    {book.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Số lượng</label>
                        <input
                            type="number"
                            className="form-control"
                            min={1}
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(parseInt(e.target.value))
                            }
                            required
                        />
                    </div>
                </div>

                <div className="text-center">
                    <button className="btn btn-primary" type="submit">
                        ✅ Mượn sách
                    </button>
                </div>
            </form>

            {/* Danh sách đã mượn */}
            <hr className="my-4" />
            <h5 className="mb-3">📋 Danh sách mượn</h5>

            {borrowedList.length === 0 ? (
                <div className="alert alert-warning">
                    Chưa có sách nào được mượn.
                </div>
            ) : (
                <table className="table table-striped">
                    <thead className="table-light">
                        <tr>
                            <th>#</th>
                            <th>Người mượn</th>
                            <th>Tên sách</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                            <th>Ngày mượn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {borrowedList.map((entry, index) => (
                            <tr key={entry.id}>
                                <td>{index + 1}</td>
                                <td>{entry.borrower}</td>
                                <td>{entry.bookTitle}</td>
                                <td>{entry.quantity}</td>
                                <td>{entry.quantity * 20000}</td>
                                <td>{entry.borrowedDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default BorrowBook;
