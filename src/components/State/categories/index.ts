import { atom, selector } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

type Category = {
  id: string
  name: string
  value: string
}
export const CategoriesState = atom<Category[]>({
  key: 'categories',
  default: [
    { id: '1', name: 'Продукты', value: 'products' },
    { id: '2', name: 'Здоровье', value: 'health' },
    { id: '3', name: 'Товары для дома', value: 'home' },
    { id: '4', name: 'Спорт', value: 'sport' },
    { id: '5', name: 'Другое', value: 'other' },
  ],
  effects_UNSTABLE: [persistAtom],
})

export const CategoriesOptions = selector({
  key: 'consumptionsOptions',
  get: ({ get }) => {
    const categories = get(CategoriesState)

    return categories.map((el) => ({ value: el.value, label: el.name }))
  },
})

// const categoriesValues = categories.reduce(
//   (acc, el) => ({ ...acc, [el.value]: el.name }),
//   {}
// )
