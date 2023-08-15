import { IGeolocation } from "@/types/common";
import { createEffect } from "effector-next";
import api from '../axiosClient'


export const getGeolocationFx = createEffect(async ({longitude , latitude}: IGeolocation) => {
    const dataApprox = await api.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&lang=ru&apiKey=${process.env.NEXT_PUBLIC_GEOAPI_KEY}`,{withCredentials: false})

    return dataApprox
})
export const getApproxGeolocationFx = createEffect(async () => {
    const data = await api.get(`https://api.geoapify.com/v1/ipinfo?apiKey=${process.env.NEXT_PUBLIC_GEOAPI_KEY}`,{withCredentials: false})

    return data
})