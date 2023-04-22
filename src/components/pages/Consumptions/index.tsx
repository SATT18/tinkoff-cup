import { AddConsumption } from '../../organisms/AddСonsumption'
import { ConsumptionsState } from '../../State/сonsumptions'
import { List } from 'antd'
import { formatAmount } from '../../../lib/formatAmount'
import { formatDate } from '../../../lib/formatDateToTimeDate'
import { useRecoilValue } from 'recoil'
import MainTemplate from '../../templates/MainTemplate'
import React, { useMemo } from 'react'
import dayjs from 'dayjs'

const Consumptions = () => {
  const consumptions = useRecoilValue(ConsumptionsState)

  const data = useMemo(
    () =>
      [...consumptions].sort((a, b) =>
        dayjs(a.date) > dayjs(b.date) ? 1 : -1
      ),
    [consumptions]
  )

  return (
    <MainTemplate title="Ваши траты">
      <List
        dataSource={data}
        itemLayout="horizontal"
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
