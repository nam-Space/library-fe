
import { callGetBookComments } from 'config/api'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const useGetCommentsByBookId = (bookId) => {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)

    const getComments = async (id) => {
        try {
            const res = await callGetBookComments(id || bookId)
            if (res) {
                setComments(res)
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
            getComments(bookId)
        }
    }, [bookId])

    return { loading, comments, getComments }
}

export default useGetCommentsByBookId