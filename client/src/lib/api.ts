import { apiRequest } from './queryClient'

export const authenticateWithGitHub = async code => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID
    const clientSecret = import.meta.env.VITE_GITHUB_CLIENT_SECRET
    const baseUrl = 'https://github.com/login/oauth/access_token'
    const url = `${baseUrl}?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`
    const encodedUrl = escape(url)
    
    // eslint-disable-next-line max-len
    // const response = await fetch(`https://github.com/login/oauth/access_token?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}&client_secret=${import.meta.env.VITE_GITHUB_CLIENT_SECRET}&code=${code}`, {
    const response = await fetch(`/api/proxy?url=${encodedUrl}`, { 
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
    })
    
    let error
    
    if (!response.ok) {
        error = new Error('Failed to authenticate with GitHub')
    }
    
    const data = await response.json()
    
    console.log('authenticateWithGitHub', { data, error })
    
    if (error) throw error
    
    return data.access_token
}

export const getCurrentUser = async token => {
    const response = await fetch('https://api.github.com/user', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    const data = await response.json()
    
    console.log('getCurrentUser', token, data)
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(data))
    
    return data
}

export const authenticateUser = async token => {
    
    const user = await getCurrentUser(token)
    
    console.log('authenticateUser', token, user)
    
    return apiRequest('POST', '/api/auth/github', {
        username: user.login,
        accessToken: token,
    })
}

export const fetchGists = async () => {
    
    return apiRequest('GET', '/api/gists')
    
}

export const fetchGist = async id => {
    
    return apiRequest('GET', `/api/gists/${id}`)
    
}
