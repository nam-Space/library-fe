import { callCommentBook } from "config/api";
import { callAddBorrowBook } from "config/api";
import useGetBookById from "hooks/useGetBookById";
import useGetCommentsByBookId from "hooks/useGetCommentsByBookId";
import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "utils/UserContext";

const BookDetailPage = () => {
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const { loading, book, getBook } = useGetBookById(id);
    const {
        loading: loadingComments,
        comments,
        getComments,
    } = useGetCommentsByBookId(id);

    const [borrowQuantity, setBorrowQuantity] = useState(1);
    const [loadingBorrow, setLoadingBorrow] = useState(false);

    const [content, setContent] = useState(""); // Content for the new comment
    const [loadingAddComment, setLoadingAddComment] = useState(false);

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

    const handleBorrowBook = async () => {
        setLoadingBorrow(true);
        await callAddBorrowBook({
            user_id: user?.id,
            book_id: id,
            quantity: borrowQuantity,
        });
        toast.success(`Mượn sách thành công`, {
            position: "bottom-right",
        });
        setLoadingBorrow(false);
    };

    const handleAddComment = async () => {
        if (!content) {
            toast.error("Vui lòng nhập bình luận!");
            return;
        }

        try {
            setLoadingAddComment(true);
            const res = await callCommentBook({
                user_id: user?.id,
                username: user?.username,
                book_id: id,
                content,
            });

            if (res) {
                toast.success("Bình luận thành công!", {
                    position: "bottom-right",
                });
                setContent(""); // Clear input after success
                getComments(id);
            } else {
                toast.error("Có lỗi khi gửi bình luận");
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại", {
                position: "bottom-right",
            });
        }

        setLoadingAddComment(false);
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
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                        }}
                    >
                        <strong>Đơn giá:</strong>{" "}
                        <strong
                            className="text-success"
                            style={{ fontSize: 22 }}
                        >
                            {Math.round(book.price)} VNĐ
                        </strong>
                    </div>
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

                        <button
                            className="btn btn-success me-2"
                            onClick={handleBorrowBook}
                            disabled={loadingBorrow}
                        >
                            {loadingBorrow ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                    Đang xử lý...
                                </>
                            ) : (
                                "📚 Mượn sách"
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Bình luận */}
            <div className="mt-5">
                <h4>Bình luận về sách</h4>
                <textarea
                    className="form-control"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="3"
                    placeholder="Viết bình luận..."
                ></textarea>
                <button
                    className="btn btn-primary mt-2"
                    onClick={handleAddComment}
                    disabled={loadingAddComment}
                >
                    {loadingAddComment ? (
                        <>
                            <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                            ></span>
                            Đang gửi...
                        </>
                    ) : (
                        "Gửi bình luận"
                    )}
                </button>

                <div className="mt-4">
                    <h5>Bình luận:</h5>
                    <ul className="list-group">
                        {comments.map((comment) => (
                            <li
                                key={comment.id}
                                className="list-group-item p-3"
                                style={{
                                    border: "1px solid #ddd",
                                    borderRadius: "8px",
                                    marginBottom: "15px",
                                }}
                            >
                                <div
                                    className="d-flex justify-content-between"
                                    style={{ alignItems: "flex-start" }}
                                >
                                    <div
                                        className="d-flex"
                                        style={{
                                            fontWeight: "bold",
                                            color: "#2C3E50",
                                        }}
                                    >
                                        {comment.username}: {comment.content}
                                    </div>
                                    <span
                                        className={`badge ${
                                            comment.sentiment === "Tích cực"
                                                ? "bg-success"
                                                : comment.sentiment ===
                                                  "Tiêu cực"
                                                ? "bg-danger"
                                                : "bg-secondary"
                                        }`}
                                    >
                                        {comment.sentiment}
                                    </span>
                                </div>
                                <small
                                    className={`${
                                        comment.sentiment === "Tích cực"
                                            ? "text-success"
                                            : comment.sentiment === "Tiêu cực"
                                            ? "text-danger"
                                            : "text-secondary"
                                    }`}
                                >
                                    <strong>Confidence:</strong>{" "}
                                    {comment.confidence}
                                </small>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BookDetailPage;
