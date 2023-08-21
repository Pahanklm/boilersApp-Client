import { $boilerManufacturers, $partsManufacturers, setBoilerManufacturersFromQuery, setPartsManufacturersFromQuery } from "@/context/boilerParts";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ICatalogFiltersProps } from "@/types/catalog";
import { checkQueryParams, updateParamsAndFilters, updateParamsAndFiltersFromQuery } from '@/utils/catalog';
import { getQueryParamOnFirstRender } from "@/utils/common";
import { useStore } from "effector-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CatalogFiltersDesktop from "./CatalogFiltersDesktop";
import CatalogFiltersMobile from "./CatalogFiltersMobile";

const CatalogFilters = ({
    resetFilters,
    resetFilterBtnDisabled,
    allItemsLowAndMaxPrice,
    setAllItemsLowAndMaxPrice,
    setIsPriceRangeChanged,
    isPriceRangeChanged,
    currentPage,
    setIsFilterInQuery,
    // maxPrice,
    maxPriceBoilerParts,
    maxPriceLoaded,
    closePopup,
    filtersMobileOpen,
}: ICatalogFiltersProps) => {
    const isMobile = useMediaQuery(820)
    const [spinner, setSpinner] = useState(false);
    const boilerManufacturers = useStore($boilerManufacturers)
    const partsManufacturers = useStore($partsManufacturers)
    const router = useRouter()




    useEffect(() => {
        if (!maxPriceLoaded) {
            maxPriceBoilerParts();
        }
    }, [maxPriceLoaded]);

    useEffect(() => {
        if (maxPriceLoaded) {
            applyFiltersFromQuery();
        }
    }, [maxPriceLoaded]);


    const updatePriseFromQuery = (priceFrom: number, priceTo: number) => {
        setAllItemsLowAndMaxPrice([+priceFrom, +priceTo])
        setIsFilterInQuery(true)
        setIsPriceRangeChanged(true)
    }


    const applyFilters = async () => {
        setIsFilterInQuery(true)
        try {
            setSpinner(true)
            const priceFrom = Math.ceil(allItemsLowAndMaxPrice[0])
            const priceTo = Math.ceil(allItemsLowAndMaxPrice[1])
            const priceQuery = isPriceRangeChanged ? `&priceFrom=${priceFrom}&priceTo=${priceTo}` : ''
            const boilers = boilerManufacturers.filter((item) => item.checked).map((item) => item.title)
            const parts = partsManufacturers.filter((item) => item.checked).map((item) => item.title)
            const encodedBoilerQuery = encodeURIComponent(JSON.stringify(boilers))
            const encodedPartsQuery = encodeURIComponent(JSON.stringify(parts))
            const boilerQuery = `&boiler=${encodedBoilerQuery}`
            const partsQuery = `&parts=${encodedPartsQuery}`
            const initialPage = currentPage > 0 ? 0 : currentPage

            if (boilers.length && parts.length && isPriceRangeChanged) {
                updateParamsAndFilters(
                    {
                        boiler: encodedBoilerQuery,
                        parts: encodedPartsQuery,
                        priceFrom,
                        priceTo,
                        offset: initialPage + 1,
                    },
                    `${initialPage}${priceQuery}${boilerQuery}${partsQuery}`, router
                )
                return
            }


            if (boilers.length && parts.length) {
                updateParamsAndFilters(
                    {
                        boiler: encodedBoilerQuery,
                        parts: encodedPartsQuery,
                        offset: initialPage + 1,
                    },
                    `${initialPage}${boilerQuery}${partsQuery}`, router
                )
                return
            }


            if (boilers.length && isPriceRangeChanged) {
                updateParamsAndFilters(
                    {
                        boiler: encodedBoilerQuery,
                        priceFrom,
                        priceTo,
                        offset: initialPage + 1,
                    },
                    `${initialPage}${boilerQuery}${priceQuery}`, router
                )
                return
            }

            if (parts.length && isPriceRangeChanged) {
                updateParamsAndFilters(
                    {
                        parts: encodedPartsQuery,
                        priceFrom,
                        priceTo,
                        offset: initialPage + 1,
                    },
                    `${initialPage}${partsQuery}${priceQuery}`, router
                )
                return
            }

            if (boilers.length) {
                updateParamsAndFilters(
                    {
                        boiler: encodedBoilerQuery,
                        offset: initialPage + 1,
                    },
                    `${initialPage}${boilerQuery}`, router
                )
                return
            }

            if (isPriceRangeChanged) {
                updateParamsAndFilters(
                    {
                        priceFrom,
                        priceTo,
                        offset: initialPage + 1,
                    },
                    `${initialPage}${priceQuery}`, router
                )
                return
            }

            if (parts.length) {
                updateParamsAndFilters(
                    {
                        parts: encodedPartsQuery,
                        offset: initialPage + 1,
                    },
                    `${initialPage}${partsQuery}`, router
                )
                return
            }

        } catch (error) {
            toast.error((error as Error).message)
        } finally {
            setSpinner(false)
        }
    }



    const applyFiltersFromQuery = async () => {
        try {
            const { isValidBoilerQuery, isValidPartsQuery, isValidPriceQuery, priceFromQueryValue, priceToQueryValue, partsQueryValue, boilerQueryValue } = checkQueryParams(router)

            const boilerQuery = `&boiler=${getQueryParamOnFirstRender(
                'boiler',
                router
            )}`
            const partsQuery = `&parts=${getQueryParamOnFirstRender('parts', router)}`
            const priceQuery = `&priceFrom=${priceFromQueryValue}&priceTo=${priceToQueryValue}`



            if (isValidBoilerQuery && isValidPartsQuery && isValidPriceQuery) {

                updateParamsAndFiltersFromQuery(() => {
                    updatePriseFromQuery(+priceFromQueryValue, +priceToQueryValue)
                    setBoilerManufacturersFromQuery(boilerQueryValue)
                    setPartsManufacturersFromQuery(partsQueryValue)

                }, `${currentPage}${priceQuery}${boilerQuery}${partsQuery}`)
                return
            }

            if (isValidBoilerQuery && isValidPartsQuery) {

                updateParamsAndFiltersFromQuery(() => {
                    setIsFilterInQuery(true)
                    setBoilerManufacturersFromQuery(boilerQueryValue)
                    setPartsManufacturersFromQuery(partsQueryValue)
                }, `${currentPage}${boilerQuery}${partsQuery}`)
                return
            }

            if (isValidBoilerQuery && isValidPriceQuery) {

                updateParamsAndFiltersFromQuery(() => {
                    updatePriseFromQuery(+priceFromQueryValue, +priceToQueryValue)
                    setBoilerManufacturersFromQuery(boilerQueryValue)

                }, `${currentPage}${priceQuery}${boilerQuery}`)
                return
            }

            if (isValidPartsQuery && isValidPriceQuery) {

                updateParamsAndFiltersFromQuery(() => {
                    updatePriseFromQuery(+priceFromQueryValue, +priceToQueryValue)
                    setPartsManufacturersFromQuery(partsQueryValue)

                }, `${currentPage}${priceQuery}${partsQuery}`)
                return
            }
            if (isValidPriceQuery) {

                updateParamsAndFiltersFromQuery(() => {
                    updatePriseFromQuery(+priceFromQueryValue, +priceToQueryValue)
                }, `${currentPage}${priceQuery}`)
                return
            }
            if (isValidBoilerQuery) {

                updateParamsAndFiltersFromQuery(() => {
                    setIsFilterInQuery(true)
                    setBoilerManufacturersFromQuery(boilerQueryValue)
                }, `${currentPage}${boilerQuery}`)
                return
            }
            if (isValidPartsQuery) {

                updateParamsAndFiltersFromQuery(() => {
                    setIsFilterInQuery(true)
                    setPartsManufacturersFromQuery(partsQueryValue)
                }, `${currentPage}${partsQuery}`)
                return
            }

        } catch (error) {
            const err = error as Error

            if (err.message === 'URI malformed') {
                toast.warning('Неправильный url для фильтров')
                return
            }
            toast.error(err.message)
        }
    }

    return (
        <>
            {isMobile ?
                <CatalogFiltersMobile
                    closePopup={closePopup}
                    spinner={spinner}
                    applyFilters={applyFilters}
                    allItemsLowAndMaxPrice={allItemsLowAndMaxPrice}
                    setIsPriceRangeChanged={setIsPriceRangeChanged}
                    setAllItemsLowAndMaxPrice={setAllItemsLowAndMaxPrice}
                    resetFilterBtnDisabled={resetFilterBtnDisabled}
                    filtersMobileOpen={filtersMobileOpen}
                    resetFilters={resetFilters}
                // maxPrice={maxPrice}
                /> : <CatalogFiltersDesktop
                    allItemsLowAndMaxPrice={allItemsLowAndMaxPrice}
                    setAllItemsLowAndMaxPrice={setAllItemsLowAndMaxPrice}
                    setIsPriceRangeChanged={setIsPriceRangeChanged}
                    resetFilterBtnDisabled={resetFilterBtnDisabled}
                    spinner={spinner}
                    resetFilters={resetFilters}
                    applyFilters={applyFilters}
                // maxPrice={maxPrice}
                />}
        </>
    );
}

export default CatalogFilters;

