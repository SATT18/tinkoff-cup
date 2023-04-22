import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { ConsumptionsFilter } from '../../organisms/ConsumptionsFilter'
import { DashboardState } from '../../State/dashboard'
import { Doughnut } from 'react-chartjs-2'
import { TotalSpend } from '../../molecules/TotalSpend'
import { useRecoilValue } from 'recoil'
import MainTemplate from '../../templates/MainTemplate'
import React from 'react'

ChartJS.register(ArcElement, Tooltip, Legend)

const Dashboard = () => {
  const dashBoardData = useRecoilValue(DashboardState)

  return (
    <MainTemplate title="Сводка">
      <ConsumptionsFilter />
      <TotalSpend />

      <Doughnut data={dashBoardData} />
    </MainTemplate>
  )
}
export default Dashboard
