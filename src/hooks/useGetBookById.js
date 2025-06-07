import { callGetBookById } from 'config/api'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const useGetBookById = (bookId) => {
    const [book, setBook] = useState({})
    const [loading, setLoading] = useState(true)

    const getBook = async (id) => {
        try {
            const res = await callGetBookById(id || bookId)
            if (res) {
                setBook(res)
            }
            setLoading(false)
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
        if (bookId) {
            getBook(bookId)
        }
    }, [bookId])

    return { loading, book, getBook }
}

export default useGetBookById