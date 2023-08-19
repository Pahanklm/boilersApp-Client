import { Event } from "effector-next"
interface ICatalogBaseTypes {
  allItemsLowAndMaxPrice: number[]
  setAllItemsLowAndMaxPrice: (arg0: number[]) => void
    setIsPriceRangeChanged: (arg0: boolean) => void
  }
  interface ICatalogFiltersBaseTypes {
    resetFilterBtnDisabled: boolean
    resetFilters: VoidFunction
  }

export interface IManufacturersBlockProps{
    title: string
    manufacturersList: IFilterCheackboxItem[]
    event: Event<IFilterCheackboxItem>
}

export interface IManufacturersBlockItemProps{
    item: IFilterCheackboxItem
    event: Event<IFilterCheackboxItem>
}

export interface IQueryParams{
    offset: string
    first : string
    boiler : string
    parts: string
    priceFrom: string
    priceTo: string
    partId: string
}

export interface IFilterCheackboxItem{
    title: string
    checked: boolean
    id?: string
    event: Event<IFilterCheackboxItem>
}

export interface IFilterManufacturerAccordionProps{
    manufacturersList: IFilterCheackboxItem[]
    title: string | false 
    setManufacturer: Event<IFilterCheackboxItem[]>
    updateManufacturer: Event<IFilterCheackboxItem> 
}




export interface ICatalogFiltersProps{
    resetFilterBtnDisabled: boolean
    resetFilters: VoidFunction
    isPriceRangeChanged: boolean
    currentPage: number
    setIsFilterInQuery: (arg0: boolean) => void
    allItemsLowAndMaxPrice: number[];
    setAllItemsLowAndMaxPrice: (arg0: number[])=> void;
    setIsPriceRangeChanged:(arg0: boolean) => void
    maxPrice: number
    maxPriceBoilerParts: VoidFunction
    maxPriceLoaded: boolean
    setMaxPriceLoaded : (arg0: boolean) => void
    closePopup: VoidFunction
    filtersMobileOpen: boolean
}

export interface ICatalogFiltersDesktopProps{
    resetFilters: VoidFunction
    resetFilterBtnDisabled: boolean
    maxPrice: number
    allItemsLowAndMaxPrice: number[]
    setAllItemsLowAndMaxPrice: (arg0: number[])=> void;
    setIsPriceRangeChanged:(arg0: boolean) => void
    spinner:boolean
    applyFilters : VoidFunction
}

  export interface ICatalogFilterMobileProps
  extends ICatalogBaseTypes,
    ICatalogFiltersBaseTypes {
  spinner: boolean
  applyFilters: VoidFunction
  closePopup: VoidFunction
  filtersMobileOpen: boolean
  maxPrice: number
}
  export interface IFiltersPopupTop{
    resetBtnText: string
    title: string
    resetFilters: VoidFunction
    resetFilterBtnDisabled: boolean
    closePopup: VoidFunction
}
export interface IFiltersPopupProps extends IFilterManufacturerAccordionProps{
    resetFilterBtnDisabled: boolean
    resetAllManufacturers: VoidFunction 
    handleClosePopup: VoidFunction
    openPopup: boolean
    applyFilters: VoidFunction
}

export interface IPriceLowAndMax{
  allItemsLowAndMaxPrice: number[]
  setAllItemsLowAndMaxPrice: (arg0: number[])=> void
  setIsPriceRangeChanged:(arg0: boolean) => void
  maxPrice: number
} 