import { AddCategory } from '../../organisms/AddCategory'
import { CategoriesState } from '../../State/categories'
import { List } from 'antd'
import { useRecoilValue } from 'recoil'
import MainTemplate from '../../templates/MainTemplate'
import React from 'react'

const Consumptions = () => {
  const consumptions = useRecoilValue(CategoriesState)

  return (
    <MainTemplate title="Катаегории трат">
      <List
        dataSource={consumptions}
        itemLayout="horizontal"
        renderItem={(item) => <List.Item key={item.id}>{item.name}</List.Item>}
      />
      <AddCategory />
    </MainTemplate>
  )
}

export default Consumptions
