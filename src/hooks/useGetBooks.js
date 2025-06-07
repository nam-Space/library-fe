
import { useEffect, useState } from "react"
import { callGetBooks } from "config/api";
import { toast } from "react-toastify";

const useGetBooks = (query = null) => {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)

    const getAllBooks = async (subQuery = null) => {
        try {
            const res = await callGetBooks(subQuery || query)
            if (res) {
                setBooks(res)
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
        getAllBooks()
    }, [])

    return { loading, books, getAllBooks }
}

export default useGetBooks