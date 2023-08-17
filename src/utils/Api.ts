
const apiBaseUrl = 'https://localhost:8080'
const requiresCors = true

const  Api = {
    get: async function(relativePath: any) {
        return send('GET', relativePath, null)
    },
    post: async function post(relativePath: string, requestBody: any) {
        return send('POST', relativePath, requestBody)
    },
    put (relativePath: string, requestBody: any) {
        return send('PUT', relativePath, requestBody)
    },
    delete(relativePath: string) {
        return send('DELETE', relativePath,null)
    },
    patch(relativePath: string, requestBody: any) {
        return send('PATCH', relativePath, requestBody)
    }
}

async function getData(response: { status: number; json: () => any; ok: any }) {
    let data = null
    if (response.status !== 204) {
        data = await response.json()
    }
    if (!response.ok) {
        throw {status: response.status, details: data}
    }
    return data
}

async function send(method: any, relativePath: string, requestBody: any) {
    let options : RequestInit = {}
    if(requiresCors) {
        options.credentials = 'include'
    }
    options.method = method
    if(requestBody) {
        options.headers = {
            'Content-Type': 'application/json',
        }
        options.body = JSON.stringify(requestBody)
        //options.mode = 'no-cors'
    }
    const response = await fetch(apiBaseUrl + relativePath, options)
    return getData(response)
}

export default Api
