import store from '@/store'

// const { body } = document
// const WIDTH = 992 // refer to Bootstrap's responsive design

export default {
  watch: {
    $route(route) {
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.dispatch('app/closeSideBar', { withoutAnimation: false })
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  mounted() {
    const isMobile = this.$_isMobile()
    const isTablet = this.$_isTablet()
    if (isMobile) {
      store.dispatch('app/toggleDevice', 'mobile')
      store.dispatch('app/closeSideBar', { withoutAnimation: true })
    } else if (isTablet) {
      store.dispatch('app/toggleDevice', 'tablet')
      store.dispatch('app/closeSideBar', { withoutAnimation: true })
    }
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_isMobile() {
      // const rect = body.getBoundingClientRect()
      // return rect.width - 1 < WIDTH
      return window.innerWidth < 768 // 直接使用视口宽度
    },
    $_isTablet() {
      const width = window.innerWidth;
      return width >= 768 && width <= 1024;
    },
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        const isTablet = this.$_isTablet()
        store.dispatch('app/toggleDevice', isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop')

        if (isMobile || isTablet) {
          store.dispatch('app/closeSideBar', { withoutAnimation: true })
        }
      }
    }
  }
}
