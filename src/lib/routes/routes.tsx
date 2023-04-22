import { AccessRules } from '../auth'
import { Navigate, useLocation } from 'react-router-dom'
import React, { FC, LazyExoticComponent, lazy, useEffect } from 'react'
const NotFound = lazy(() => import('../../components/pages/NotFound'))
const Dashboard = lazy(() => import('../../components/pages/Dashboard'))
const Consumptions = lazy(() => import('../../components/pages/Consumptions'))
const Categories = lazy(() => import('../../components/pages/Categories'))

export type Routes = {
  /**
   * Уникальный id
   */
  id: string
  /**
   * Заголовок страницы, указывается если элемент должен отображаться в меню
   */
  title?: string
  /**
   * Часть URL которая подставляется в <Route />
   */
  path: string
  /**
   * Массив ролей необходимый для показа страницы
   */
  accessRules: AccessRules
  /**
   * Компонент страницы
   */
  component: LazyExoticComponent<FC> | FC
}

export const ROUTES: Routes[] = [
  {
    id: 'init',
    path: '/',
    title: 'Главная | Tinkoff',
    accessRules: { roles: [] },
    component: () => <Navigate to="/consumptions" />,
  },
  {
    id: 'dashboard',
    path: '/dashboard',
    title: 'Главная | Tinkoff',
    accessRules: { roles: [] },
    component: Dashboard,
  },
  {
    id: 'consumptions',
    path: '/consumptions',
    title: 'Главная | Tinkoff',
    accessRules: { roles: [] },
    component: Consumptions,
  },
  {
    id: 'categories',
    path: '/categories',
    title: 'Главная | Tinkoff',
    accessRules: { roles: [] },
    component: Categories,
  },
  {
    id: 'notFound',
    title: 'Не найдено | Tinkoff',
    path: '*',
    accessRules: { roles: [] },
    component: NotFound,
  },
]

const TITLES = ROUTES.reduce<Record<string, string>>(
  (acc, route) =>
    route.path && route.title
      ? {
          ...acc,
          [route.path]: route.title,
        }
      : acc,
  {}
)

const getTitle = (pathname: string) =>
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  TITLES[pathname] ?? 'Не найдено | Tinkoff'

export const useTitle = () => {
  const location = useLocation()
  useEffect(() => {
    document.title = getTitle(location.pathname)
  }, [location])
}
