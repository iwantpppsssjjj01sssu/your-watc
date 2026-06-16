import { ReactLenis, useLenis } from 'lenis/react'
import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

function ScrollResetRouter() {
  const lenis = useLenis()

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    let previousLocation = `${router.state.location.pathname}${router.state.location.search}${router.state.location.hash}`

    const scrollToTop = () => {
      lenis?.scrollTo(0, { immediate: true, force: true })
      window.scrollTo(0, 0)

      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }

    return router.subscribe((state) => {
      const nextLocation = `${state.location.pathname}${state.location.search}${state.location.hash}`

      if (nextLocation === previousLocation) {
        return
      }

      previousLocation = nextLocation

      // PUSH, REPLACE, POP 등 모든 라우터 이동 시 항상 최상단 강제 리셋
      scrollToTop()
      requestAnimationFrame(scrollToTop)
      setTimeout(scrollToTop, 20)
      setTimeout(scrollToTop, 50)
      setTimeout(scrollToTop, 100)
    })
  }, [lenis])

  return <RouterProvider router={router} />
}

function App() {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.9,
      }}
    >
      <ScrollResetRouter />
    </ReactLenis>
  )
}

export default App
