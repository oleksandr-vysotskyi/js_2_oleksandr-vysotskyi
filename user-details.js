import {createElement, appendElements, /*setAttribute,*/ setInnerText, showError, getIdFromUrl} from "./helper.js";
import {getUsersData, getPostsByUserId} from "./data.js";

const usersObj = await getUsersData();
const currentUserId = getIdFromUrl();
const currentUser = usersObj.find(user => user.id === currentUserId);

if (!currentUser) {
    showError('userId not found');
} else {
    createUserDetailsBlock(currentUser);
}


function renderUserMainInfo(currentUser, article) {
    const {id, name, username, email, phone, website} = currentUser;

    const userId = createElement('h2', id);

    const userName = createElement('h3', name);

    const nickName = createElement('h4', username);

    const phoneNumber = createElement('a', phone, {'href': `tel:${phone}`, 'title': 'phone'});

    const userEmail = createElement('a', email, {'href': `mailto:${email}`, 'title': 'email'});

    const userWebsite = createElement('a', website, {'href': website, 'target': '_blank', 'title': website});

    appendElements(article, userId, userName, nickName, phoneNumber, userEmail, userWebsite);
}

function renderAddress(currentUser, article) {
    const userAddress = createElement('ul');
    const {city, street, suite, zipcode, geo} = currentUser.address;
    const {lat, lng} = geo;

    const userCity = createElement('li', city);
    const userStreet = createElement('li', street);
    const userSuite = createElement('li', suite);
    const userZipcode = createElement('li', zipcode);

    const userGeo = createElement('li');
    const userLat = createElement('li', lat);
    const userLng = createElement('li', lng);

    appendElements(userGeo, userLng, userLat);
    appendElements(userAddress, userCity, userStreet, userSuite, userZipcode, userGeo);
    appendElements(article, userAddress);
}

function renderCompany(currentUser, article) {
    const userCompany = createElement('ul');
    const {bs, catchPhrase, name: companyName} = currentUser.company;

    const userBs = createElement('li', bs);

    const userCatchPhrase = createElement('li', catchPhrase);

    const userCompanyName = createElement('li', companyName);

    appendElements(userCompany, userBs, userCompanyName, userCatchPhrase);
    appendElements(article, userCompany);
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

                const link = createElement('a','click here to see post details', {'href': `post-details.html?id=${post.id}`});

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

