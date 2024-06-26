export class TinyObject {
}

export class TinyElement extends TinyObject {
    constructor({tag, ref, attributes, eventListeners, children}) {
        super();
        this.tag = tag;
        this.ref = ref;
        this.attributes = attributes;
        this.eventListeners = eventListeners;
        this.children = children;
    }
}

export class TinyComponent extends TinyObject {
    constructor({tag, render, props, children}) {
        super();
        this.tag = tag;
        this.render = render;
        this.props = props;
        this.children = children;
        this.htmlElement = null;
    }
}

export class TinyFragment extends TinyObject {
    constructor(children) {
        super();
        this.tag = '_Fragment';
        this.children = children;
    }
}