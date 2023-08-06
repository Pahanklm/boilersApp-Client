import { $mode } from "@/context/mode";
import { ICartItemCounterProps } from "@/types/shopping-cart";
import { useStore } from "effector-react";
import styles from '@/styles/cartPopup/index.module.scss';
import MinusSvg from "../MinusSvg/MinusSvg";
import PlusSvg from "../PlusSvg/PlusSvg";
import { useState } from "react";
import spinnerStyles from '@/styles/spinner/index.module.scss';
import { toast } from "react-toastify";




const CartItemCounter = ({
    totalCount,
    partId,
    increasePrice,
    decreasePrice,
    initialCount
}: ICartItemCounterProps) => {

    const mode = useStore($mode)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
    const [spinner, setSpinner] = useState(false);
    const [count, setCount] = useState(initialCount);
    const [disableIncrease, setDisableIncrease] = useState(false);
    const [disableDecrease, setDisableDecrease] = useState(false);
    const spinnerDarkModeClass = mode === 'dark' ? `${spinnerStyles.dark_mode}` : ''

    const increase = async () => {
        try {
            setSpinner(true)
            increasePrice()
            setDisableIncrease(false)
            setCount(count + 1)
        } catch (error) {
            toast.error((error as Error).message)
        }
        finally { setSpinner(false) }
    }
    const decrease = async () => {
        try {
            setSpinner(true)
            decreasePrice()
            setDisableDecrease(false)
            setCount(count - 1)
        } catch (error) {
            toast.error((error as Error).message)
        }
        finally { setSpinner(false) }
    }

    return (
        <div className="">
            <button disabled={disableDecrease} onClick={decrease}><MinusSvg /></button>
            <span>{spinner ? <span className={`${spinnerStyles.spinner} ${spinnerDarkModeClass}`} style={{ top: 4, left: 33, width: 20, }} /> : count}</span>
            <button disabled={disableIncrease} onClick={increase}><PlusSvg /></button>
        </div>
    );
}

export default CartItemCounter;