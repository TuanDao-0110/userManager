import axios from "axios"
import { DOMAIN_CYBER_USER, TOKEN } from "../ultilities/SettingSystem"

export class baseService {
    post = (userModel, urlAPI) => {
        return axios({
            url: `${DOMAIN_CYBER_USER}${urlAPI}`,
            method: "POST",
            data: userModel,
        })
    }
    put = (userModel, urlAPI) => {
        return axios({
            url: `${DOMAIN_CYBER_USER}${urlAPI}`,
            data: userModel,
            method: 'PUT',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }

        })
    }
    get = (urlAPI) => {
        return axios({
            url: `${DOMAIN_CYBER_USER}${urlAPI}`,
            method: "GET",
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }
    delete = (id, urlAPI) => {
        return axios({
            url: `${DOMAIN_CYBER_USER}${urlAPI}${id}`,
            method: "delete",
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }
}