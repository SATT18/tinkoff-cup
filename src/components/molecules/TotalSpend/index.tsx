import { ConsumptionsFiltersSpend } from '../../State/сonsumptions'
import { Typography } from 'antd'
import { useRecoilValue } from 'recoil'
import React from 'react'

export const TotalSpend = () => {
  const total = useRecoilValue(ConsumptionsFiltersSpend)

  return (
    <div>
      <Typography.Title level={3}>Потрчено: {total} ₽</Typography.Title>
    </div>
  )
}
