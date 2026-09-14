import {safeFetch} from "./helper.js";

const baseUrl = "https://jsonplaceholder.typicode.com";

async function getUsersData() {
    return await safeFetch(`${baseUrl}/users`);
}


async function getUserDataById(userId) {
    return await safeFetch(`${baseUrl}/users/${userId}`);
}

async function getPostsByUserId(userId) {
    return   await safeFetch(`${baseUrl}/users/${userId}/posts`);
}

async function getPostById(postId) {
    return  await safeFetch(`${baseUrl}/posts/${postId}`);
}

async function getCommentsByPostId(postId) {
    return  await safeFetch(`${baseUrl}/posts/${postId}/comments`);
}

export {getUserDataById, getPostsByUserId, getPostById, getCommentsByPostId, getUsersData};