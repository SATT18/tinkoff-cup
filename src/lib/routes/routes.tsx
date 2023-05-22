import { AccessRules } from '../auth'
import { RouteObject } from 'react-router'
import { useLocation } from 'react-router-dom'
import Categories from '../../components/pages/Categories'
import Consumptions from '../../components/pages/Consumptions'
import Dashboard from '../../components/pages/Dashboard'
import NotFound from '../../components/pages/NotFound'
import React, { useEffect } from 'react'

export type Routes = {
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
}

export const ROUTES: Array<RouteObject & Routes> = [
  {
    id: 'init',
    path: '/',
    title: 'Главная | Tinkoff',
    accessRules: { roles: [] },
    element: <Consumptions />,
  },
  {
    id: 'dashboard',
    path: '/dashboard',
    title: 'Главная | Tinkoff',
    accessRules: { roles: [] },
    element: <Dashboard />,
  },
  {
    id: 'consumptions',
    path: '/consumptions',
    title: 'Главная | Tinkoff',
    accessRules: { roles: [] },
    element: <Consumptions />,
  },
  {
    id: 'categories',
    path: '/categories',
    title: 'Главная | Tinkoff',
    accessRules: { roles: [] },
    element: <Categories />,
  },
  {
    id: 'notFound',
    title: 'Не найдено | Tinkoff',
    path: '*',
    accessRules: { roles: [] },
    element: <NotFound />,
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
