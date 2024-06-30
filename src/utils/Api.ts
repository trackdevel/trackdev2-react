import {toast} from "react-toastify";
import {useParams} from "react-router-dom";

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

async function getData(response: Response, relativePath: string) {
    let data = null
    if (response.status !== 204) {
        data = await response.json()
    }
    if (!response.ok) {
        if (data.message && data.message !== "" && data.message !== " " && data.message !== "null") {
            let expludedRelativePath = ['/tasks/new/history','/tasks/new/comments']

            if(!expludedRelativePath.includes(relativePath)) {
                toast.error(data.message, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        }
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
    const response : Response = await fetch(apiBaseUrl + relativePath, options)
    return getData(response,relativePath)
}

export default Api
