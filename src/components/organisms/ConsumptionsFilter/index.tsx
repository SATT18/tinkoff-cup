import { Button, DatePicker, Form, Modal, Select } from 'antd'
import { CategoriesOptions } from '../../State/categories'
import { ConsumptionsFilterState } from '../../State/сonsumptions'
import { FilterOutlined } from '@ant-design/icons'
import { useRecoilState, useRecoilValue } from 'recoil'
import React, { useMemo, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'

const { RangePicker } = DatePicker

type FilterValues = {
  category?: { label: string; value: string }
  date?: [Dayjs, Dayjs]
}
export const ConsumptionsFilter = () => {
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
    <>
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
    </>
  )
}
