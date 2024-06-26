import {TinyObject, TinyElement, TinyComponent, TinyFragment} from "./objects";

export default class TinyUI {
    constructor(root, virtualDom) {
        this.root = root;
        this.virtualDom = virtualDom
        this.tinyStore = new TinyStore(this);
        this.tinyRender = new TinyRender(this.tinyStore)
    }

    static bind(root, tinyObject) {
        const tinyUI = new TinyUI(root, tinyObject);
        tinyUI.renderDom();
    }

    renderDom() {
        TinyStore.currentStore = this.tinyStore;
        const renderedDom = this.tinyRender.render(this.virtualDom);
        TinyStore.currentStore = null;
        if (Array.isArray(renderedDom)) {
            renderedDom.forEach((nestedChild) =>  this.root.appendChild(nestedChild));
        } else {
            this.root.appendChild(renderedDom);
        }
    }

    rerenderComponent(component) {
        TinyStore.currentStore = this.tinyStore;
        this.tinyRender.renderComponent(component);
        TinyStore.currentStore = null;
    }
}

class TinyStore {
    constructor(tinyUI) {
        this.tinyUI = tinyUI;
        this.states = new Map();
        this.currentElement = null;
    }

    addState(initialValue) {
        if (!this.states.has(this.currentElement)) {
            this.states.set(this.currentElement, initialValue);
        }
    }

    setState(element, newValue) {
        const prevValue = this.states.get(element);
        if (prevValue !== newValue) {
            this.states.set(element, newValue);
            this.tinyUI.rerenderComponent(element);
        }
    }

    getState() {
        return this.states.get(this.currentElement);
    }

    static currentStore = null;
}

const createStateSetter = (store, element) => (newValue) => store.setState(element, newValue);

export const createState = (initialValue) => {
    const store = TinyStore.currentStore;

    store.addState(initialValue);

    return [store.getState(), createStateSetter(store, store.currentElement)];
}

class TinyRender {
    constructor(tinyStore) {
        this.tinyStore = tinyStore;
    }

    render(object) {
        if (object instanceof TinyObject) {
            switch (object.constructor) {
                case TinyElement:
                    return this.renderElement(object);
                case TinyComponent:
                    return this.renderComponent(object);
                case TinyFragment:
                    return this.renderFragment(object);
                default:
                    throw Error(`Unknown type of tiny object ${object.constructor}`);
            }
        } else {
            return this.renderText(object)
        }
    }

    renderElement(tinyElement) {
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
            this.appendChild(element, tinyElement.children);
        }

        return element;
    }

    renderComponent(tinyComponent) {
        this.tinyStore.currentElement = tinyComponent;
        const children = tinyComponent.render({...tinyComponent.props, children: tinyComponent.children});
        this.tinyStore.currentElement = null;
        const newHtmlElement= this.render(children);
        if (!tinyComponent.htmlElement) {
            tinyComponent.htmlElement = newHtmlElement;
        } else {
            if (newHtmlElement instanceof DocumentFragment) {
                // В этой ветке if'а как только не пробовал крутить-вертеть в попытках заменить предыдущие
                // потом компонента вставленные в DOM через DocumentFragment, но так и не получилось
                // После вставки DocumentFragment в DOM, его коллекция очищается.
                // Пробовал компоненту сохранять в htmlElement не сам DocumentFragment а его children,
                // но потом не смог корректно найти их в доме и заменить на новые children
                // Так же пробовал вместо DocumentFragment в renderFragment() возвращать массив элементов,
                // и в htmlElement сохранять его, но тут уже просто не осилил замену в parent одного массива элементов
                // на другой.
                // В итоге просто в App заменил (jsx)Fragment на div
            } else {
                tinyComponent.htmlElement.replaceWith(newHtmlElement);
            }
            tinyComponent.htmlElement = newHtmlElement;
        }
        return tinyComponent.htmlElement;
    }

    renderText(text) {
        return document.createTextNode(text)
    }

    renderFragment(tinyFragment) {
        const fragment = document.createDocumentFragment();
        tinyFragment.children.map(child => this.render(child)).forEach(childNode => fragment.appendChild(childNode));
        return fragment;
    }

    appendChild(parent, child) {
        if (Array.isArray(child)) {
            child.forEach((nestedChild) => this.appendChild(parent, nestedChild));
        } else {
            parent.appendChild(this.render(child));
        }
    };
}