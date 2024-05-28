import {TinyObject, TinyElement, TinyComponent, TinyFragment} from "./objects";

export default class TinyUI {
    static bind(root, tinyObject) {
        root.appendChild(TinyRender.render(tinyObject));
    }
}

class TinyRender {

    static render(object) {
        if (object instanceof TinyObject) {
            switch (object.constructor) {
                case TinyElement:
                    return TinyRender.renderElement(object);
                case TinyComponent:
                    return TinyRender.renderComponent(object);
                case TinyFragment:
                    return TinyRender.renderFragment(object);
                default:
                    throw Error(`Unknown type of tiny object ${object.constructor}`);
            }
        } else {
            return TinyRender.renderText(object)
        }
    }

    static renderElement(tinyElement) {
        const element= document.createElement(tinyElement.tag);
        if (tinyElement.ref) {
            tinyElement.ref.htmlElement = element;
        }

        tinyElement.attributes.forEach(attr => {
            if (attr.value && attr.value !== false) {
                if (attr.value === true) {
                    element.setAttribute(attr.name, '');
                } else {
                    element.setAttribute(attr.name, attr.value);
                }
            }
        })

        tinyElement.eventListeners.forEach(({event, listener}) => {
            element.addEventListener(event, listener);
        });

        if (tinyElement.children) {
            TinyRender.appendChild(element, tinyElement.children);
        }

        return element;
    }

    static renderComponent(tinyComponent) {
        const children = tinyComponent.render({...tinyComponent.props, children: tinyComponent.children});
        console.log('TinyComponent children after render: ', children, tinyComponent.render)
        if (Array.isArray(children)) {
            return children.map(child => TinyRender.render(child));
        }
        return TinyRender.render(children);
    }

    static renderText(text) {
        return document.createTextNode(text)
    }

    static renderFragment(tinyFragment) {
        const fragment = document.createDocumentFragment();
        tinyFragment.children.map(child => TinyRender.render(child)).forEach(childNode => fragment.appendChild(childNode));
        return fragment;
    }

    static appendChild(parent, child) {
        if (Array.isArray(child)) {
            child.forEach((nestedChild) => TinyRender.appendChild(parent, nestedChild));
        } else {
            parent.appendChild(TinyRender.render(child));
        }
    };

    render() {

    }
}