import { QueryClient } from '@tanstack/react-query'

const getToken = () => {
    // Replace this with your actual token retrieval logic
    return localStorage.getItem('token')
}

async function throwIfResNotOk(res) {
    if (!res.ok) {
        const text = (await res.text()) || res.statusText
        
        throw new Error(`${res.status}: ${text}`)
    }
}

/*export async function apiRequest(
    method: string,
    url: string,
    data?: unknown | undefined,
): Promise<Response> {*/
export async function apiRequest(
    method,
    url,
    data,
) {
    
    const token = getToken()
    
    if (!token?.length)
        console.warn('apiRequest: no token')
    else
        console.log('apiRequest', { method, url, data, token })
    
    const headers = {
        'Authorization': token ? `Bearer ${token}` : undefined,
    }
    
    if (data)
        headers['Content-Type'] = 'application/json'
    
    const res = await fetch(url, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
        credentials: 'include',
    })
    
    await throwIfResNotOk(res)
    return res
}

export const getQueryFn = options => {
    const { on401: unauthorizedBehavior } = options
    
    return async ({ queryKey }) => {
        const token = getToken()
        
        if (!token?.length)
            console.warn('getQueryFn: no token')
        else
            console.log('getQueryFn', { token })
        
        const res = await fetch(queryKey[0], {
            credentials: 'include',
            headers: {
                'Authorization': token ? `Bearer ${token}` : undefined,
            },
        })
        
        if (unauthorizedBehavior === 'returnNull' && res.status === 401) {
            return null
        }
        
        await throwIfResNotOk(res)
        return await res.json()
    }
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            queryFn: getQueryFn({ on401: 'throw' }),
            refetchInterval: false,
            refetchOnWindowFocus: false,
            staleTime: Infinity,
            retry: false,
        },
        mutations: {
            retry: false,
        },
    },
})
