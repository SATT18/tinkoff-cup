import { Button } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import css from './index.module.scss'

const NotAllowed = () => {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className={css.container}>
      <h3>403</h3>
      <span className={css.text}>Недостаточно прав доступа</span>
      <div className={css.actions}>
        <Button onClick={goBack} size="middle">
          Назад
        </Button>
        <Button>
          <LogoutOutlined />
        </Button>
      </div>
    </div>
  )
}

export default NotAllowed
