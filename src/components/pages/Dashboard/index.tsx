import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { DashboardState } from '../../State/dashboard'
import { Pie } from 'react-chartjs-2'
import { Typography } from 'antd'
import { useRecoilValue } from 'recoil'
import MainTemplate from '../../templates/MainTemplate'
import React from 'react'

ChartJS.register(ArcElement, Tooltip, Legend)

const Dashboard = () => {
  const dashBoardData = useRecoilValue(DashboardState)

  return (
    <MainTemplate title="Сводка">
      <Typography.Title level={2}>За все время</Typography.Title>
      <Pie data={dashBoardData} />
    </MainTemplate>
  )
}
export default Dashboard
