import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const token = localStorage.getItem("currentUser-healthcare");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("currentUser-healthcare");
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
            <Link className="navbar-brand" to="/">
                📚 Thư Viện
            </Link>

            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
            >
                <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            Trang chủ
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/books">
                            Danh sách sách
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/borrowed">
                            Sách đã mượn
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/return-book">
                            Sách đã trả
                        </Link>
                    </li>

                    {token ? (
                        <>
                            <li className="nav-item">
                                <button
                                    className="btn btn-outline-light ms-3"
                                    onClick={handleLogout}
                                >
                                    Đăng xuất
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    Đăng nhập
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">
                                    Đăng ký
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
