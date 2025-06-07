import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { callRegister } from "config/api";
import { toast } from "react-toastify";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Mật khẩu không khớp.");
            return;
        }

        try {
            const res = await callRegister({
                username,
                password,
                email,
                role: "CUSTOMER",
            });

            if (res) {
                setSuccess("Đăng ký thành công! Bạn sẽ được chuyển hướng...");
                setError("");
                navigate("/login");
            }
        } catch (err) {
            toast.error(`Mất kết nối`, {
                position: "bottom-right",
            });
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "500px" }}>
            <h3 className="mb-4 text-center">Đăng Ký</h3>
            <form onSubmit={handleRegister}>
                <div className="mb-3">
                    <label className="form-label">Tên đăng nhập</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Mật khẩu</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Xác nhận mật khẩu</label>
                    <input
                        type="password"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <div className="alert alert-danger">{error}</div>}
                {success && (
                    <div className="alert alert-success">{success}</div>
                )}

                <button type="submit" className="btn btn-success w-100">
                    Đăng Ký
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
