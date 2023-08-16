import { getGeolocationFx, getRegistrationGeolocationFx } from "@/app/api/geolocation"
import { $mode } from "@/context/mode"
import { $userCity, setUserCity } from "@/context/user"
import styles from "@/styles/cityButton/index.module.scss"
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { getCity } from "@/utils/getCity"
import { useStore } from "effector-react"
import { useEffect } from "react"
import LocationSvg from "../LocationSvg/LocationSvg"


const CityButton = () => {

    const mode = useStore($mode)
    const { city } = useStore($userCity)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
    const spinner = useStore(getGeolocationFx.pending)

    useEffect(() => {
        const savedCity = sessionStorage.getItem('city');
        const savedStreet = sessionStorage.getItem('street');
        if (!savedCity || !savedStreet) {
            console.log(1);
            getCity();
        } else {
            setUserCity({ city: savedCity, street: savedStreet });
        }
    }, []);

    useEffect(() => {
        const savedLocation = sessionStorage.getItem('registrationLocation')
        if (!savedLocation) {
            console.log(2);
            registrationGeolocation()
        }
    }, [])


    const registrationGeolocation = async () => {
        const data = await getRegistrationGeolocationFx(`http://localhost:3001/users/registration-location`)

        sessionStorage.setItem('registrationLocation', JSON.stringify(data));



        return data
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