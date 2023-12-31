import { $mode } from "@/context/mode";
import { $totalPrice } from "@/context/shopping-cart";
import styles from '@/styles/dashboard/index.module.scss';
import { IcartAlertProps } from "@/types/dashboard";
import { formatPrice } from "@/utils/common";
import { useStore } from "effector-react";
import Link from "next/link";


const CartAlert = ({ count, closeAlert }: IcartAlertProps) => {

    const mode = useStore($mode)
    const totalPrice = useStore($totalPrice)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    const showCountMessage = (count: string) => {
        if (count.endsWith('1')) {
            return 'товар'
        }
        if (count.endsWith('2') || count.endsWith('3') || count.endsWith('4')) {
            return 'товара'
        }
        return 'товаров'
    }

    return (
        <>
            <div className={`${styles.dashboard__alert__left} ${darkModeClass}`}>
                <span>В корзине {count} {showCountMessage(`${count}`)}</span>
                <span>на сумму {formatPrice(totalPrice)} UAH</span>
            </div>
            <div className={styles.dashboard__alert__right}>
                <Link href='/order' passHref legacyBehavior>
                    <a className={styles.dashboard__alert__btn_cart}>Перейти в корзину</a>
                </Link>
                <Link href='/order' passHref legacyBehavior>
                    <a className={styles.dashboard__alert__btn_order}>Оформить заказ</a>
                </Link>
            </div>
            <button className={styles.dashboard__alert__btn_close} onClick={closeAlert} />
        </>
    );
}

export default CartAlert;