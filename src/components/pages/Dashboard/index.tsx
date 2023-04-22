import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { ConsumptionsFilter } from '../../organisms/ConsumptionsFilter'
import { DashboardLineState, DashboardState } from '../../State/dashboard'
import { Doughnut, Line } from 'react-chartjs-2'
import { TotalSpend } from '../../molecules/TotalSpend'
import { Typography } from 'antd'
import { useRecoilValue } from 'recoil'
import MainTemplate from '../../templates/MainTemplate'
import React from 'react'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
)

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
    },
  },
}
const Dashboard = () => {
  const dashBoardData = useRecoilValue(DashboardState)

  const weekSpent = useRecoilValue(DashboardLineState)
  return (
    <MainTemplate title="Сводка">
      <ConsumptionsFilter />
      <TotalSpend />

      <Doughnut data={dashBoardData} />
      <Typography.Title level={3}> Траты за неделю </Typography.Title>
      <Line data={weekSpent} options={options} />
    </MainTemplate>
  )
}
export default Dashboard
