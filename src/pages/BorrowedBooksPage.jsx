import {
    callDeleteBorrowBook,
    callUpdateBorrowBook,
    callAddBorrowBook,
} from "config/api";
import useGetBooks from "hooks/useGetBooks";
import useGetBorrowBooks from "hooks/useGetBorrowBooks";
import React, { useContext, useState } from "react";
import { UserContext } from "utils/UserContext";

const BorrowBook = () => {
    const { user } = useContext(UserContext);
    const { loading: loadingBooks, books, getAllBooks } = useGetBooks();
    const {
        loading: loadingBorrow,
        borrowBooks,
        getAllBorrowBooks,
    } = useGetBorrowBooks(`user_id=${user?.id}&returned=false`);

    const [form, setForm] = useState({
        id: 0,
        book_id: 0,
        quantity: 0,
        isEdit: false,
    });

    const [submitting, setSubmitting] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (form.isEdit) {
            await callUpdateBorrowBook(form.id, {
                user_id: user?.id,
                book_id: form.book_id,
                quantity: form.quantity,
            });
        } else {
            await callAddBorrowBook({
                user_id: user?.id,
                book_id: form.book_id,
                quantity: form.quantity,
            });
        }

        await getAllBorrowBooks(`user_id=${user?.id}&returned=false`);
        setForm({ id: 0, book_id: 0, quantity: 0, isEdit: false });
        setSubmitting(false);
    };

    const handleDeleteBorrowBook = async (id) => {
        setDeletingId(id); // bắt đầu loading
        await callDeleteBorrowBook(id);
        await getAllBorrowBooks(`user_id=${user?.id}&returned=false`);
        setDeletingId(null); // kết thúc loading
        setForm({ id: 0, book_id: 0, quantity: 0, isEdit: false });
    };

    // 👉 Hiển thị spinner khi đang loading
    if (loadingBooks || loadingBorrow) {
        return (
            <div className="container mt-5 text-center">
                <div
                    className="spinner-border text-primary"
                    role="status"
                    style={{ width: "4rem", height: "4rem" }}
                >
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Đang tải dữ liệu, vui lòng đợi...</p>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h3 className="mb-4 text-center">📚 Mượn Sách</h3>

            {/* Form mượn sách */}
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Chọn sách</label>
                        <select
                            className="form-select"
                            value={form.book_id}
                            onChange={(e) =>
                                setForm({ ...form, book_id: e.target.value })
                            }
                            required
                        >
                            <option value="">-- Chọn sách --</option>
                            {books.map((book) => (
                                <option key={book.id} value={book.id}>
                                    {book.title} - {book.author} - {book.price}{" "}
                                    VNĐ
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
                            value={form.quantity}
                            onChange={(e) =>
                                setForm({ ...form, quantity: e.target.value })
                            }
                            required
                        />
                    </div>
                </div>

                <div className="text-center">
                    <button
                        className={`btn ${
                            form.isEdit ? "btn-primary" : "btn-success"
                        }`}
                        type="submit"
                        disabled={submitting}
                    >
                        {submitting ? (
                            <>
                                <span
                                    className="spinner-border spinner-border-sm me-2"
                                    role="status"
                                />
                                Đang xử lý...
                            </>
                        ) : form.isEdit ? (
                            "Lưu"
                        ) : (
                            "Mượn Sách"
                        )}
                    </button>
                </div>
            </form>

            {/* Danh sách đã mượn */}
            <hr className="my-4" />
            <h5 className="mb-3">📋 Danh sách mượn</h5>

            <table className="table table-striped">
                <thead className="table-light">
                    <tr>
                        <th>ID</th>
                        <th>Người mượn</th>
                        <th>Ảnh</th>
                        <th>Tên sách</th>
                        <th>Số lượng</th>
                        <th>Đơn giá</th>
                        <th>Tổng tiền</th>
                        <th>Tiền phạt</th>
                        <th>Thành tiền</th>
                        <th>Ngày mượn</th>
                        <th>Hạn chót</th>
                        <th>Ghi chú</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {borrowBooks.map((borrowBook, index) => (
                        <tr key={index}>
                            <td>{borrowBook.id}</td>
                            <td>{borrowBook.username}</td>
                            <td>
                                <img
                                    src={borrowBook.img_url}
                                    style={{ objectFit: "cover" }}
                                    width={100}
                                    height={100}
                                    alt="book-img"
                                />
                            </td>
                            <td>{borrowBook.book_title}</td>
                            <td>{borrowBook.quantity}</td>
                            <td>{Math.round(borrowBook.price)} VNĐ</td>
                            <td>
                                {borrowBook.quantity *
                                    Math.round(borrowBook.price)}{" "}
                                VNĐ
                            </td>
                            <td>{Math.round(borrowBook.punish)} VNĐ</td>
                            <td>
                                {borrowBook.quantity *
                                    Math.round(borrowBook.price) +
                                    Math.round(borrowBook.punish)}{" "}
                                VNĐ
                            </td>
                            <td>{borrowBook.borrowed_date}</td>
                            <td>{borrowBook.due_date}</td>
                            <td>{borrowBook.note}</td>
                            <td>
                                {borrowBook.status === "pending" && (
                                    <p className="text-success fw-bold">
                                        Còn hạn
                                    </p>
                                )}
                                {borrowBook.status === "overdue" && (
                                    <p className="text-danger fw-bold">
                                        Quá hạn
                                    </p>
                                )}
                            </td>
                            <td>
                                <div className="d-flex gap-2">
                                    <button
                                        className="btn btn-warning"
                                        onClick={() =>
                                            setForm({
                                                id: borrowBook.id,
                                                book_id: borrowBook.book_id,
                                                quantity: borrowBook.quantity,
                                                isEdit: true,
                                            })
                                        }
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                            handleDeleteBorrowBook(
                                                borrowBook.id
                                            )
                                        }
                                        disabled={deletingId === borrowBook.id}
                                    >
                                        {deletingId === borrowBook.id ? (
                                            <>
                                                <span
                                                    className="spinner-border spinner-border-sm me-2"
                                                    role="status"
                                                    aria-hidden="true"
                                                ></span>
                                                Đang xoá...
                                            </>
                                        ) : (
                                            "Xoá"
                                        )}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BorrowBook;
