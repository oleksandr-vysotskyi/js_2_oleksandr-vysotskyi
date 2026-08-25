import {createElement, appendElements /*setAttribute*/, setInnerText} from "./helper.js";
import {getUsersData} from "./data.js";

const usersObj = await getUsersData();

function createUserBlocks(usersObj) {
    const container = createElement('div', '', {'class':'container'})
    appendElements(document.body, container);
    for (const user of usersObj) {
        const { id, name } = user;
        const article = createElement('article','', {'class': 'user-block'});
        appendElements(container, article)
        const userId = createElement('h2');
        setInnerText(userId, id);
        const userName = createElement('h2', name);
        const link = createElement('a', 'click here to see more details', {'href': `user-details.html?id=${id}`});
        appendElements(article, userId, userName, link);
    }
}

createUserBlocks(usersObj);