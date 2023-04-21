import React, { FC } from 'react'
import css from './index.module.scss'

type Props = {
  children?: React.ReactNode
}

const MainTemplate: FC<Props> = ({ children }) => (
  <div className={css.container}>{children}</div>
)

export default MainTemplate
