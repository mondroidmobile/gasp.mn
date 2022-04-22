import { useContext, useState } from "react";

import axios from 'utils/axios'

const { createContext } = require("react");

export const ConfigContext = createContext()

export default function ConfigContextProvider(props)
{
    /** Сайтын тохиргоонуудыг халгалах state */
    const [configs, setConfigs] = useState({})

    /** Тохиргоог back аас авах */
    const getConfigs = async () =>
    {
        /** Back аас авах config үүдийн нэрийн жагсаалт */
        const names = "GOOGLE_MAP,SITE_LOGO,SITE_BANNER_IMAGE,FACEBOOK,INSTAGRAMM,YOUTUBE,HOME_IMAGE,HOME_ABOUT,HOME_TITLE,HOME_GOAL,FOOTER_ADDRESS,FOOTER_EMAIL,FOOTER_SITE,FOOTER_PHONE,FOOTER_PHONE_NUMBER,SITE_MENU_IMAGE"
        const { success, data, error } = await axios.get(`/api/config/?names=${names}`).catch(err => err)
        if (success)
        {
            const valueOfConfigs = data.reduce(
                (prevValue, currentValue) =>
                {
                    prevValue[currentValue.name] = currentValue.value
                    return prevValue
                },
                {}
            )
            setConfigs(valueOfConfigs)
        }
        else
        {
            setConfigs({})
        }

    }

    return (
        <ConfigContext.Provider
            value={{
                configs,
                getConfigs,
            }}
        >
            {props.children}
        </ConfigContext.Provider>
    )
}

export function useConfig()
{
    return useContext(ConfigContext)
}


