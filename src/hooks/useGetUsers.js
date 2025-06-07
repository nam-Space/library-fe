
import { callGetUsers } from "config/api";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";

const useGetUsers = (query = null) => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const getAllUsers = async (subQuery = null) => {
        try {
            const res = await callGetUsers(subQuery || query)
            if (res) {
                setUsers(res)
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
        getAllUsers()
    }, [])

    return { loading, users, getAllUsers }
}

export default useGetUsers