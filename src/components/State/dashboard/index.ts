import { selector } from 'recoil'
import { CategoriesState } from '../categories'
import { ConsumptionsState } from '../сonsumptions'

export const DashboardState = selector({
  key: 'dashboard',
  get: ({ get }) => {
    const categories = get(CategoriesState)
    const consumptions = get(ConsumptionsState)
    const spendByCategories = categories.map((category) => {
      return consumptions.reduce(
        (acc, consumption) =>
          consumption.category.id === category.id
            ? acc + Number(consumption.amount)
            : acc,
        0
      )
    })

    return {
      labels: categories.map((cat) => cat.name),
      datasets: [
        {
          label: 'Потрачено',
          data: spendByCategories,
          backgroundColor: categories.map((cat) => cat.color),
          borderWidth: 1,
        },
      ],
    }
  },
})
