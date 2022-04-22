import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import axios from 'utils/axios'

export default function ConfigText({ configName, title="" }) {

    const [ value, setValue ] = useState("")
    const [ isEditing, setEditing ] = useState()

    const handleChange = (e) =>
    {
        const changedValue = e.target.value
        setValue(changedValue)
    }

    const getConfig = async () =>
    {
        const { success, data, error } = await axios.get(`/api/config/?names=${configName}`).catch(err => err)
        if (success)
        {
            setValue(data?.[0]?.value || "")
        }
    }

    useEffect(
        () =>
        {
            getConfig()
        },
        []
    )

    const onSubmit = async () =>
    {
        const body = {
            configs: {
                name: configName,
                value: value
            }
        }
        const { success, data, error, info } = await axios.put(`/api/config/`, body).catch(err => err)
        if (success)
        {
            toast.success(`${title} заслаа`)
        }
        else {
            toast.error(`${title}: ${error}`)
        }
    }

    const handleClick = () =>
    {
        const changed = !isEditing
        if (!changed)
        {
            onSubmit()
        }
        setEditing(changed)
    }

    return (
        <div>
            <label htmlFor={configName}>{title}:</label>
            <textarea type="text" id={configName} readOnly={!isEditing} onChange={handleChange} value={value}></textarea>
            <button onClick={handleClick}>{isEditing ? "save" : "edit"}</button>
        </div>
    )
}
