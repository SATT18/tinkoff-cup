import { AddConsumption } from '../../organisms/AddСonsumption'
import { ConsumptionsFilter } from '../../organisms/ConsumptionsFilter'
import { ConsumptionsStateFiltered } from '../../State/сonsumptions'
import { List } from 'antd'
import { TotalSpend } from '../../molecules/TotalSpend'
import { formatAmount } from '../../../lib/formatAmount'
import { formatDate } from '../../../lib/formatDateToTimeDate'
import { useRecoilValue } from 'recoil'
import MainTemplate from '../../templates/MainTemplate'
import React from 'react'

const Consumptions = () => {
  const consumptions = useRecoilValue(ConsumptionsStateFiltered)

  return (
    <MainTemplate title="Ваши траты">
      <ConsumptionsFilter />
      <TotalSpend />

      <List
        dataSource={consumptions}
        renderItem={(item, index) => (
          <List.Item key={item.id}>
            <List.Item.Meta
              description={item.category.name}
              title={item.name}
            />
            <div>{formatAmount(+item.amount)} ₽</div>
            <div style={{ marginLeft: 16 }}>{formatDate(item.date)}</div>
          </List.Item>
        )}
      />
      <AddConsumption />
    </MainTemplate>
  )
}

export default Consumptions
