import { Button, DatePicker, Form, Input, Modal, Select } from 'antd'
import { CategoriesOptions, CategoriesState } from '../../State/categories'
import { ConsumptionsState } from '../../State/сonsumptions'
import { Dayjs } from 'dayjs'
import { PlusOutlined } from '@ant-design/icons'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { v4 } from 'uuid'
import React, { useState } from 'react'
import css from './index.module.scss'

const offset = 7

type FormValues = {
  name: string
  amount: number
  category: { label: string; value: string }
  date: Dayjs
}
export const AddConsumption = () => {
  const [isAddModalOpen, setModalOpen] = useState(false)

  const categories = useRecoilValue(CategoriesState)
  const categoriesOptions = useRecoilValue(CategoriesOptions)
  const setConsumptionsState = useSetRecoilState(ConsumptionsState)
  const handleSubmit = (values: FormValues) => {
    setConsumptionsState((prev) => {
      const category = categories.find((el) => el.id === values.category.value)

      return category
        ? [
            ...prev,
            {
              id: v4(),
              name: values.name,
              category,
              amount: values.amount,
              date: values.date.toISOString(),
            },
          ]
        : prev
    })
    setModalOpen(false)
  }

  return (
    <>
      <Button
        className={css.addConsumptionBtn}
        onClick={() => setModalOpen(true)}
        type="primary"
      >
        <PlusOutlined /> Добавть расход
      </Button>
      <Modal
        destroyOnClose
        footer={null}
        onCancel={() => setModalOpen(false)}
        open={isAddModalOpen}
        title="Добавить расход"
      >
        <Form<FormValues>
          className={css.form}
          labelCol={{ span: offset }}
          name="addСonsumption"
          onFinish={handleSubmit}
          wrapperCol={{ span: 14 }}
        >
          <Form.Item label="Название расхода" name="name">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Сумма" name="amount">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Категория" name="category">
            <Select
              labelInValue
              filterOption={(input, option) =>
                (option?.label ?? '').includes(input)
              }
              filterSort={(optionA, optionB) =>
                optionA.label
                  .toLowerCase()
                  .localeCompare(optionB.label.toLowerCase())
              }
              options={categoriesOptions}
            />
          </Form.Item>
          <Form.Item label="Дата" name="date">
            <DatePicker />
          </Form.Item>
          <Form.Item wrapperCol={{ offset, span: 16 }}>
            <Button
              htmlType="submit"
              style={{ marginRight: 16 }}
              type="primary"
            >
              Записать
            </Button>
            <Button onClick={() => setModalOpen(false)}>Отмена</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
