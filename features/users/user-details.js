import {createElement, appendElements, setInnerText, showError, getIdFromUrl} from "../shared/helper.js";
import {getUserDataById, getPostsByUserId} from "../shared/data.js";

const currentUserId = getIdFromUrl();

if (!currentUserId) {
    showError('userId not found');
} else {
    const currentUser = await getUserDataById(currentUserId);

    if (!currentUser || !currentUser.id) {
        showError('userId not found');
    } else {
        createUserDetailsBlock(currentUser);
    }
}

function renderObjectList(parent, obj, title = '') {
    if (!obj || typeof obj !== 'object') return;

    if (title) {
        const heading = createElement('h3', title);
        appendElements(parent, heading);
    }

    const list = createElement('ul');

    for (const [key, value] of Object.entries(obj)) {
        if (value === null || value === undefined || value === '') continue;

        const item = createElement('li');

        if (typeof value === 'object') {
            const label = createElement('span', `${key}:`);
            appendElements(item, label);
            renderObjectList(item, value);
        } else {
            item.innerText = `${key}: ${value}`;
        }

        appendElements(list, item);
    }

    appendElements(parent, list);
}

function renderUserMainInfo(currentUser, article) {
    const userInfoList = createElement('ul');

    for (const [key, value] of Object.entries(currentUser)) {
        if (['address', 'company'].includes(key)) continue;
        if (value === null || value === undefined || value === '') continue;

        const item = createElement('li', `${key}: ${value}`);
        appendElements(userInfoList, item);
    }

    appendElements(article, userInfoList);
}

function renderAddress(currentUser, article) {
    if (!currentUser?.address) return;
    renderObjectList(article, currentUser.address, 'Address');
}

function renderCompany(currentUser, article) {
    if (!currentUser?.company) return;
    renderObjectList(article, currentUser.company, 'Company');
}

function setupPostsToggle(id, container) {
    const postOfCurrentUser = createElement('a', 'posts of current user', {'href': '#', 'class': 'see-more'});

    const postsList = createElement('ul', '', {'class': 'posts'});
    postsList.style.display = 'none';

    let isLoaded = false;
    let isVisible = false;

    postOfCurrentUser.addEventListener('click', async (e) => {
        e.preventDefault();

        if (!isLoaded) {
            const postsData = await getPostsByUserId(id);

            for (const post of postsData) {
                const li = createElement('li', post.title);

                const link = createElement('a', 'click here to see post details', {'href': `post-details.html?id=${post.id}`});

                appendElements(li, link);
                appendElements(postsList, li);
            }

            isLoaded = true;
        }

        isVisible = !isVisible;
        postsList.style.display = isVisible ? 'flex' : 'none';
        setInnerText(postOfCurrentUser, isVisible ? 'hide posts' : 'posts of current user');
    });

    appendElements(container, postOfCurrentUser, postsList);
}


function createUserDetailsBlock(currentUser) {
    const container = createElement('div', '',
        {'class': 'container user-details'});
    appendElements(document.body, container);

    const article = createElement('article', '',
        {'class': 'user-block user-details-block'});
    appendElements(container, article);

    renderUserMainInfo(currentUser, article);
    renderAddress(currentUser, article);
    renderCompany(currentUser, article);
    setupPostsToggle(currentUser.id, container);
}

