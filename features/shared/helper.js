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
    const id = new URLSearchParams(window.location.search).get('id');
    return id ? Number(id) : null;
}

function showError(message) {
    const error = createElement('p');
    setInnerText(error, message);
    appendElements(document.body, error);
}

async function safeFetch(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } catch (error) {
        throw new Error('Server is not responding.');
    }
}

export {createElement, appendElements, setInnerText, showError, getIdFromUrl, safeFetch};


