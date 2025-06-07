import { callReturnBorrowBook } from "config/api";
import { ROLE } from "constants/role";
import { STATUS_RETURN } from "constants/status";
import { STATUS } from "constants/status";
import useGetAllBorrowBooks from "hooks/useGetAllBorrowBooks";
import useGetUsers from "hooks/useGetUsers";
import React, { useState } from "react";

const StatsReturnBookPage = () => {
    const {
        loading,
        borrowBooks: returnedBooks,
        getAllBorrowBooks,
    } = useGetAllBorrowBooks(`returned=true`);

    const [submittingId, setSubmittingId] = useState(null);

    const handleSubmit = async (returnBook) => {
        setSubmittingId(returnBook.id);
        await callReturnBorrowBook(returnBook.id, {
            status: "returned",
            punish: returnBook.punish,
            note: returnBook.note,
        });

        await getAllBorrowBooks(`returned=true`);
        setSubmittingId(null);
    };

    // Hiển thị spinner khi đang loading
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
            <h3 className="mb-4 text-center">📘 Thống kê sách trả</h3>
            {/* Danh sách đã trả */}
            <hr className="my-4" />
            <h5 className="mb-3">📋 Danh sách trả</h5>
            <table className="table table-striped">
                <thead className="table-light">
                    <tr>
                        <th>ID</th>
                        <th>Người mượn</th>
                        <th>Tên sách</th>
                        <th>Ảnh</th>
                        <th>Ngày mượn</th>
                        <th>Ngày trả</th>
                        <th>Hạn chót</th>
                        <th>Số lượng</th>
                        <th>Đơn giá</th>
                        <th>Tổng tiền</th>
                        <th>Tiền phạt</th>
                        <th>Thành tiền</th>
                        <th>Ghi chú</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {returnedBooks.map((returnBook, idx) => (
                        <tr key={idx}>
                            <td>{returnBook.id}</td>
                            <td>{returnBook.username}</td>
                            <td>{returnBook.book_title}</td>
                            <td>
                                <img
                                    src={returnBook.img_url}
                                    style={{ objectFit: "cover" }}
                                    width={100}
                                    height={100}
                                    alt="book-img"
                                />
                            </td>
                            <td>{returnBook.borrowed_date}</td>
                            <td>{returnBook.return_date}</td>
                            <td>{returnBook.due_date}</td>
                            <td>{returnBook.quantity}</td>
                            <td>{Math.round(returnBook.price)} VNĐ</td>
                            <td>
                                {returnBook.quantity *
                                    Math.round(returnBook.price)}{" "}
                                VNĐ
                            </td>
                            <td>{Math.round(returnBook.punish)} VNĐ</td>
                            <td>
                                {returnBook.quantity *
                                    Math.round(returnBook.price) +
                                    Math.round(returnBook.punish)}{" "}
                                VNĐ
                            </td>
                            <td>{returnBook.note}</td>
                            <td>
                                {returnBook.status === "pending" && (
                                    <p className="text-secondary">Đang duyệt</p>
                                )}
                                {returnBook.status === "returned" && (
                                    <p className="fw-bold text-success">
                                        Đã trả
                                    </p>
                                )}
                            </td>
                            <td>
                                <div className="d-flex gap-2">
                                    {returnBook.returned &&
                                        returnBook.status !== "returned" && (
                                            <button
                                                className="btn btn-warning"
                                                disabled={
                                                    submittingId ===
                                                    returnBook.id
                                                }
                                                onClick={() =>
                                                    handleSubmit(returnBook)
                                                }
                                            >
                                                {submittingId ===
                                                returnBook.id ? (
                                                    <>
                                                        <span
                                                            className="spinner-border spinner-border-sm me-2"
                                                            role="status"
                                                            aria-hidden="true"
                                                        ></span>
                                                        Đang duyệt...
                                                    </>
                                                ) : (
                                                    "Duyệt"
                                                )}
                                            </button>
                                        )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StatsReturnBookPage;
