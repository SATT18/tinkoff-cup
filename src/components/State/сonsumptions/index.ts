import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()

type Consumption = {
  name: string
  amount: number
  category: string
  date: string
}

export const ConsumptionsState = atom<Consumption[]>({
  key: 'consumptions',
  default: [],
  effects_UNSTABLE: [persistAtom],
})
