import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { callLogin } from "config/api";
import { toast } from "react-toastify";
import { callGetAccount } from "config/api";
import { UserContext } from "utils/UserContext";
import _ from "lodash";

const LoginPage = () => {
    const { user, setUser } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!_.isEmpty(user)) {
            navigate("/");
        }
    }, [user]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await callLogin({
                username,
                password,
            });
            if (
                res.detail &&
                res.detail ==
                    "No active account found with the given credentials"
            ) {
                return;
            }
            const { access, refresh } = res;
            const resAcc = await callGetAccount({
                headers: {
                    Authorization: "Bearer " + access,
                },
            });
            setUser(resAcc);
            localStorage.setItem(
                "currentUser-library",
                JSON.stringify({
                    ...resAcc,
                    access,
                })
            );
            navigate("/");
        } catch (err) {
            toast.error(`Mất kết nối`, {
                position: "bottom-right",
            });
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "500px" }}>
            <h3 className="mb-4 text-center">Đăng Nhập</h3>
            <form onSubmit={handleLogin}>
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
                    <label className="form-label">Mật khẩu</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <button type="submit" className="btn btn-primary w-100">
                    Đăng Nhập
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
