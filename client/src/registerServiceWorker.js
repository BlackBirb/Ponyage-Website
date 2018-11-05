
function registerValidSW () {
  if ('serviceWorker' in navigator) {
    const swUrl = '/sw.js'
    navigator.serviceWorker.register(swUrl)
      .then(registration => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                console.log('[SW] New content available!')
              }
            }
          }
        }
      })
      .catch(err => {
        console.error('[SW] Registration error:', err)
      })
  }
}

function checkValidServiceWorker (swUrl) {
  fetch(swUrl)
    .then(response => {
      if (
        response.status === 404 ||
        response.headers.get('content-type').indexOf('javascript') === -1
      ) {
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload()
          })
        })
      } else {
        registerValidSW(swUrl)
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      )
    })
}

export default function register () {
  window.addEventListener('load', () => {
    const swUrl = '/service-worker.js'
    checkValidServiceWorker(swUrl)
  })
}

export function unregister () {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister()
    })
  }
}
