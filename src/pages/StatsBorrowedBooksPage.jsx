import { callAddBorrowBook } from "config/api";
import { callUpdateBorrowBook } from "config/api";
import { ROLE } from "constants/role";
import { STATUS } from "constants/status";
import useGetAllBorrowBooks from "hooks/useGetAllBorrowBooks";
import useGetBooks from "hooks/useGetBooks";
import useGetBorrowBooks from "hooks/useGetBorrowBooks";
import useGetUsers from "hooks/useGetUsers";
import React, { useContext, useState } from "react";
import { UserContext } from "utils/UserContext";
import DatePicker from "react-datepicker";
import { callDeleteBorrowBook } from "config/api";
import { STATUS_BORROW } from "constants/status";

const StatsBorrowedBooksPage = () => {
    const { loading: loadingBooks, books, getAllBooks } = useGetBooks();
    const {
        loading: loadingBorrow,
        borrowBooks,
        getAllBorrowBooks,
    } = useGetAllBorrowBooks();

    const { loading, users, getAllUsers } = useGetUsers(
        `role=${ROLE.CUSTOMER}`
    );

    const [form, setForm] = useState({
        id: 0,
        user_id: 0,
        book_id: 0,
        quantity: 0,
        status: "",
        punish: 0,
        note: "",
        due_date: null,
        isEdit: false,
    });

    const [submitting, setSubmitting] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (form.isEdit) {
            await callUpdateBorrowBook(form.id, {
                user_id: form.user_id,
                book_id: form.book_id,
                quantity: form.quantity,
                status: form.status,
                punish: form.punish,
                note: form.note,
                due_date: new Date(form.due_date).toISOString().split("T")[0],
            });
        } else {
            await callAddBorrowBook({
                user_id: form.user_id,
                book_id: form.book_id,
                quantity: form.quantity,
                due_date: new Date(form.due_date).toISOString().split("T")[0],
            });
        }

        await getAllBorrowBooks();
        setForm({
            id: 0,
            user_id: 0,
            book_id: 0,
            quantity: 0,
            status: "",
            punish: 0,
            note: "",
            due_date: null,
            isEdit: false,
        });
        setSubmitting(false);
    };

    // 👉 Hiển thị spinner khi đang loading
    if (loadingBorrow) {
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

    const handleDeleteBorrowBook = async (id) => {
        setDeletingId(id); // bắt đầu loading
        await callDeleteBorrowBook(id);
        await getAllBorrowBooks();
        setDeletingId(null); // kết thúc loading
        setForm({
            id: 0,
            user_id: 0,
            book_id: 0,
            quantity: 0,
            status: "",
            punish: 0,
            note: "",
            due_date: null,
            isEdit: false,
        });
    };

    return (
        <div className="container mt-5">
            <h3 className="mb-4 text-center">📚 Thống kê sách mượn</h3>
            {/* Form mượn sách */}
            <form onSubmit={handleSubmit}>
                <div className="row mb-3 gy-3">
                    <div className="col-md-3">
                        <label className="form-label">Chọn khách hàng</label>
                        <select
                            className="form-select"
                            value={form.user_id}
                            onChange={(e) =>
                                setForm({ ...form, user_id: e.target.value })
                            }
                            required
                        >
                            <option value="">-- Chọn khách hàng --</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.username}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-3">
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

                    <div className="col-md-3">
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
                    <div className="col-md-3">
                        <label className="form-label">Hạn trả</label>
                        <div>
                            <DatePicker
                                selected={form.due_date}
                                onChange={(date) =>
                                    setForm({ ...form, due_date: date })
                                }
                                className="form-control"
                                dateFormat="yyyy-MM-dd"
                                required
                            />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">
                            Trạng thái{" "}
                            {form.due_date &&
                                new Date(form.due_date) < new Date() &&
                                form.status !== "overdue" && (
                                    <span className="text-danger fw-bold">
                                        (Vui lòng chuyển trạng thái đã quá hạn)
                                    </span>
                                )}
                        </label>
                        <select
                            className="form-select"
                            disabled={!form.isEdit}
                            value={form.status}
                            onChange={(e) =>
                                setForm({ ...form, status: e.target.value })
                            }
                            required
                        >
                            <option value="">-- Chọn trạng thái --</option>
                            {Object.entries(STATUS_BORROW).map(
                                (status, index) => (
                                    <option
                                        key={index}
                                        value={status[0].toLowerCase()}
                                    >
                                        {status[1]}
                                    </option>
                                )
                            )}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Phạt tiền (nếu có)</label>
                        <input
                            type="number"
                            disabled={!form.isEdit}
                            className="form-control"
                            value={form.punish}
                            onChange={(e) =>
                                setForm({ ...form, punish: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Ghi chú</label>
                        <input
                            className="form-control"
                            disabled={!form.isEdit}
                            value={form.note}
                            onChange={(e) =>
                                setForm({ ...form, note: e.target.value })
                            }
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
                        <th>Ngày mượn</th>
                        <th>Hạn chót</th>
                        <th>Thời điểm hiện tại</th>
                        <th>Trạng thái</th>
                        <th>Tiền phạt</th>
                        <th>Ghi chú</th>
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
                            <td>{borrowBook.borrowed_date}</td>
                            <td>{borrowBook.due_date}</td>
                            <td>
                                {borrowBook.due_date &&
                                    new Date(borrowBook.due_date) <
                                        new Date() &&
                                    borrowBook.status !== "overdue" && (
                                        <p className="text-danger fw-bold">
                                            Đã quá hạn, vui lòng đổi trạng thái!
                                        </p>
                                    )}
                            </td>
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
                            <td>{Math.round(borrowBook.punish)} VNĐ</td>
                            <td>{borrowBook.note}</td>
                            <td>
                                <div className="d-flex gap-2">
                                    <button
                                        className="btn btn-warning"
                                        onClick={() =>
                                            setForm({
                                                id: borrowBook.id,
                                                user_id: borrowBook.user_id,
                                                book_id: borrowBook.book_id,
                                                quantity: borrowBook.quantity,
                                                status: borrowBook.status,
                                                punish: borrowBook.punish,
                                                note: borrowBook.note,
                                                due_date: borrowBook.due_date,
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

export default StatsBorrowedBooksPage;
