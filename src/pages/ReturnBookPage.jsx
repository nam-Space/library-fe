import { callUpdateBorrowBook } from "config/api";
import { callReturnBorrowBook } from "config/api";
import useGetBorrowBooks from "hooks/useGetBorrowBooks";
import React, { useContext, useState } from "react";
import { UserContext } from "utils/UserContext";

const ReturnBookPage = () => {
    const { user } = useContext(UserContext);

    const {
        loading,
        borrowBooks: allBookBorrowReturned,
        getAllBorrowBooks,
    } = useGetBorrowBooks(`user_id=${user?.id}`);

    const borrowBooks = allBookBorrowReturned.filter(
        (borrowReturned) => !borrowReturned.returned
    );
    const returnedBooks = allBookBorrowReturned.filter(
        (borrowReturned) => borrowReturned.returned
    );
    const [deletingId, setDeletingId] = useState(null);

    const handleSubmit = async (borrowBook) => {
        setDeletingId(borrowBook.id);

        await callUpdateBorrowBook(borrowBook.id, {
            ...borrowBook,
            status: "pending",
            returned: true,
        });
        await getAllBorrowBooks(`user_id=${user?.id}`);

        setDeletingId(null);
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
            <h3 className="mb-4 text-center">↩️ Danh sách sách đã mượn</h3>

            <table className="table table-bordered mb-5">
                <thead className="table-light">
                    <tr>
                        <th>ID</th>
                        <th>Tên sách</th>
                        <th>Ảnh</th>
                        <th>Ngày mượn</th>
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
                    {borrowBooks.map((borrowBook, idx) => (
                        <tr key={borrowBook.id}>
                            <td>{borrowBook.id}</td>
                            <td>{borrowBook.book_title}</td>
                            <td>
                                <img
                                    src={borrowBook.img_url}
                                    style={{ objectFit: "cover" }}
                                    width={100}
                                    height={100}
                                    alt="book-img"
                                />
                            </td>
                            <td>{borrowBook.borrowed_date}</td>
                            <td>{borrowBook.due_date}</td>

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
                            <td>{borrowBook.note}</td>
                            <td className="fw-bold text-danger">Chưa trả</td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleSubmit(borrowBook)}
                                    disabled={deletingId === borrowBook.id} // Vô hiệu nút khi đang xử lý
                                >
                                    {deletingId === borrowBook.id ? (
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                                role="status"
                                                aria-hidden="true"
                                            ></span>
                                            Đang trả...
                                        </>
                                    ) : (
                                        "Trả nốt"
                                    )}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Danh sách sách đã trả */}
            <h4 className="mb-3">📘 Danh sách sách đã trả</h4>
            <table className="table table-striped">
                <thead className="table-light">
                    <tr>
                        <th>ID</th>
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
                    </tr>
                </thead>
                <tbody>
                    {returnedBooks.map((returnBook, idx) => (
                        <tr key={idx}>
                            <td>{returnBook.id}</td>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReturnBookPage;
