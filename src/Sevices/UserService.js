import { baseService } from "./BaseService";

class userService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super()
    }
    signUpService = (userModel) => {
        return this.post(userModel, 'signup')
    }
    signInService = (userModel) => {
        return this.post(userModel, 'signin')
    }
    getUser = () => {
        return this.get('getUser')
    }
    editUser = (userModel) => {
        return this.put(userModel, "editUser")
    }

    deleteUser = (id) => {
        return this.delete(id, 'deleteUser?=')
    }

}


export const UserService = new userService()