import { IBoilerParts } from "@/types/boilerparts";
import { IFilterCheackboxItem } from "@/types/catalog";
import { boilerManufacturers, partsManufacturers } from "@/utils/catalog";
import { createDomain } from "effector";

const boilerParts = createDomain()
export const setBoilerParts = boilerParts.createEvent<IBoilerParts>()

export const setBoilerPartsExpensiveFirst = boilerParts.createEvent()
export const setBoilerPartsCheapFirst = boilerParts.createEvent()
export const setBoilerPartsByPopularity = boilerParts.createEvent()
export const setFilteredBoilerParts = boilerParts.createEvent()
export const setBoilerManufacturers = boilerParts.createEvent<IFilterCheackboxItem[]>()
export const updateBoilerManufacturers = boilerParts.createEvent<IFilterCheackboxItem>()
export const setPartsManufacturers = boilerParts.createEvent<IFilterCheackboxItem[]>()
export const updatePartsManufacturers = boilerParts.createEvent<IFilterCheackboxItem>()
export const setBoilerManufacturersFromQuery = boilerParts.createEvent<string[]>()
export const setPartsManufacturersFromQuery = boilerParts.createEvent<string[]>()

const updateManufacturer = (manufacturers : IFilterCheackboxItem[], id : string , payload: Partial<IFilterCheackboxItem>) =>
manufacturers.map((item) =>{
  if(item.id === id){
    return{
      ...item,
      ...payload,
    }
  } 
  return item
})
const updateManufacturerFromQuery = (manufacturers : IFilterCheackboxItem[] , manufacturersFromQuery: string[]) =>
manufacturers.map((item) => {
  if(manufacturersFromQuery.find((title) => title === item.title)){
    return{
      ...item,
      checked: true,
    }
  } 
  return item
})

export const $boilerParts = boilerParts
  .createStore<IBoilerParts>({} as IBoilerParts)
  .on(setBoilerParts, (_, parts) => parts)
  .on(setBoilerPartsCheapFirst, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => a.price - b.price),
  }))
  .on(setBoilerPartsExpensiveFirst, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => b.price - a.price),
  }))
  .on(setBoilerPartsByPopularity, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => b.popularity - a.popularity),
  }))
export const $boilerManufacturers = boilerParts
  .createStore<IFilterCheackboxItem[]>(boilerManufacturers as IFilterCheackboxItem[])
  .on(setBoilerManufacturers, (_, parts) => parts)
  .on(updateBoilerManufacturers, (state , payload) =>[
...updateManufacturer(state , payload.id as string , {checked: payload.checked}),
  ])
  .on(setBoilerManufacturersFromQuery, (state, manufacturersFromQuery) => [...updateManufacturerFromQuery(state , manufacturersFromQuery),])
export const $partsManufacturers = boilerParts
  .createStore<IFilterCheackboxItem[]>(partsManufacturers as IFilterCheackboxItem[])
  .on(setPartsManufacturers, (_, parts) => parts)
  .on(updatePartsManufacturers, (state , payload) =>[
    ...updateManufacturer(state , payload.id as string , {checked: payload.checked}),
      ])
  .on(setPartsManufacturersFromQuery, (state, manufacturersFromQuery) => [...updateManufacturerFromQuery(state , manufacturersFromQuery),])

      
export const $filteredBoilerParts = boilerParts
.createStore<IBoilerParts>({} as IBoilerParts)
.on(setFilteredBoilerParts , (_, parts) => parts)
