import { ROUTES, useTitle } from './routes'
import { Route, Routes as RouterRoutes } from 'react-router-dom'
import { useShowPermissions } from '../auth'
import Loader from '../../components/atoms/Loader'
import MainTemplate from '../../components/templates/MainTemplate'
import NotAllowed from '../../components/pages/NotAllowed'
import React, { Suspense, useMemo } from 'react'

export const Routes = () => {
  const { hasPrivileges, getRoutePrivileges } = useShowPermissions()
  useTitle()

  const elem = useMemo(
    () =>
      ROUTES.map((item) => {
        const Component = item.component

        return hasPrivileges(getRoutePrivileges(item)) ? (
          <Route key={item.id} element={<Component />} path={item.path} />
        ) : (
          <Route key={item.id} element={<NotAllowed />} path={item.path} />
        )
      }),
    [getRoutePrivileges, hasPrivileges]
  )

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
      <RouterRoutes>{elem}</RouterRoutes>
    </Suspense>
  )
}
