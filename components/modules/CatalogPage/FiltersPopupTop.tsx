import { $mode } from "@/context/mode";
import styles from '@/styles/catalog/index.module.scss';
import { IFiltersPopupTop } from "@/types/catalog";
import { useStore } from "effector-react";


const FiltersPopupTop = ({ title, resetBtnText, resetFilters, resetFilterBtnDisabled, closePopup }: IFiltersPopupTop) => {

    const mode = useStore($mode)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    return (
        <div className={`${styles.catalog__bottom__filters__top} ${darkModeClass}`}>
            <button className={`${styles.catalog__bottom__filters__title} ${darkModeClass}`} onClick={closePopup}>{title}</button>
            <button className={styles.catalog__bottom__filters__reset} onClick={resetFilters} disabled={resetFilterBtnDisabled} >{resetBtnText}</button>
        </div>
    );
}

export default FiltersPopupTop;