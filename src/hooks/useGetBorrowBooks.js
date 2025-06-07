
import { callGetBorrowBooks } from "config/api";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";

const useGetBorrowBooks = (query = null) => {
    const [borrowBooks, setBorrowBooks] = useState([])
    const [loading, setLoading] = useState(true)

    const getAllBorrowBooks = async (subQuery = null) => {
        try {
            const res = await callGetBorrowBooks(subQuery || query)
            if (res) {
                setBorrowBooks(res)
            }

        } catch (error) {
            toast.error(
                `Mất kết nối`,
                {
                    position: "bottom-right",
                }
            );
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllBorrowBooks()
    }, [])

    return { loading, borrowBooks, getAllBorrowBooks }
}

export default useGetBorrowBooks