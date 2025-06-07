
import axios8001 from "config/axios8001.customize";
import axios8002 from "config/axios8002.customize";
import axios8003 from "config/axios8003.customize";
import axios8004 from "config/axios8004.customize";
import axios8005 from "config/axios8005.customize";

export const callLogin = ({ username, password }) => {
    return axios8001.post(`/api/account/login/`, {
        username,
        password,
    });
};

export const callRegister = (data) => {
    return axios8001.post(`/api/account/register/`, {
        ...data
    });
};

export const callGetAccount = (config) => {
    return axios8001.get(`/api/account/profile/`, config);
}

export const callLogout = () => {
    return axios8001.post(`/api/auth/auth/logout`);
};

export const callGetUsers = (query) => {
    return axios8001.get(`/api/account/users/role?${query}`)
}

/* Book */
export const callGetBooks = (query) => {
    return axios8002.get(`/api/book/books?${query}`);
}

export const callGetBookById = (id) => {
    return axios8002.get(`/api/book/books/${id}`);
}

/* Borrow Book */
export const callGetBorrowBooks = (query) => {
    return axios8003.get(`/api/borrow/borrows/history?${query}`);
}

export const callGetAllBorrowBooks = (query) => {
    return axios8003.get(`/api/borrow/borrows/statistic-full?${query}`);
}

export const callAddBorrowBook = (data) => {
    return axios8003.post(`/api/borrow/borrows/`, {
        ...data
    });
}

export const callUpdateBorrowBook = (id, data) => {
    return axios8003.put(`/api/borrow/borrows/${id}/`, {
        ...data
    });
}

export const callDeleteBorrowBook = (id) => {
    return axios8003.delete(`/api/borrow/borrows/${id}/`);
}

export const callReturnBorrowBook = (id, data) => {
    return axios8003.post(`/api/borrow/borrows/${id}/return_book/`, {
        ...data
    });
}

/* Comment */
export const callGetBookComments = (id) => {
    return axios8005.get(`/api/comment/comments/by-book/${id}/`);
}

export const callCommentBook = (data) => {
    return axios8005.post(`/api/comment/comments/`, {
        ...data
    });
}
