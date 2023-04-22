import { Button, DatePicker, Form, Input, Modal, Select } from 'antd'
import { CategoriesOptions } from '../../State/categories'
import { ConsumptionsState } from '../../State/сonsumptions'
import { Dayjs } from 'dayjs'
import { PlusOutlined } from '@ant-design/icons'
import { useRecoilValue, useSetRecoilState } from 'recoil'
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

  const categoriesOptions = useRecoilValue(CategoriesOptions)
  const setConsumptionsState = useSetRecoilState(ConsumptionsState)
  const handleSubmit = (values: FormValues) => {
    setConsumptionsState((prev) => [
      ...prev,
      {
        name: values.name,
        category: values.category.value,
        amount: values.amount,
        date: values.date.toISOString(),
      },
    ])
    setModalOpen(false)
  }

  return (
    <>
      <Button
        className={css.addConsumptionBtn}
        onClick={() => setModalOpen(true)}
        shape="circle"
        type="primary"
      >
        <PlusOutlined />
      </Button>
      <Modal
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
                (optionA.label ?? '')
                  .toLowerCase()
                  .localeCompare((optionB.label ?? '').toLowerCase())
              }
              options={categoriesOptions}
            />
          </Form.Item>
          <Form.Item label="Дата" name="date">
            <DatePicker />
          </Form.Item>
          <Form.Item wrapperCol={{ offset, span: 16 }}>
            <Button
              onClick={() => setModalOpen(false)}
              style={{ marginRight: 16 }}
            >
              Отмена
            </Button>
            <Button htmlType="submit" type="primary">
              Записать
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
