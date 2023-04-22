import { atom, selector } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

type Category = {
  name: string
  value: string
}
export const CategoriesState = atom<Category[]>({
  key: 'categories',
  default: [
    { name: 'Продукты', value: 'products' },
    { name: 'Здоровье', value: 'health' },
    { name: 'Товары для дома', value: 'home' },
    { name: 'Спорт', value: 'sport' },
    { name: 'Другое', value: 'other' },
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
