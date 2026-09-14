import {appendElements, createElement, showError, getIdFromUrl} from "../shared/helper.js";
import {getPostById, getCommentsByPostId} from "../shared/data.js";


const currentPostId = getIdFromUrl();

if (!currentPostId) {
    showError('postId not found');
} else {
    const container = createElement('div', '', {'class': 'container'});
    appendElements(document.body, container);

    const user = await getPostById(currentPostId);
    const comments = await getCommentsByPostId(currentPostId);

    renderPostDetails(user, container);
    renderCommentMainInfo(comments, container);
}


function renderPostDetails(userPost, container) {
    const {body, id, title, userId} = userPost;

    const article = createElement('article', '', {'class': 'user-block user-post-block'});
    appendElements(container, article);

    const postBody = createElement('li', body);
    const postId = createElement('li', id);
    const postTitle = createElement('li', title);
    const postUserId = createElement('li', userId);
    appendElements(article, postBody, postId, postTitle, postUserId);
}

function renderCommentMainInfo(userComments, container) {
    const wrapper = createElement('div', '',
        {'class': 'user-comments-wrapper'});
    appendElements(container, wrapper);

    for (const comment of userComments) {
        const {body, email, id, name, postId} = comment;
        const article = createElement('article', '', {'class': 'user-block user-details-block user-comment-block'});
        appendElements(wrapper, article);

        const commentBody = createElement('li', body);

        const commentId = createElement('li', id);

        const commentName = createElement('li', name);

        const commentEmailWrapper = createElement('li');
        const emailLink = createElement('a', email, {'href': `mailto:${email}`});

        const commentPostId = createElement('li', postId);

        appendElements(article, commentBody, commentId, commentName, commentEmailWrapper, commentPostId);
        appendElements(commentEmailWrapper, emailLink);
    }
}
