import LocationSvg from "../LocationSvg/LocationSvg"
import styles from "@/styles/cityButton/index.module.scss"
import { useStore } from "effector-react"
import { $mode } from "@/context/mode"
import { $userCity, setUserCity } from "@/context/user"
import { getApproxGeolocationFx, getGeolocationFx } from "@/app/api/geolocation"
import { toast } from "react-toastify"
import spinnerStyles from '@/styles/spinner/index.module.scss';
import { useEffect } from "react"


const CityButton = () => {

    const mode = useStore($mode)
    const { city } = useStore($userCity)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
    const spinner = useStore(getGeolocationFx.pending)

    useEffect(() => {
        const savedCity = localStorage.getItem('city');
        if (!savedCity) {
            getCity();
            console.log(1);
        } else {
            setUserCity({ city: savedCity, street: '' });
        }
    }, []);

    const getCity = async () => {
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

            // Сохраняем название города в localStorage
            localStorage.setItem('city', (data && data.features[0]?.properties.city) || dataApprox.data.city.name);
        } catch (error) {
            toast.error((error as Error).message);
        }
    }
    return (
        <button className={styles.city} onClick={getCity}
        > <span className={`${styles.city__span}  ${darkModeClass}`}>
                <LocationSvg />
            </span>
            <span className={`${styles.city__text} ${darkModeClass}`}>{spinner ? (
                <span
                    className={spinnerStyles.spinner}
                    style={{ top: '-10px', left: 10, width: 20, height: 20 }}
                />
            ) : (
                city.length ? city : 'Город'
            )}</span>
        </button>
    )
}

export default CityButton