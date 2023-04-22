import { atom, selector } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import { Category } from '../categories'
import dayjs from 'dayjs'

const { persistAtom } = recoilPersist()

type Consumption = {
  id: string
  name: string
  amount: number
  category: Category
  date: string
}

export const ConsumptionsState = atom<Consumption[]>({
  key: 'consumptions',
  default: [],
  effects_UNSTABLE: [persistAtom],
})

export type ConsumptionsFilter = {
  category?: string
  sortField: string
  sort: string
  dateFrom?: string
  dateTo?: string
}
export const ConsumptionsFilterState = atom<ConsumptionsFilter>({
  key: 'consumptionsFilter',
  default: {
    category: '',
    sortField: 'date',
    sort: 'DESC',
  },
  effects_UNSTABLE: [persistAtom],
})

export const ConsumptionsStateFiltered = selector({
  key: 'consumptionsFiltered',
  get: ({ get }) => {
    const consumptions = get(ConsumptionsState)
    const filters = get(ConsumptionsFilterState)

    let output = [...consumptions]

    // category filter
    if (filters.category) {
      output = output.filter((el) => el.category.id === filters.category)
    }

    // date filter
    if (filters.dateFrom) {
      output = output.filter((el) => dayjs(el.date) >= dayjs(filters.dateFrom))
    }
    if (filters.dateTo) {
      output = output.filter((el) => dayjs(el.date) <= dayjs(filters.dateTo))
    }

    // sorts
    if (filters.sort && filters.sortField) {
      if (filters.sortField === 'date' && filters.sort === 'ASC') {
        output.sort((a, b) => (dayjs(a.date) > dayjs(b.date) ? 1 : -1))
      }
      if (filters.sortField === 'date' && filters.sort === 'DESC') {
        output.sort((a, b) => (dayjs(a.date) < dayjs(b.date) ? 1 : -1))
      }
    }

    return output
  },
})
