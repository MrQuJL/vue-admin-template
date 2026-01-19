import Layout from '@/layout'

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
        newRoute.component = () => import(`${newRoute.component}`)
      }
    }

    if (newRoute.children?.length) {
      newRoute.children = newRoute.children.map(processRoute)
    }

    return newRoute
  }

  return jsonRoutes.map(processRoute)
}
