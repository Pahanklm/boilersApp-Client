import { $mode } from '@/context/mode'
import styles from '@/styles/feedbackForm/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { FeedbackInputs } from '@/types/feedbackForm'
import { useStore } from 'effector-react'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import EmailInput from './EmailInput'
import MessageInput from './MessageInput'
import NameInput from './NameInput'
import PhoneInput from './PhoneInput'
import emailjs from '@emailjs/browser'
import { toast } from 'react-toastify'
import { $user, $userCity } from '@/context/user'
import { registrationGeolocation } from '@/utils/getCity'



const FeedbackForm = () => {
    const mode = useStore($mode)
    const user = useStore($user)
    const city = useStore($userCity)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FeedbackInputs>()
    const [spinner, setSpinner] = useState(false)
    const formRef = useRef() as MutableRefObject<HTMLFormElement>


    const [registrationLocation, setRegistrationLocation] = useState<any>(null);

    useEffect(() => {
        const fetchRegistrationLocation = async () => {
            try {
                const response = await registrationGeolocation();
                const data = response.data
                setRegistrationLocation(data);
            } catch (error) {
                console.error('Ошибка получения данных:', error);
            }
        };

        fetchRegistrationLocation();
    }, []);
    const parsedLocation = registrationLocation || {};



    const submitForm = () => {
        setSpinner(true);
        emailjs.sendForm('service_p2796l9', 'template_j4joqsj', formRef.current, 'SwziBy_k972bvBNeu')
            .then((result) => {
                setSpinner(false);
                toast.success('Сообщение отправлено');
            })
            .catch((error) => {
                setSpinner(false);
                toast.error('Что-то пошло не так');
            });
        formRef.current.reset()
    }


    return (
        <div className={`${styles.feedback_form} ${darkModeClass}`}>
            <h3 className={`${styles.feedback_form__title} ${darkModeClass}`}>
                Форма обратной связи
            </h3>
            <form
                ref={formRef}
                className={styles.feedback_form__form}
                onSubmit={handleSubmit(submitForm)}
            >
                <NameInput
                    register={register}
                    errors={errors}
                    darkModeClass={darkModeClass}
                />
                <PhoneInput
                    register={register}
                    errors={errors}
                    darkModeClass={darkModeClass}
                />
                <EmailInput
                    register={register}
                    errors={errors}
                    darkModeClass={darkModeClass}
                />
                <MessageInput
                    register={register}
                    errors={errors}
                    darkModeClass={darkModeClass}
                />
                <div style={{ display: 'none' }}>
                    <input
                        name='userEmail'
                        value={user.email}
                        onChange={(e) => {
                        }}
                    /></div>
                <div style={{ display: 'none' }}>
                    <input
                        name='userName'
                        value={user.username}
                        onChange={(e) => {
                        }}
                    /></div>
                <div style={{ display: 'none' }}>
                    <input
                        name='userId'
                        value={user.userID}
                        onChange={(e) => {
                        }}
                    /></div>
                <div style={{ display: 'none' }}>
                    <input
                        name='currentCity'
                        value={city.city}
                        onChange={(e) => {
                        }}
                    /></div>
                <div style={{ display: 'none' }}>
                    <input
                        name='currentStreet'
                        value={city.street}
                        onChange={(e) => {
                        }}
                    /></div>
                <div style={{ display: 'none' }}>
                    <input
                        name='registrationCity'
                        value={parsedLocation.registrationCity || ''}
                        onChange={(e) => {
                        }}
                    /></div>
                <div style={{ display: 'none' }}>
                    <input
                        name='registrationStreet'
                        value={parsedLocation.registrationStreet || ''}
                        onChange={(e) => {
                        }}
                    /></div>
                <div className={styles.feedback_form__form__btn}>
                    <button>
                        {spinner ? (
                            <span
                                className={spinnerStyles.spinner}
                                style={{ top: '6px', left: '47%' }}
                            />
                        ) : (
                            'Отправить сообщение'
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FeedbackForm