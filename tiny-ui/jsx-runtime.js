import {TinyComponent, TinyElement, TinyFragment} from "./objects";

const appendChild = (parent, child) => {
    if (Array.isArray(child)) {
        child.forEach((nestedChild) => appendChild(parent, nestedChild));
    } else {
        parent.appendChild(child.nodeType ? child : document.createTextNode(child));
    }
};

export const jsx = (jsxElement, properties) => {
    if (typeof jsxElement === "function") {
        if (jsxElement.name === 'Fragment') {
            return new TinyFragment(properties.children);
        }
        const {children, ...props} = properties;
        return new TinyComponent({
            tag: jsxElement.name,
            render: jsxElement,
            props: props,
            children: children
        });
    } else {
        const {children, ref, ...props} = properties;
        const attributes = Object.entries(props || {}).filter(([name,]) => !isEventListener(name))
            .map(([name, value]) => {
               return {
                   name: name,
                   value: value,
               }
            });
        const eventListeners = Object.entries(props || {}).filter(([name,]) => isEventListener(name))
            .map(([name, listener]) => {
                return {
                    event: name.toLowerCase().substr(2),
                    listener: listener,
                }
            });
        return new TinyElement({
            tag: jsxElement,
            ref: ref,
            attributes: attributes,
            eventListeners: eventListeners,
            children: children
        });
    }
}

const isEventListener = name => name.startsWith("on") && name.toLowerCase() in window;

export const jsxs = jsx;

export const Fragment = (props) => {
    return new TinyFragment(props.children);
}