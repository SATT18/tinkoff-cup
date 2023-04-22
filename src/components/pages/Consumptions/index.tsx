import { AddConsumption } from '../../organisms/AddСonsumption'
import { Button, DatePicker, Form, List, Modal, Select } from 'antd'
import { CategoriesOptions } from '../../State/categories'
import {
  ConsumptionsFilterState,
  ConsumptionsStateFiltered,
} from '../../State/сonsumptions'
import { FilterOutlined } from '@ant-design/icons'
import { formatAmount } from '../../../lib/formatAmount'
import { formatDate } from '../../../lib/formatDateToTimeDate'
import { useRecoilState, useRecoilValue } from 'recoil'
import MainTemplate from '../../templates/MainTemplate'
import React, { useMemo, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'

const { RangePicker } = DatePicker

type FilterValues = {
  category?: { label: string; value: string }
  date?: [Dayjs, Dayjs]
}
const Consumptions = () => {
  const consumptions = useRecoilValue(ConsumptionsStateFiltered)
  const [filtersState, setFilters] = useRecoilState(ConsumptionsFilterState)

  const categoriesOptions = useRecoilValue(CategoriesOptions)
  const targetOptions = useMemo(
    () => [{ label: 'Все', value: '' }, ...categoriesOptions],
    [categoriesOptions]
  )

  const handleFilterFinish = (values: FilterValues) => {
    const dateFrom = values.date?.[0]
    const dateTo = values.date?.[1]

    setFilters({
      category: values.category?.value,
      dateFrom: dateFrom ? dateFrom.toISOString() : undefined,
      dateTo: dateTo ? dateTo.toISOString() : undefined,
      sort: 'ASC',
      sortField: 'date',
    })

    setFiltersOpen(false)
  }
  const [isFiltersOpen, setFiltersOpen] = useState(false)

  return (
    <MainTemplate title="Ваши траты">
      <Button onClick={() => setFiltersOpen(true)}>
        <FilterOutlined /> Фильтры
      </Button>
      <Modal
        destroyOnClose
        footer={null}
        onCancel={() => setFiltersOpen(false)}
        open={isFiltersOpen}
        title="Фильтры"
      >
        <Form<FilterValues>
          initialValues={{
            category: targetOptions.find(
              (el) => el.value === filtersState.category
            ),
            date: [
              filtersState.dateFrom ? dayjs(filtersState.dateFrom) : undefined,
              filtersState.dateTo ? dayjs(filtersState.dateTo) : undefined,
            ],
          }}
          labelCol={{ span: 8 }}
          name="filter"
          onFinish={handleFilterFinish}
          wrapperCol={{ span: 14 }}
        >
          <Form.Item
            label="Категория"
            name="category"
            style={{
              minWidth: 250,
            }}
          >
            <Select labelInValue options={targetOptions} />
          </Form.Item>
          <Form.Item label="Период" name="date">
            <RangePicker />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button htmlType="submit" type="primary">
              Фильтровать
            </Button>
          </Form.Item>
        </Form>
      </Modal>
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
