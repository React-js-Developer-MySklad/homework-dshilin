const elementRef = {
    htmlElement: null
};

export const createRef = () => {
    return Object.create(elementRef);
}