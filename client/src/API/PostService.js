import axios from "axios";
import {apiUrl} from "../utils/constants";

export default class PostService {
    static async getPostsByPage(pageNumber = 1) {
        return await axios.get(apiUrl + `post/page/${pageNumber}`);
    };

    static async createPost(title, userName) {
        return await axios.post(apiUrl + 'post/', {
            title: title,
            username: userName
        });
    };

    static async uploadPostPicture(id, picture) {
        const formData = new FormData();
        formData.append('picture', picture);
        return await axios.post(apiUrl + `post/${id}/picture`, formData);
    }

    static async deletePost(id) {
        return await axios.delete(apiUrl + `post/${id}`);
    }

    static async updatePost(id, title, likes, dislikes) {
        return await axios.put(apiUrl + `post/${id}`, {
            title: title,
            likes: likes,
            dislikes: dislikes
        });
    }

    static async filterPosts(keyWord) {
        return await axios.get(apiUrl + `post/search/${keyWord}`);
    }

    static async createComment(text, postId, userName) {
        return await axios.post(apiUrl + `comment`, {
            text: text,
            postId: postId,
            username: userName
        });
    }

    static async updateComment(id, text, likes, dislikes) {
        return await axios.put(apiUrl + `comment/${id}`, {
            text: text,
            likes: likes,
            dislikes: dislikes
        });
    }

    static async deleteComment(id) {
        return await axios.delete(apiUrl + `comment/${id}`);
    }
};