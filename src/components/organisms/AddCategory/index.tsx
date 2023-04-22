import { Button, Form, Input, Modal } from 'antd'
import { CategoriesState } from '../../State/categories'
import { Dayjs } from 'dayjs'
import { HexColorPicker } from 'react-colorful'
import { PlusOutlined } from '@ant-design/icons'
import { useSetRecoilState } from 'recoil'
import { v4 } from 'uuid'
import React, { useState } from 'react'
import css from './index.module.scss'

const offset = 7

type FormValues = {
  name: string
  amount: number
  category: { label: string; value: string }
  date: Dayjs
  color: string
}
export const AddCategory = () => {
  const [isAddModalOpen, setModalOpen] = useState(false)
  const setCategoriesState = useSetRecoilState(CategoriesState)
  const handleSubmit = (values: FormValues) => {
    setCategoriesState((prev) => [
      ...prev,
      {
        id: v4(),
        color: values.color,
        name: values.name,
        value: v4(),
      },
    ])
    setModalOpen(false)
  }

  return (
    <>
      <Button
        className={css.addConsumptionBtn}
        onClick={() => setModalOpen(true)}
        type="primary"
      >
        <PlusOutlined /> Добавить категорию
      </Button>
      <Modal
        destroyOnClose
        footer={null}
        onCancel={() => setModalOpen(false)}
        open={isAddModalOpen}
        title="Добавить категорию"
      >
        <Form<FormValues>
          className={css.form}
          labelCol={{ span: offset }}
          name="addCategory"
          onFinish={handleSubmit}
          wrapperCol={{ span: 14 }}
        >
          <Form.Item
            label="Название"
            name="name"
            rules={[{ required: true, message: 'Обязательное поле' }]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            label="Цвет"
            name="color"
            rules={[{ required: true, message: 'Обязательное поле' }]}
          >
            <HexColorPicker
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset, span: 16 }}>
            <Button
              htmlType="submit"
              style={{ marginRight: 16 }}
              type="primary"
            >
              Добавить
            </Button>
            <Button onClick={() => setModalOpen(false)}>Отмена</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
