import { $mode } from "@/context/mode";
import { useStore } from "effector-react";
import styles from '@/styles/catalog/index.module.scss';
import { ICatalogFilterMobileProps } from "@/types/catalog";
import spinnerStyles from '@/styles/spinner/index.module.scss';
import FiltersPopupTop from "./FiltersPopupTop";
import FiltersPopup from "./FiltersPopup";
import { $boilerManufacturers, $partsManufacturers, setBoilerManufacturers, setPartsManufacturers, updateBoilerManufacturers, updatePartsManufacturers } from "@/context/boilerParts";
import { useEffect, useState } from "react";
import Accordion from "@/components/elements/Accordion/Accordion";
import PriceRange from "./PriceRange";
import { useMediaQuery } from "@/hooks/useMediaQuery";



const CatalogFiltersMobile = ({ spinner, resetFilterBtnDisabled, resetFilters, closePopup, applyFilters, filtersMobileOpen, allItemsLowAndMaxPrice, setAllItemsLowAndMaxPrice, setIsPriceRangeChanged,
    maxPrice
}: ICatalogFilterMobileProps) => {




    const mode = useStore($mode)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
    const boilerManufacturers = useStore($boilerManufacturers)
    const partsManufacturers = useStore($partsManufacturers)
    const [openBoilers, setOpenBoilers] = useState(false);
    const [openParts, setOpenParts] = useState(false);
    const handleOpenBoilers = () => setOpenBoilers(true)
    const handleCloseBoilers = () => setOpenBoilers(false)
    const handleOpenParts = () => setOpenParts(true)
    const handleCloseParts = () => setOpenParts(false)
    const isAnyBoilerManufacturerChecked = boilerManufacturers.some((item) => item.checked)
    const isAnyPartsManufacturerChecked = partsManufacturers.some((item) => item.checked)
    const resetAllBoilerManufacturers = () => setBoilerManufacturers(boilerManufacturers.map((item) => ({ ...item, checked: false })))
    const resetAllPartsManufacturers = () => setPartsManufacturers(partsManufacturers.map((item) => ({ ...item, checked: false })))
    const isMobile = useMediaQuery(820)



    const applyFiltersAndClosePopup = () => {
        applyFilters()
        closePopup()
    }

    return (
        <div className={`${styles.catalog__bottom__filters} ${darkModeClass} ${filtersMobileOpen ? styles.open : ''}`} >
            <div className={styles.catalog__bottom__filters__inner}>
                <FiltersPopupTop
                    resetBtnText='Сбросить все'
                    title='Фильтры'
                    resetFilters={resetFilters}
                    resetFilterBtnDisabled={resetFilterBtnDisabled}
                    closePopup={closePopup}
                />
                <div className={styles.filters__boiler_manufacturers}>
                    <button className={`${styles.filters__manufacturer__btn} ${darkModeClass} `}
                        onClick={handleOpenBoilers}
                    >
                        Производитель котлов
                    </button>
                    <FiltersPopup
                        title={'Производитель котлов'}
                        resetFilterBtnDisabled={!isAnyBoilerManufacturerChecked}
                        updateManufacturer={updateBoilerManufacturers}
                        setManufacturer={setBoilerManufacturers}
                        applyFilters={applyFiltersAndClosePopup}
                        manufacturersList={boilerManufacturers}
                        resetAllManufacturers={resetAllBoilerManufacturers}
                        handleClosePopup={handleCloseBoilers}
                        openPopup={openBoilers}
                    />
                </div>
                <div className={styles.filters__boiler_manufacturers}>
                    <button className={`${styles.filters__manufacturer__btn} ${darkModeClass} `}
                        onClick={handleOpenParts}
                    >
                        Производитель запчатей
                    </button>
                    <FiltersPopup
                        title={'Производитель запчатей'}
                        resetFilterBtnDisabled={!isAnyPartsManufacturerChecked}
                        updateManufacturer={updatePartsManufacturers}
                        setManufacturer={setPartsManufacturers}
                        applyFilters={applyFiltersAndClosePopup}
                        manufacturersList={partsManufacturers}
                        resetAllManufacturers={resetAllPartsManufacturers}
                        handleClosePopup={handleCloseParts}
                        openPopup={openParts}
                    />
                </div>
                <div className={styles.filters__price}>
                    <Accordion
                        title='Цена'
                        titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
                        hideArrowClass={styles.hide_arrow}
                        isMobileForFilters={isMobile}
                    >

                        <div className={styles.filters__manufacturer__inner}></div>
                        <PriceRange
                            allItemsLowAndMaxPrice={allItemsLowAndMaxPrice}
                            setAllItemsLowAndMaxPrice={setAllItemsLowAndMaxPrice}
                            setIsPriceRangeChanged={setIsPriceRangeChanged}
                            maxPrice={maxPrice}
                        />
                    </Accordion>
                </div>
            </div>
            <div className={styles.filters__actions}>
                <button className={styles.catalog__filters__actions__show} disabled={resetFilterBtnDisabled} onClick={applyFiltersAndClosePopup}>{spinner ? (<span className={spinnerStyles.spinner} style={{ top: 6, left: '47%' }} />) : ('Показать')}</button>
            </div>
        </div>
    );
}

export default CatalogFiltersMobile;