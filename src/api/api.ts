import axios from "axios";
import { PhotosType, ProfileType, UserType } from "../types/types";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
    "API-KEY": "9e060643-2e44-44cb-b250-e7bbf4bf8732"
}
});


export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptha {
    CapthaIsRequired = 10
}

type APIResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}

type AuthResponseDataType = {
    id: number 
    email: string
    login: string 
}

type LoginResponseDataType = {
    userId: number
}


// type GetAuthResponseType = {
//     data: {id: number, email: string, login: string }
//     resultCode: ResultCodeEnum
//     messages: Array<string>
// } 

// type LoginResponseType = {
//     data: {userId: number}
//     resultCode: ResultCodeEnum | ResultCodeForCaptha
//     messages: Array<string>
// }

type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

type SavePhotoResponseDataType = {
    photos: PhotosType
}

type GetCapthaUrlResponceType = {
    url: string
}

export const API = {
    getUsers(currentPage: number, pageSize: number)  {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
         .then(response => {
             return response.data;
         });
     },

    getAuth() {
        return instance.get<APIResponseType<AuthResponseDataType>>(`auth/me`)
        .then(response => {
            return response.data;
        });
     },
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`)
        .then(response => {
            return response.data;
        }); // get profile reducer
        },

    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
        .then(response => {
            return response.data;
        });
    },
    follow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`)
        .then(response => {
            return response.data;
        });
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId)
        .then(response => {
            return response.data;
        });
    },
    updateStatus(status: string) {
        return instance.put<APIResponseType<ResultCodeEnum>>(`profile/status`, {status: status})
        .then(response => {
            return response.data;
        });
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<APIResponseType<LoginResponseDataType, ResultCodeForCaptha | ResultCodeEnum>>(`auth/login`, {email, password, rememberMe, captcha})
        .then(response => {
            return response.data;
        });
    },
    logout() {
        return instance.delete(`auth/login`);
    },
    savePhoto(photoFile: File) {
        const formData = new FormData();
        formData.append("image", photoFile);

        return instance.put<APIResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            return response.data;
        });
    },
    saveProfile(profile: ProfileType) {
        return instance.put<APIResponseType>(`profile`, profile)
        .then(response => {
            return response.data;
        });
    },
    getCaptchaUrl() { 
        return instance.get<GetCapthaUrlResponceType>(`security/get-captcha-url`)
        .then(response => {
            return response.data;
        });
    }  

}




// export const follow = {
//     unfollow(u.id) {
//         return instance.delete(`follow/${u.id}`)
//         .then(response => {
//             return response.data;
//         })
//     }
// }