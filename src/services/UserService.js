import axios from 'axios';

class UserService {
    getUsers() {
        return axios.get(`http://localhost:8080/users/`);
    }

    login(obj) {
        return axios.post(`http://localhost:8080/auth/login`, obj);
    }

    update(id, obj){
        console.log(obj);
        return axios.put(`http://localhost:8080/users/${id}`, obj);
    }

    getUserById(id){
        return axios.get(`http://localhost:8080/users/${id}`);
    }
}

// export object of this class
export default new UserService();