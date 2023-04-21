import { Routes } from './routes/routes'
import { useCallback, useMemo } from 'react'

enum RoleEnum {
  User = 'USER',
  Admin = 'ADMIN',
}
export const useRoles = () => {
  return {
    isAdmin: false,
  }
}

export type AccessRules = {
  roles: RoleEnum[]
  isLeadOnly?: boolean
} | null

export function useShowPermissions() {
  const token = {
    realm_access: {
      roles: [RoleEnum.User],
    },
  }
  const userPrivileges = useMemo(
    () => token?.realm_access.roles ?? [],
    [token?.realm_access.roles]
  )

  const getRoutePrivileges = useCallback(
    (route: Routes): AccessRules => route.accessRules,
    []
  )

  const hasPrivileges = useCallback(
    (accessRules: AccessRules) => {
      // вариант 0 - нет доступа
      if (accessRules === null) {
        return false
      }

      const { roles, isLeadOnly } = accessRules

      // вариант 1 - прав не нужно
      const invalidSingle = !roles
      const emptyList = Array.isArray(roles) && roles.length === 0
      if (invalidSingle || emptyList) {
        return true
      }

      // вариант 2 - прав у пользователя нет
      if (!userPrivileges) {
        return false
      }

      // вариант 3 - требуются несколько прав
      if (Array.isArray(roles)) {
        return roles.some((item: RoleEnum | RoleEnum[]) => {
          if (typeof item === 'string') {
            return userPrivileges.includes(item)
          }
          if (Array.isArray(item)) {
            return item.every((subItem) => userPrivileges.includes(subItem))
          }

          return false
        })
      }

      // вариант 4 - требуется конкретное право
      return userPrivileges.includes(roles)
    },
    [userPrivileges]
  )

  return useMemo(
    () => ({
      getRoutePrivileges,
      hasPrivileges,
    }),
    [getRoutePrivileges, hasPrivileges]
  )
}
