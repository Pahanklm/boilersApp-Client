import { $boilerPart } from "@/context/boilerPart";
import { IPartImagesItemProps } from "@/types/part";
import { useStore } from "effector-react";
import styles from '@/styles/part/index.module.scss'


const PartImagesItem = ({ src, callback, alt }: IPartImagesItemProps) => {
    const boilerPart = useStore($boilerPart)

    const changeMainImages = () => {
        callback(src)
    }

    return (
        <li className={styles.part__images__list__item} onClick={changeMainImages}>
            <img src={src} alt={alt} />
        </li>
    );
}

export default PartImagesItem;