import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth
      const userAgent = navigator.userAgent.toLowerCase()
      const isMobileUserAgent = /mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
      
      // Consider it mobile if screen is small OR it's a mobile device
      return width < MOBILE_BREAKPOINT || (width < 1024 && isMobileUserAgent)
    }

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(checkMobile())
    }
    
    mql.addEventListener("change", onChange)
    setIsMobile(checkMobile())
    
    // Also listen for orientation changes on mobile devices
    window.addEventListener("orientationchange", onChange)
    
    return () => {
      mql.removeEventListener("change", onChange)
      window.removeEventListener("orientationchange", onChange)
    }
  }, [])

  return !!isMobile
}
