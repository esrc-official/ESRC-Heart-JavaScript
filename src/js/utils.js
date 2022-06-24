export const createDivEl = ({ id, className, content, background }) => {
    const el = document.createElement('div');
    if (id) {
        el.id = id;
    }
    if (className) {
        el.className = Array.isArray(className) ? className.join(' ') : className;
    }
    if (content) {
        el.innerHTML = content;
    }
    if (background) {
        el.style.background = `url(${background})`;
    }
    return el;
};