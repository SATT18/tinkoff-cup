import { atom, selector } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export type Category = {
  id: string
  name: string
  value: string
  color: string
}
export const CategoriesState = atom<Category[]>({
  key: 'categories',
  default: [
    { id: '1', name: 'Продукты', value: 'products', color: '#ffdd2d' },
    { id: '2', name: 'Здоровье', value: 'health', color: '#fab619' },
    { id: '3', name: 'Товары для дома', value: 'home', color: '#f52222' },
    { id: '4', name: 'Спорт', value: 'sport', color: '#428bf9' },
    { id: '5', name: 'Другое', value: 'other', color: '#000000cc' },
  ],
  effects_UNSTABLE: [persistAtom],
})

export const CategoriesOptions = selector({
  key: 'consumptionsOptions',
  get: ({ get }) => {
    const categories = get(CategoriesState)

    return categories.map((el) => ({ value: el.id, label: el.name }))
  },
})
