import axios, {AxiosResponse} from "axios";
import {CommonResponse_T} from "./tdlApi";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': '5c9db236-bce8-43d4-9dbe-11cf80cb43d0'
    }
})

export const authAPI = {
    login(data: LoginData_T) {
        return instance.post<CommonResponse_T<{userId: number}>>(`/auth/login`, data)
    },
    whoAmI() {
        return instance.get<CommonResponse_T<WhoAmI_DataResponse_T>>(`/auth/me`)
    },
    logout() {
        return instance.delete<CommonResponse_T<{}>>(`/auth/login`)
    }
}

type WhoAmI_DataResponse_T = {
    id: number
    email: string
    login: string
}

export type LoginData_T = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: boolean
}



