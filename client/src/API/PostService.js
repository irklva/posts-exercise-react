import axios from "axios";
import {apiUrl} from "../utils/constants";

export default class PostService {
    static async getByPages(pageNumber = 1) {
        return await axios.get(apiUrl + `post/page/${pageNumber}`);
    };

    static async create(title, userName) {
        return await axios.post(apiUrl + 'post/', {
            title: title,
            username: userName
        });
    };

    static async delete(id) {
        return await axios.delete(apiUrl + `post/${id}`);
    }

    static async update(id, title, likes, dislikes) {
        return await axios.put(apiUrl + `post/${id}`, {
            title: title,
            likes: likes,
            dislikes: dislikes
        });
    }
};