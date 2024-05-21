const appendChild = (parent, child) => {
    if (Array.isArray(child)) {
        child.forEach((nestedChild) => appendChild(parent, nestedChild));
    } else {
        parent.appendChild(child.nodeType ? child : document.createTextNode(child));
    }
};

export const jsx = (tag, properties) => {
    if (typeof tag === "function") {
        return tag(properties);
    }
    const {children, ref, ...attributes} = properties;

    const element= document.createElement(tag);

    if (ref) {
        ref.htmlElement = element;
    }

    if (children) {
        appendChild(element, children);
    }

    Object.entries(attributes || {}).forEach(([name, value]) => {
        if (name.startsWith("on") && name.toLowerCase() in window) {
            element.addEventListener(name.toLowerCase().substr(2), value);
        } else {
            if (value && value !== false) {
                if (value === true) {
                    element.setAttribute(name, '');
                } else {
                    element.setAttribute(name, value);
                }
            }
        }
    })

    return element;
};

export const jsxs = jsx;

export const Fragment = props => {
    const fragment = document.createDocumentFragment();
    // children.forEach(child => appendChild(fragment, child));
    appendChild(fragment, props.children)
    return fragment;
}