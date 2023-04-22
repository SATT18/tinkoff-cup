import { Radio, RadioChangeEvent, Typography } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import React, { FC } from 'react'
import css from './index.module.scss'

type Props = {
  children?: React.ReactNode
  title?: string
}
enum Tabs {
  History = 'HISTORY',
  Dashboard = 'DASHBOARD',
  Consumptions = 'CONSUMPTIONS',
}
const MainTemplate: FC<Props> = ({ children, title }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleModeChange = (e: RadioChangeEvent) => {
    navigate(`/${e.target.value.toLowerCase()}`)
  }

  return (
    <div className={css.container}>
      {title && <Typography.Title>{title}</Typography.Title>}
      <Radio.Group
        defaultValue={location.pathname.toUpperCase().replace('/', '')}
        onChange={handleModeChange}
        style={{ marginBottom: 8 }}
      >
        <Radio.Button value={Tabs.Dashboard}>Сводка</Radio.Button>
        <Radio.Button value={Tabs.Consumptions}>Операции</Radio.Button>
        {/*<Radio.Button value={Tabs.History}>История</Radio.Button>*/}
      </Radio.Group>
      {children}
    </div>
  )
}

export default MainTemplate
