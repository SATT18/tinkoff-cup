import { AccessRules } from '../auth'
import { FC, LazyExoticComponent, lazy, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const NotFound = lazy(() => import('../../components/pages/NotFound'))
const Main = lazy(() => import('../../components/pages/Main'))
const Dashboard = lazy(() => import('../../components/pages/Dashboard'))
const Consumptions = lazy(() => import('../../components/pages/Consumptions'))

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
    component: Main,
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
