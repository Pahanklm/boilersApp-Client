import Accordion from "@/components/elements/Accordion/Accordion";
import { $boilerManufacturers, $partsManufacturers, setBoilerManufacturers, setPartsManufacturers, updateBoilerManufacturers, updatePartsManufacturers } from "@/context/boilerParts";
import { $mode } from "@/context/mode";
import styles from '@/styles/catalog/index.module.scss';
import spinnerStyles from '@/styles/spinner/index.module.scss';
import { ICatalogFiltersDesktopProps } from "@/types/catalog";
import { useStore } from "effector-react";
import FilterManufacturerAccordion from "./FilterManufacturerAccordion";
import PriceRange from "./PriceRange";


const CatalogFiltersDesktop = ({ resetFilters, spinner, resetFilterBtnDisabled,
    // maxPrice, 
    allItemsLowAndMaxPrice, setAllItemsLowAndMaxPrice, setIsPriceRangeChanged, applyFilters }: ICatalogFiltersDesktopProps) => {
    const mode = useStore($mode)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
    const boilerManufacturers = useStore($boilerManufacturers)
    const partsManufacturers = useStore($partsManufacturers)

    return (
        <div className={`${styles.catalog__bottom__filters} ${darkModeClass}`}>
            <h3 className={`${styles.catalog__bottom__filters__title} ${darkModeClass}`}>Фильтры</h3>
            <div className={styles.filters__boiler_manufacturers}>
                <FilterManufacturerAccordion
                    manufacturersList={boilerManufacturers}
                    title='Производитель котлов'
                    updateManufacturer={updateBoilerManufacturers}
                    setManufacturer={setBoilerManufacturers}
                />
            </div>
            <div className={styles.filters__price}>
                <Accordion
                    title='Цена'
                    titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
                    arrowOpenClass={styles.open}
                >

                    <div className={styles.filters__manufacturer__inner}></div>
                    <PriceRange
                        allItemsLowAndMaxPrice={allItemsLowAndMaxPrice}
                        setAllItemsLowAndMaxPrice={setAllItemsLowAndMaxPrice}
                        setIsPriceRangeChanged={setIsPriceRangeChanged}
                    // maxPrice={maxPrice}
                    />
                </Accordion>
            </div>
            <div className={styles.filters__boiler_manufacturers}>
                <FilterManufacturerAccordion
                    manufacturersList={partsManufacturers}
                    title='Производитель запчастей'
                    updateManufacturer={updatePartsManufacturers}
                    setManufacturer={setPartsManufacturers}
                />
            </div>
            <div className={styles.filters__actions}>
                <button
                    className={styles.filters__actions__show}
                    disabled={spinner || resetFilterBtnDisabled}
                    onClick={applyFilters}
                >
                    {spinner ? (
                        <span
                            className={spinnerStyles.spinner}
                            style={{ top: 6, left: '47%' }}
                        />
                    ) : (
                        'Показать'
                    )}
                </button>
                <button disabled={resetFilterBtnDisabled} className={styles.filters__actions__reset} onClick={resetFilters}> Сбросить</button>
            </div>
        </div >
    );
}

export default CatalogFiltersDesktop;