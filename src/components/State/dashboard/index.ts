import { atom, selector } from 'recoil'
import { CategoriesState } from '../categories'
import { ConsumptionsState, ConsumptionsStateFiltered } from '../сonsumptions'
import { formatDate } from '../../../lib/formatDateToTimeDate'
import dayjs from 'dayjs'

export const DashboardState = selector({
  key: 'dashboard',
  get: ({ get }) => {
    const categories = get(CategoriesState)
    const consumptions = get(ConsumptionsStateFiltered)
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

export const DashboardLineState = selector({
  key: 'dashboardLine',
  get: ({ get }) => {
    const consumptions = get(ConsumptionsState)

    const labels = []
    for (let i = 6; i >= 0; i -= 1) {
      labels.push(formatDate(dayjs().add(-i, 'day').toISOString()))
    }

    console.log('labels', labels)

    const data = labels.map((date) =>
      consumptions.reduce(
        (acc, el) =>
          date === formatDate(el.date) ? acc + Number(el.amount) : acc,
        0
      )
    )

    return {
      labels,
      datasets: [
        {
          fill: true,
          label: 'По всем категориям',
          data,
        },
      ],
    }
  },
})
