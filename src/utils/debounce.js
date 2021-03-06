// basic debounce function to prevent request on every key stroke from users
const debounce = (fn, delay) => {
    let timer;

    return function() {
        const context = this;
        let args = arguments;

        clearTimeout(timer);

        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    };
};

export {
    debounce,
};
