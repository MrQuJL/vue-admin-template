import { constantRoutes } from '@/router'
import Layout from '@/layout'
import { routeMap } from '@/router/index'

/**
 * 将JSON路由配置转换为Vue2路由对象数组（包含Layout组件处理）
 * @param {Array} jsonRoutes - JSON格式的路由配置数组
 * @returns {Array} Vue2路由对象数组
 */
export function convertJsonToVueRoutes(jsonRoutes) {
  function processRoute(route) {
    const newRoute = { ...route }

    if (newRoute.component) {
      if (newRoute.component === 'Layout') {
        newRoute.component = Layout
      } else {
        newRoute.component = routeMap[newRoute.component]
      }
    }

    if (newRoute.children?.length) {
      newRoute.children = newRoute.children.map(processRoute)
    }

    return newRoute
  }

  return jsonRoutes.map(processRoute)
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, menus) {
    return new Promise(resolve => {
      const accessedRoutes = convertJsonToVueRoutes(menus)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
