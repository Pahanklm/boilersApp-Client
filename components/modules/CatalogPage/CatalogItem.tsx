import { addToCartFx, removeFromCartFx } from '@/app/api/shopping-cart'
import CartHoverCheckedSvg from '@/components/elements/CartHoverCheckedSvg/CartHoverCheckedSvg'
import CartHoverSvg from '@/components/elements/CartHoverSvg/CartHoverSvg'
import { $mode } from '@/context/mode'
import { $shoppingCart } from '@/context/shopping-cart'
import { $user } from '@/context/user'
import styles from '@/styles/catalog/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { IBoilerPart } from '@/types/boilerparts'
import { formatPrice } from '@/utils/common'
import { toggleCartItem } from '@/utils/shopping-cart'
import { useStore } from 'effector-react'
import Link from 'next/link'

const CatalogItem = ({ item }: { item: IBoilerPart }) => {
    const mode = useStore($mode)
    const user = useStore($user)
    const shoppingCart = useStore($shoppingCart)
    const isInCart = shoppingCart.some((cartItem) => cartItem.partId === item.id)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
    const spinner = useStore(removeFromCartFx.pending, addToCartFx.pending)

    const toggleToCart = () => toggleCartItem(user.username, item.id, isInCart)


    return (
        <li className={`${styles.catalog__list__item} ${darkModeClass}`}>
            <img src={JSON.parse(item.images)[0]} alt={item.name} />
            <div className={styles.catalog__list__item__inner}>
                <Link href={`/catalog/${item.id}`} passHref legacyBehavior>
                    <h3 className={styles.catalog__list__item__title}>{item.name}</h3>
                </Link>
                <span className={styles.catalog__list__item__code}>
                    Артикул: {item.vendor_code}
                </span>
                <span className={styles.catalog__list__item__price}>
                    {formatPrice(item.price)} UAH
                </span>
            </div>
            <button
                className={`${styles.catalog__list__item__cart} ${isInCart ? styles.added : ''
                    }`}
                disabled={spinner}
                onClick={toggleToCart}
            >
                {spinner ? (
                    <div className={spinnerStyles.spinner} style={{ top: 6, left: 6 }} />
                ) : (
                    <span>{isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}</span>
                )}
            </button>
        </li>
    )
}

export default CatalogItem