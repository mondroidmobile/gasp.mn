import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import axios from 'utils/axios'

export const AuthContext = createContext()

const initUserDetail = {}
export default function AuthContextProvider(props)
{
    /** хэрэглэгчийн мэдээлэл */
    const [ userDetail, setDetail ] = useState(initUserDetail)
    const navigate = useNavigate()

    /** системд хэрэглэгчийн нэвтэрснээр бүртгэх */
    const loggedUser = (userData) => {
        //  хэрэглэгчийн мэдээллийг хадгалах нь
        setDetail(userData)
    }

    /**
     * Xэрэглэгчийн бүх мэдээллийг авах нь
     * setDetail хийнэ
     */
    const getDetail = async () =>
    {
        const { success, data, error } = await axios.get("/api/author/logged/").catch(err => err)
        if (success)
        {
            loggedUser(data ? data : initUserDetail)
        }
    }

    /** Системээс гарах
     * @param {boolean} hasToast гаргах эсэх
    */
    const signOut = async (hasToast=true) =>
    {
        const { success, info, error } = await axios.get("/api/sign/out/").catch(err => err)
        if (success)
        {
            /** toast гаргах эсэх */
            if (hasToast)
            {
                const text = info
                toast.success(text)
            }
            //  хэрэглэгчийн мэдээллийг хоослох нь
            setDetail(initUserDetail)
            navigate("/admin/")
        }
        else {
            if (hasToast)
            {
                const text = error
                toast.error(text)
            }
        }
    }

    return (
        <AuthContext.Provider value={{
            getDetail,
            signOut,
            setDetail,
            loggedUser,
            userDetail,
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export function useAuth()
{
    return useContext(AuthContext)
}
