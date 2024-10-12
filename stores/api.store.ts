import { defineStore } from 'pinia'
import { Api } from '~/api/index'

const _navigateTo = (path: string) => {
  const route = useRoute()
  let interval = setInterval(async () => {
    if (route.path === path) {
      console.log(route.path)
      clearInterval(interval)
      return
    }
    await navigateTo(path)
  })
}

export const apiStore = defineStore('api', () => {
  let token = $ref<string | null | undefined>()
  // const useUserStore = userStore()
  const baseUrl = useRuntimeConfig().public.SERVERURL
  const api = new Api({
    baseUrl,
    // 请求拦截器
    customFetch: (input, init) => {
      const modifiedInit: RequestInit = {
        ...init,
        headers: {
          ...(init?.headers || {}),
          Authorization: token ?? '',
        },
      }
      return fetch(input as any, modifiedInit)
    },
    responseValidation: (response) => {
      if (!response.ok) {
        // 其它错误
        const errorMsg =
          typeof response.error === 'object' &&
          response.error !== null &&
          'msg' in response.error
            ? (response.error as { msg: string }).msg
            : '未知错误'
        return {
          isValid: false,
          error: errorMsg,
        }
      } else {
        return {
          isValid: true,
          error: '',
        }
      }
    },
  })

  const login = async (account: string, password: string) => {
    token = undefined
    // const { data } = await api.sysUser.loginCreate({ account, password })
    // if (data) {
    //   token = data.token
    //   localStorage.setItem('token', data.token)
    //   await useUserStore.updateMenuList()
    //   await useUserStore.updatePersonalInfo()
    //   navigateTo(searchFirstEnabled(useUserStore.menuList)?.route ?? '/')
    // }
    return token
  }

  const logout = () => {
    token = undefined
    // useUserStore.account = undefined
    // useUserStore.isSuperAdmin = undefined
    // localStorage.removeItem('token')
  }

  onBeforeMount(async () => {
    const route = useRoute()
    if (import.meta.client) {
      token = localStorage.getItem('token')
      if (!token) {
        _navigateTo('/login')
        return
      }
      // if (token && route.path !== '/login') {
      //   useUserStore.updateMenuList()
      // }
      // useUserStore.updatePersonalInfo()
    }
  })

  return $$({ token, api, login, logout })
})
