import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import { Category } from '../categories'
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
