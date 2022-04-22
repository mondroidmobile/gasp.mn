import axios from 'axios'

/** тохиргоо оруулсан axios */
const instance = axios.create(
    {
        baseURL: process.env.REACT_APP_SERVER_URL,
        withCredentials: true,
    }
)
instance.interceptors.response.use(
    function(rsp)
    {
        /** object оос задлаж data буцаах */
        const data = rsp.data
        return data
    },
    function(err)
    {
        /** object оос задлаж data буцаах нь */
        const error = err?.response?.data
        return error
    }
)

export default instance
