// GTM Event tracking utilities

export interface GTMEvent {
  event: string
  [key: string]: any
}

export function gtmPush(eventData: GTMEvent) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(eventData)
  }
}

// Predefined events for your portfolio
export const GTMEvents = {
  // Page views
  pageView: (page: string) => gtmPush({
    event: 'page_view',
    page_title: page,
    page_location: window.location.href
  }),

  // Project interactions
  projectView: (projectName: string) => gtmPush({
    event: 'project_view',
    project_name: projectName,
    content_type: 'project'
  }),

  projectDemo: (projectName: string, demoUrl: string) => gtmPush({
    event: 'demo_click',
    project_name: projectName,
    demo_url: demoUrl,
    link_type: 'demo'
  }),

  projectGithub: (projectName: string, githubUrl: string) => gtmPush({
    event: 'github_click',
    project_name: projectName,
    github_url: githubUrl,
    link_type: 'github'
  }),

  // Contact interactions
  emailClick: () => gtmPush({
    event: 'contact_click',
    contact_method: 'email'
  }),

  resumeDownload: () => gtmPush({
    event: 'resume_download',
    file_type: 'pdf'
  }),

  // Social media clicks
  socialClick: (platform: string, url: string) => gtmPush({
    event: 'social_click',
    social_platform: platform,
    social_url: url
  }),

  // Navigation
  navigationClick: (destination: string) => gtmPush({
    event: 'navigation_click',
    destination: destination
  }),

  // Search
  search: (searchTerm: string) => gtmPush({
    event: 'search',
    search_term: searchTerm
  }),

  // Engagement
  timeOnPage: (seconds: number, page: string) => gtmPush({
    event: 'engagement_time',
    time_seconds: seconds,
    page_name: page
  }),

  // Scroll tracking
  scrollDepth: (percentage: number, page: string) => gtmPush({
    event: 'scroll_depth',
    scroll_percentage: percentage,
    page_name: page
  }),

  // Form interactions (for contact forms)
  formStart: (formName: string) => gtmPush({
    event: 'form_start',
    form_name: formName
  }),

  formSubmit: (formName: string) => gtmPush({
    event: 'form_submit',
    form_name: formName
  }),

  // Error tracking
  error: (errorMessage: string, errorPage: string) => gtmPush({
    event: 'error',
    error_message: errorMessage,
    error_page: errorPage
  })
}

// React hook for GTM events
import { useEffect } from 'react'

export function useGTMPageView(page: string) {
  useEffect(() => {
    GTMEvents.pageView(page)
  }, [page])
}

export function useGTMScrollTracking(page: string) {
  useEffect(() => {
    let ticking = false

    const updateScrollDepth = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = Math.round((scrollTop / docHeight) * 100)

      // Track major scroll milestones
      if (scrollPercent >= 25 && !sessionStorage.getItem(`scroll_25_${page}`)) {
        GTMEvents.scrollDepth(25, page)
        sessionStorage.setItem(`scroll_25_${page}`, 'true')
      }
      if (scrollPercent >= 50 && !sessionStorage.getItem(`scroll_50_${page}`)) {
        GTMEvents.scrollDepth(50, page)
        sessionStorage.setItem(`scroll_50_${page}`, 'true')
      }
      if (scrollPercent >= 75 && !sessionStorage.getItem(`scroll_75_${page}`)) {
        GTMEvents.scrollDepth(75, page)
        sessionStorage.setItem(`scroll_75_${page}`, 'true')
      }
      if (scrollPercent >= 90 && !sessionStorage.getItem(`scroll_90_${page}`)) {
        GTMEvents.scrollDepth(90, page)
        sessionStorage.setItem(`scroll_90_${page}`, 'true')
      }

      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDepth)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [page])
}

// Time on page tracking
export function useGTMTimeTracking(page: string) {
  useEffect(() => {
    const startTime = Date.now()

    const trackTime = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000)
      GTMEvents.timeOnPage(timeSpent, page)
    }

    // Track time on page visibility change or unmount
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        trackTime()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      trackTime()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [page])
}