import { ROUTES, useTitle } from './routes'
import { useRoutes } from 'react-router-dom'
import { useShowPermissions } from '../auth'
import Loader from '../../components/atoms/Loader'
import MainTemplate from '../../components/templates/MainTemplate'
import NotAllowed from '../../components/pages/NotAllowed'
import React, { Suspense, useMemo } from 'react'

export const Routes = () => {
  const { hasPrivileges, getRoutePrivileges } = useShowPermissions()
  useTitle()

  const allowRoutes = useMemo(
    () =>
      ROUTES.map((item) => {
        if (!hasPrivileges(getRoutePrivileges(item))) {
          item.element = <NotAllowed />
        }
        return item
      }),

    [getRoutePrivileges, hasPrivileges]
  )
  const elem = useRoutes(allowRoutes)

  return (
    <Suspense
      fallback={
        <MainTemplate>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh',
            }}
          >
            <Loader />
          </div>
        </MainTemplate>
      }
    >
      {elem}
    </Suspense>
  )
}
