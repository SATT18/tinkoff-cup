import { AddCategory } from '../../organisms/AddCategory'
import { CategoriesState } from '../../State/categories'
import { List } from 'antd'
import { useRecoilValue } from 'recoil'
import MainTemplate from '../../templates/MainTemplate'
import React from 'react'

const Consumptions = () => {
  const consumptions = useRecoilValue(CategoriesState)

  return (
    <MainTemplate title="Категории трат">
      <List
        dataSource={consumptions}
        itemLayout="horizontal"
        renderItem={(item) => (
          <List.Item key={item.id}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <div>{item.name}</div>
              <div
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: item.color,
                  borderRadius: '50%',
                }}
              />
            </div>
          </List.Item>
        )}
      />
      <AddCategory />
    </MainTemplate>
  )
}

export default Consumptions
