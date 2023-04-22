import { AddConsumption } from '../../organisms/AddСonsumption'
import { ConsumptionsState } from '../../State/сonsumptions'
import { List } from 'antd'
import { formatAmount } from '../../../lib/formatAmount'
import { formatDate } from '../../../lib/formatDateToTimeDate'
import { useRecoilValue } from 'recoil'
import MainTemplate from '../../templates/MainTemplate'
import React from 'react'

const Consumptions = () => {
  const consumptions = useRecoilValue(ConsumptionsState)

  return (
    <MainTemplate title="Ваши траты">
      <List
        dataSource={consumptions}
        itemLayout="horizontal"
        renderItem={(item, index) => (
          <List.Item key={item.id}>
            <List.Item.Meta description={item.category} title={item.name} />
            <div>{formatAmount(+item.amount)}</div>
            <div style={{ marginLeft: 8 }}>{formatDate(item.date)}</div>
          </List.Item>
        )}
      />
      <AddConsumption />
    </MainTemplate>
  )
}

export default Consumptions
