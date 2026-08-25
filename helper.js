function createElement(element, text = '', attributes = {}) {
    const tag = document.createElement(element);

    if (text) {
        tag.innerText = text;
    }

    for (const [key, value] of Object.entries(attributes)) {
        tag.setAttribute(key, value);
    }

    return tag;
}

function appendElements(parent, ...elements) {
    parent.append(...elements);
}

function setInnerText(element, text) {
    element.innerText = text;
}

function getIdFromUrl() {
    return Number(new URLSearchParams(window.location.search).get('id'));
}

function showError(message) {
    const error = createElement('p');
    setInnerText(error, message);
    appendElements(document.body, error);
}

export {createElement, appendElements, setInnerText, showError, getIdFromUrl};


