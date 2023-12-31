import { getBoilerPartsFx } from '@/app/api/boilerParts';
import FilterSvg from '@/components/elements/FilterSvg/FilterSvg';
import CatalogFilters from '@/components/modules/CatalogPage/CatalogFilters';
import CatalogItem from '@/components/modules/CatalogPage/CatalogItem';
import FilterSelect from '@/components/modules/CatalogPage/FilterSelect';
import ManufacturersBlock from '@/components/modules/CatalogPage/ManufacturersBlock';
import { $boilerManufacturers, $boilerParts, $filteredBoilerParts, $partsManufacturers, setBoilerManufacturers, setBoilerParts, setPartsManufacturers, updateBoilerManufacturers, updatePartsManufacturers } from '@/context/boilerParts';
import { $mode } from '@/context/mode';
import usePopup from '@/hooks/usePopup';
import styles from '@/styles/catalog/index.module.scss';
import skeletonStyles from '@/styles/skeleton/index.module.scss';
import { IBoilerPart, IBoilerParts } from '@/types/boilerparts';
import { IQueryParams } from '@/types/catalog';
import { checkQueryParams } from '@/utils/catalog';
import { useStore } from 'effector-react';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';

const CatalogPage = ({ query }: { query: IQueryParams }) => {

    const mode = useStore($mode)
    const boilerManufacturers = useStore($boilerManufacturers)
    const partsManufacturers = useStore($partsManufacturers)
    const filteredBoilerParts = useStore($filteredBoilerParts)
    const boilerParts = useStore($boilerParts)
    const [spinner, setSpinner] = useState(false)
    const pagesCount = Math.ceil((boilerParts.count || 0) / 20);
    const isValidOffset = query.offset && !isNaN(+query.offset) && +query.offset > 0
    const [currentPage, setCurrentPage] = useState(isValidOffset ? Math.max(+query.offset - 1, 0) : 0)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
    const router = useRouter()
    const [allItemsLowAndMaxPrice, setAllItemsLowAndMaxPrice] = useState<number[]>([0, 0]);
    const [isFilterInQuery, setIsFilterInQuery] = useState<boolean>(false);
    const [isPriceRangeChanged, setIsPriceRangeChanged] = useState<boolean>(false);
    const isAnyBoilerManufacturerChecked = boilerManufacturers.some((item) => item.checked)
    const isAnyPartsManufacturerChecked = partsManufacturers.some((item) => item.checked)
    const resetFilterBtnDisabled = !(isPriceRangeChanged || isAnyBoilerManufacturerChecked || isAnyPartsManufacturerChecked)
    const [maxPrice, setMaxPrice] = useState(0);
    const [maxPriceLoaded, setMaxPriceLoaded] = useState(false);

    useEffect(() => {
        loadBoilerParts()
    }, [filteredBoilerParts, isFilterInQuery])


    const { toggleOpen, open, closePopup } = usePopup()


    const maxPriceBoilerParts = async () => {
        try {
            const allPartsData = await getBoilerPartsFx('/boiler-parts/all');
            const allPrices = allPartsData.map((item: IBoilerPart) => item.price);
            setAllItemsLowAndMaxPrice([0, Math.max(...allPrices)]);
            setMaxPrice(Math.max(...allPrices))
            setTimeout(() => {
                setMaxPriceLoaded(true);
            }, 50);
        } catch (error) {
            toast.error((error as Error).message)
        }
    }

    const loadBoilerParts = async () => {
        try {
            setSpinner(true)
            const data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0')


            if (!isValidOffset) {
                router.replace({
                    query: {
                        offset: 1,
                    },
                })
                resetPagination(data)
                return
            }
            if (isValidOffset) {
                if (+query.offset > Math.ceil(data.count / 20)) {
                    router.push({
                        query: {
                            ...query,
                            offset: 1,
                        },
                    }, undefined, { shallow: true })
                    setCurrentPage(0)
                    setBoilerParts(isFilterInQuery ? filteredBoilerParts : data)
                    return
                }
                const offset = +query.offset - 1
                const result = await getBoilerPartsFx(
                    `/boiler-parts?limit=20&offset=${offset}`
                )

                setCurrentPage(offset)
                setBoilerParts(isFilterInQuery ? filteredBoilerParts : result)
                return
            }

            setCurrentPage(0)
            setBoilerParts(isFilterInQuery ? filteredBoilerParts : data)

        } catch (error) {
            toast.error((error as Error).message)
        }
        finally { setSpinner(false) }

    }

    const resetPagination = (data: IBoilerParts) => {
        setCurrentPage(0)
        setBoilerParts(data)
    }

    const handlePageChange = async ({ selected }: { selected: number }) => {
        try {
            setSpinner(true)
            const data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0')
            if (selected > pagesCount) {
                resetPagination(isFilterInQuery ? filteredBoilerParts : data)
            }
            if (isValidOffset && +query.offset > Math.ceil(data.count / 2)) {
                resetPagination(isFilterInQuery ? filteredBoilerParts : data)
                return
            }

            const { isValidBoilerQuery, isValidPartsQuery, isValidPriceQuery } = checkQueryParams(router)

            const result = await getBoilerPartsFx(
                `/boiler-parts?limit=20&offset=${selected}${isFilterInQuery && isValidBoilerQuery
                    ? `&boiler=${router.query.boiler}`
                    : ''
                }${isFilterInQuery && isValidPartsQuery
                    ? `&parts=${router.query.parts}`
                    : ''
                }${isFilterInQuery && isValidPriceQuery
                    ? `&priceFrom=${router.query.priceFrom}&priceTo=${router.query.priceTo}`
                    : ''
                }`
            )
            router.push({
                query: {
                    ...router.query,
                    offset: selected + 1
                },
            }, undefined, { shallow: true })
            setCurrentPage(selected)
            setBoilerParts(result)
        } catch (error) {
            toast.error((error as Error).message)
        }
        finally { setSpinner(false) }
    }

    const resetFilters = async () => {
        try {
            const data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0')
            const params = router.query

            delete params.boiler
            delete params.parts
            delete params.priceFrom
            delete params.priceTo
            params.first = 'cheap'

            router.push({ query: { ...params } }, undefined, { shallow: true })

            setBoilerManufacturers(
                boilerManufacturers.map((item) => ({ ...item, checked: false }))
            )

            setPartsManufacturers(
                partsManufacturers.map((item) => ({ ...item, checked: false }))
            )

            setBoilerParts(data)
            setAllItemsLowAndMaxPrice([0, maxPrice])
            setIsPriceRangeChanged(false)
        } catch (error) {
            toast.error((error as Error).message)
        }
    }





    const [isUrlVisible, setIsUrlVisible] = useState(true);

    const checkUrlVisibility = () => {
        setIsUrlVisible(!document.hidden);
    };

    useEffect(() => {
        // Добавляем обработчик события изменения видимости страницы (скрыто или активно)
        document.addEventListener("visibilitychange", checkUrlVisibility);

        // Очищаем обработчик события при размонтировании компонента
        return () => {
            document.removeEventListener("visibilitychange", checkUrlVisibility);
        };
    }, []);







    return (
        <section className={styles.catalog}>
            <div className={`container ${styles.catalog__container}`}>
                <h2 className={`${styles.catalog__title} ${darkModeClass}`}>Каталог товаров </h2>
                <div className={`${styles.catalog__top} ${darkModeClass}`} >
                    <AnimatePresence>
                        {isAnyBoilerManufacturerChecked &&
                            <ManufacturersBlock title={'Производитель котлов'} manufacturersList={boilerManufacturers} event={updateBoilerManufacturers} />
                        }
                    </AnimatePresence>
                    <AnimatePresence>
                        {isAnyPartsManufacturerChecked &&
                            <ManufacturersBlock title={'Производитель запчастей'} manufacturersList={partsManufacturers} event={updatePartsManufacturers} />
                        }
                    </AnimatePresence>
                    <div className={styles.catalog__top__inner}>
                        <button className={`${styles.catalog__top__reset} ${darkModeClass} `}
                            disabled={resetFilterBtnDisabled}
                            onClick={resetFilters}
                        >
                            Сбросить фильтр
                        </button>
                        <button className={styles.catalog__top__mobile_btn} onClick={toggleOpen}>
                            <span className={styles.catalog__top__mobile_btn__svg}><FilterSvg /></span>
                            <span className={styles.catalog__top__mobile_btn__text}>Фильтры</span>
                        </button>
                        <FilterSelect
                            setSpinner={setSpinner}
                        />
                    </div>
                </div>
                <div className={styles.catalog__bottom}>
                    <div className={styles.catalog__bottom__inner}>
                        <CatalogFilters
                            allItemsLowAndMaxPrice={allItemsLowAndMaxPrice}
                            setAllItemsLowAndMaxPrice={setAllItemsLowAndMaxPrice}
                            setIsPriceRangeChanged={setIsPriceRangeChanged}
                            maxPrice={maxPrice}
                            resetFilterBtnDisabled={resetFilterBtnDisabled}
                            resetFilters={resetFilters}
                            isPriceRangeChanged={isPriceRangeChanged}
                            currentPage={currentPage}
                            setIsFilterInQuery={setIsFilterInQuery}
                            maxPriceBoilerParts={maxPriceBoilerParts}
                            maxPriceLoaded={maxPriceLoaded}
                            setMaxPriceLoaded={setMaxPriceLoaded}
                            closePopup={closePopup}
                            filtersMobileOpen={open}
                        />
                        {spinner ? (
                            <ul className={skeletonStyles.skeleton}>
                                {Array.from(new Array(20)).map((_, i) => (
                                    <li key={i} className={`${skeletonStyles.skeleton__item} ${mode === "dark" ? `${styles.dark_mode}` : ''}`}>
                                        <div className={skeletonStyles.skeleton__item__light} />
                                    </li>))}
                            </ul>
                        ) : <ul className={styles.catalog__list}>
                            {boilerParts.rows?.length ? (
                                boilerParts.rows.map((item) => (<CatalogItem item={item} key={item.id} />)
                                )) : (
                                <span>Список товаров пуст...</span>
                            )}
                        </ul>}
                    </div>

                    <ReactPaginate containerClassName={styles.catalog__bottom__list}
                        pageClassName={styles.catalog__bottom__list__item}
                        pageLinkClassName={styles.catalog__bottom__list__item__link}
                        previousClassName={styles.catalog__bottom__list__prev}
                        nextClassName={styles.catalog__bottom__list__next}
                        breakLabel='...'
                        breakClassName={styles.catalog__bottom__list__break}
                        breakLinkClassName={`${styles.catalog__bottom__list__break__link} ${darkModeClass}`}
                        pageCount={pagesCount}
                        forcePage={Math.min(currentPage, pagesCount - 1)}
                        onPageChange={handlePageChange}
                    />

                </div>
            </div>
        </section >
    );
}

export default CatalogPage;