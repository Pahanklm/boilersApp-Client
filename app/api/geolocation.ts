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
export const getRegistrationGeolocationFx = createEffect(async () => {
    const { data } = await api.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/registration-location`)
  
    return data
  })
  export const postCurrentGeolocationFx = createEffect(async (requestData: object) => {
    try {
        const { data } = await api.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/update-location`, requestData);
        return data;
    } catch (error) {
        console.error('An error occurred while posting current geolocation:', error);
        throw error;
    }
});

