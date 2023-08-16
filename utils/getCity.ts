import { getApproxGeolocationFx, getGeolocationFx } from "@/app/api/geolocation";
import { setUserCity } from "@/context/user";
import { toast } from "react-toastify";

export const getCity = async () => {
    try {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        }
        const dataApprox = await getApproxGeolocationFx();

        let data;

        try {
            const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, options);
            });

            const { latitude, longitude } = pos.coords;

            const result = await getGeolocationFx({ latitude, longitude });
            data = result.data;
        } catch (geoError) {

        }
        
        setUserCity({
            city: (data && data.features[0]?.properties.city) || dataApprox.data.city.name,
            street: (data && data.features[0]?.properties.address_line1) || dataApprox.data.city.name
        });

        sessionStorage.setItem('city', (data && data.features[0]?.properties.city) || dataApprox.data.city.name);
        sessionStorage.setItem('street', (data && data.features[0]?.properties.address_line1) || dataApprox.data.city.name);
    } catch (error) {
        toast.error((error as Error).message);
    }
}
