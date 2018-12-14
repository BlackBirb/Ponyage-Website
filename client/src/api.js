/* eslint-disable no-unreachable */
/* eslint-disable quotes */
/*
function fakeRes (data, timeout = 100) {
  return new Promise(resolve => setTimeout(() => resolve(data), timeout))
}
*/

export function getPlayerCount () {
  return fetch('/api/playerCount')
    .then(res => res.json())
}

export function getArticles () {
  return fetch('/api/data/articles')
    .then(res => res.json())
}

export function getMainData () {
  return fetch('/api/data/main')
    .then(res => res.json())
}

export function register ({ username, password, token }) {
  return fetch('/api/user/register', {
    method: "POST",
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      l: username, p: password, rt: token
    })
  }).then(res =>
    res.json()
  ).then(data => {
    if (data.success)
      return { token: data.token, username }
    throw data.e
  })
}

export function login ({ username, password }) {
  return fetch('/api/user/login', {
    method: "POST",
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      l: username, p: password
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success)
        return { token: data.token, username: username }
      throw data.e
    })
}

export function loginWithToken ({ token }) {
  return fetch('/api/user/token', {
    method: "POST",
    headers: {
      'content-type': 'application/json',
      'authorization': token
    }
  })
    .then(res => res.json())
    .then(data => {
      if (!data.e)
        return { username: data.login, token: data.token }
      throw data.e
    })
}

export function addArticle (formData, token) {
  return fetch('/api/articles/add', {
    method: 'POST',
    headers: {
      'authorization': token
    },
    body: formData
  })
    .then(res => {
      if (!res.ok) // eslint-disable-next-line
        throw new Error('Something went wrong, call BlackBird >.-.<')
      return res.json()
    })
}

export function removeArticle (id, token) {
  return fetch('/api/articles/remove', {
    method: "DELETE",
    headers: {
      'content-type': 'application/json',
      authorization: token
    },
    body: JSON.stringify({
      id
    })
  })
    .then(res => {
      if (!res.ok)
        throw new Error('Something went wrong, call BlackBird >.-.<')
      return res.json()
    })
}

export function loadVersionData () {
  return fetch('/api/version/json', {
    method: 'GET'
  })
    .then(res => {
      if (!res.ok)
        throw new Error('Server responded with', res.status)
      return res.json()
    })
}

export function updateVersionData (data, token) {
  return fetch('/api/version', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: token
    },
    body: JSON.stringify(data)
  })
    .then(res => {
      if (!res.ok)
        throw new Error('Failed to upload new versions')
      return res.json()
    })
}
