const baseUrl = "https://jsonplaceholder.typicode.com";

async function getUsersData() {
    const res = await fetch(`${baseUrl}/users`);
    return await res.json();
}

async function getPostsByUserId(userId) {
    const res = await fetch(`${baseUrl}/users/${userId}/posts`);
    return await res.json();
}

async function getPostById(postId) {
    const res = await fetch(`${baseUrl}/posts/${postId}`);
    return await res.json();
}

async function getCommentsByPostId(postId) {
    const res = await fetch(`${baseUrl}/posts/${postId}/comments`);
    return await res.json();
}

export {getUsersData, getPostsByUserId, getPostById, getCommentsByPostId};