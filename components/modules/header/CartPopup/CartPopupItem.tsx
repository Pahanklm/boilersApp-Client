import DeleteSvg from "@/components/elements/DeleteSvg";
import { $mode } from "@/context/mode";
import styles from '@/styles/cartPopup/index.module.scss';
import spinnerStyles from '@/styles/spinner/index.module.scss';
import { IShoppingCartItem } from "@/types/shopping-cart";
import { updateTotalPrice } from "@/utils/catalog";
import { formatPrice } from "@/utils/common";
import { removeItemFromCart } from "@/utils/shopping-cart";
import { useStore } from "effector-react";
import Link from "next/link";
import { useEffect, useState } from "react";


const CartPopupItem = ({ item }: { item: IShoppingCartItem }) => {

    const mode = useStore($mode)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
    const spinnerDarkModeClass = mode === 'dark' ? `${spinnerStyles.dark_mode}` : ''
    const [spinner, setSpinner] = useState(false);
    const [price, setPrice] = useState(item.price);

    useEffect(() => {
        setPrice(price * item.count)
    }, []);

    useEffect(() => {
        updateTotalPrice(price, item.partId)
    }, [price]);



    const increasePrice = () => setPrice(price + item.price)
    const decreasePrice = () => setPrice(price - item.price)
    const deleteCartItem = () => removeItemFromCart(item.partId, setSpinner)

    return (
        <li className={styles.cart__popup__list__item}>
            <div className={styles.cart__popup__list__item__top}>
                <div className={styles.cart__popup__list__item__img}>
                    <img src={item.image} alt={item.name} />
                </div>
                <Link href={`/catalog/${item.partId}`} passHref legacyBehavior>
                    <a className={`${styles.cart__popup__list__item__text} ${darkModeClass}`}>
                        <span>{item.name.replace('.', '')}, {item.parts_manufacturer},{item.boiler_manufacturer}</span>
                    </a>
                </Link>
                <button onClick={deleteCartItem}>
                    <span>
                        {spinner ? <span className={`${spinnerStyles.spinner} ${spinnerDarkModeClass} `}
                            style={{ top: 0, left: 0, width: 20, height: 20 }}
                        /> : <DeleteSvg />}
                    </span>
                </button>
            </div>
            <div className={styles.cart__popup__list__item__bottom}>
                {item.in_stock === 0 ? (<span className={styles.cart__popup__list__item_empty}>Нет на складе</span>) : (<div />)}
                <span className={`${styles.cart__popup__list__item__price} ${darkModeClass}`}>{formatPrice(item.price)} UAH</span>
            </div>
        </li>
    );
}

export default CartPopupItem;