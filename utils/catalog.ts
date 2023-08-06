import { getBoilerPartsFx } from "@/app/api/boilerParts";
import { setFilteredBoilerParts } from "@/context/boilerParts";
import { NextRouter } from "next/router";
import { getQueryParamOnFirstRender, idGenerator } from "./common";
import {updateCartItemFx} from "@/app/api/shopping-cart" 
import { updateCartItemTotalPrice } from "@/context/shopping-cart";

const createManufacturersCheckObj = (title : string) => ({ 
    title,
    checked: false,
    id: idGenerator(),
})



export const boilerManufacturers = [
    'Ariston',
    'Chaffoteux&Maury',
    'Baxi',
    'Bongioanni',
    'Saunier Duval',
    'Buderus',
    'Strategist',
    'Henry',
    'Northwest',
].map(createManufacturersCheckObj)

export const partsManufacturers = [
    'Azure',
    'Gloves',
    'Cambridgeshire',
    'Salmon',
    'Montana',
    'Sensor',
    'Lesly',
    'Radian',
    'Gasoline',
    'Croataia',
].map(createManufacturersCheckObj)

const checkPriceFromQuery = (price: number) => price && !isNaN(price) && price >= 0 && price <= 10000


export const checkQueryParams = (router : NextRouter) => {
    const priceFromQueryValue = getQueryParamOnFirstRender(
        'priceFrom',
        router
    ) as string
    const priceToQueryValue = getQueryParamOnFirstRender(
        'priceTo',
        router
    ) as string
    const boilerQueryValue = JSON.parse(decodeURIComponent(
        getQueryParamOnFirstRender(
            'boiler',
            router
        ) as string
    ))
    const partsQueryValue = JSON.parse(decodeURIComponent(
        getQueryParamOnFirstRender(
            'parts',
            router
        ) as string
    ))

    const isValidBoilerQuery = Array.isArray(boilerQueryValue) && !!boilerQueryValue?.length
    const isValidPartsQuery = Array.isArray(partsQueryValue) && !!partsQueryValue?.length
    const isValidPriceQuery = checkPriceFromQuery(+priceFromQueryValue) && checkPriceFromQuery(+priceToQueryValue)

    return {
        isValidBoilerQuery,
        isValidPartsQuery,
        isValidPriceQuery,
        priceFromQueryValue,
        priceToQueryValue,
        boilerQueryValue,
        partsQueryValue
    }
}

export const updateParamsAndFiltersFromQuery = async (callback: VoidFunction, path: string) => {
    callback()

    const data = await getBoilerPartsFx(
        `/boiler-parts?limit=20&offset=${path}`
    )
    setFilteredBoilerParts(data)
}

export async function updateParamsAndFilters<T>(
    updatedParams: T,
    path: string,
    router: NextRouter
) {
    const params = router.query

    delete params.boiler
    delete params.parts
    delete params.priceFrom
    delete params.priceTo

    router.push(
        {
            query: {
                ...params,
                ...updatedParams,
            },
        },
        undefined,
        { shallow: true }
    )

    const data = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=${path}`)

    setFilteredBoilerParts(data)
}

export const updateTotalPrice = async (total_price: number , partId: number) => {
const data = await updateCartItemFx({
    url: `/shopping-cart/total-price/${partId}`,
    payload: {total_price},
})

updateCartItemTotalPrice({partId, total_price: data.total_price})
}