import { AddConsumption } from '../../organisms/AddСonsumption'
import { ConsumptionsState } from '../../State/сonsumptions'
import { List } from 'antd'
import { useRecoilValue } from 'recoil'
import MainTemplate from '../../templates/MainTemplate'
import React from 'react'

const Consumptions = () => {
  const consumptions = useRecoilValue(ConsumptionsState)
  console.log(consumptions)

  return (
    <MainTemplate title="Ваши траты">
      <List
        dataSource={consumptions}
        itemLayout="horizontal"
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta description={item.category} title={item.name} />
            <div>{item.amount}</div>
            <div>{item.date}</div>
          </List.Item>
        )}
      />
      <AddConsumption />
    </MainTemplate>
  )
}

export default Consumptions
