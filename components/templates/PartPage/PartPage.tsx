import { getBoilerPartsFx } from "@/app/api/boilerParts";
import CartHoverCheckedSvg from "@/components/elements/CartHoverCheckedSvg/CartHoverCheckedSvg";
import CartHoverSvg from "@/components/elements/CartHoverSvg/CartHoverSvg";
import DashboardSlider from "@/components/modules/DashboardPage/DashboardSlider";
import PartAccordion from "@/components/modules/PartPage/PartAccordion";
import PartImagesList from "@/components/modules/PartPage/PartImagesList";
import PartTabs from "@/components/modules/PartPage/PartTabs";
import { $boilerPart } from "@/context/boilerPart";
import { $boilerParts, setBoilerParts, setBoilerPartsByPopularity } from "@/context/boilerParts";
import { $mode } from "@/context/mode";
import { $shoppingCart } from "@/context/shopping-cart";
import { $user } from "@/context/user";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import styles from '@/styles/part/index.module.scss';
import spinnerStyles from '@/styles/spinner/index.module.scss';
import { formatPrice } from "@/utils/common";
import { toggleCartItem } from "@/utils/shopping-cart";
import { useStore } from "effector-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";



const PartPage = () => {
    const boilerPart = useStore($boilerPart)
    const cartItems = useStore($shoppingCart)
    const mode = useStore($mode)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
    const user = useStore($user)
    const boilerParts = useStore($boilerParts)
    const isInCart = cartItems.some((item) => item.partId === boilerPart.id)
    const [spinnerToggleCart, setSpinnerToggleCart] = useState(false);
    const [spinnerSlider, setSpinnerSlider] = useState(false);
    const isMobile = useMediaQuery(850)

    useEffect(() => {
        loadBoilerPart()
    }, [])

    const loadBoilerPart = async () => {
        try {
            setSpinnerSlider(true)
            const data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0')
            setBoilerParts(data)
            setBoilerPartsByPopularity()
        } catch (error) {
            toast.error((error as Error).message)
        }
        finally {
            setSpinnerSlider(false)
        }
    }

    const toggleToCart = () => toggleCartItem(user.username, boilerPart.id, isInCart)

    return (
        <section>
            <div className='container'>
                <div className={`${styles.part__top} ${darkModeClass}`}>
                    <h2 className={`${styles.part__title} ${darkModeClass}`}>{boilerPart.name}</h2>
                    <div className={styles.part__inner}>
                        <PartImagesList />
                        <div className={styles.part__info}>
                            <span className={`${styles.part__info__price} ${darkModeClass}`}>
                                {formatPrice(boilerPart.price || 0)} UAH
                            </span>
                            <span className={styles.part__info__stock}>
                                {boilerPart.in_stock > 0 ? (
                                    <span className={styles.part__info__stock__success}>
                                        Есть на складе
                                    </span>
                                ) : (
                                    <span className={styles.part__info__stock__not}>
                                        Нет на складе
                                    </span>
                                )}
                            </span>
                            <span className={styles.part__info__code}>
                                Артикул: {boilerPart.vendor_code}
                            </span>
                            <button className={`${styles.part__info__btn} ${isInCart ? styles.in_cart : ''}`} onClick={toggleToCart}>
                                {spinnerToggleCart ? <span className={spinnerStyles.spinner} style={{ top: 10, left: '45%' }} /> : <>
                                    <span className={styles.part__info__btn__icon}>{isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}</span>
                                    {isInCart ? (<span>Добаленно в корзину</span>) : (<span>Положить в корзину</span>)}
                                </>}
                            </button>
                            {!isMobile && <PartTabs />}
                        </div>
                    </div>
                </div>
                {isMobile && (
                    <div className={styles.part__accordion}>
                        <div className={styles.part__accordion__inner}>
                            <PartAccordion title="Описание">
                                <div
                                    className={`${styles.part__accordion__content} ${darkModeClass}`}
                                >
                                    <h3
                                        className={`${styles.part__tabs__content__title} ${darkModeClass}`}
                                    >
                                        {boilerPart.name}
                                    </h3>
                                    <p
                                        className={`${styles.part__tabs__content__text} ${darkModeClass}`}
                                    >
                                        {boilerPart.description}
                                    </p>
                                </div>

                            </PartAccordion>
                        </div>
                        <PartAccordion title="Совместимость">
                            <div className={`${styles.part__accordion__content} ${darkModeClass}`}>
                                <p className={`${styles.part__tabs__content__text} ${darkModeClass}`}>{boilerPart.description}</p>
                            </div>

                        </PartAccordion>
                    </div>
                )}
                <div className={styles.part__bottom}>
                    <h2 className={`${styles.part__title} ${darkModeClass}`}>
                        Вам понравится
                    </h2>
                    <DashboardSlider goToPartPage spinner={spinnerSlider} items={boilerParts.rows || []} />
                </div>
            </div>
        </section >
    );
}

export default PartPage;