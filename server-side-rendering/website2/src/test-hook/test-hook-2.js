// Example 2
const MyReact = (function () {
    let hooks = [];
    let currentHook = 0;

    return {
        render(Component) {
            const Comp = Component();
            Comp.render();
            currentHook = 0;
            return Comp;
        },
        useEffect(callback, depsArr) {
            const hasNoDeps = !depsArr;
            const _deps = hooks[currentHook];
            const hasChangedDeps = _deps ? !depsArr.every((dep, i) => dep === _deps[i]) : true;
            if (hasNoDeps || hasChangedDeps) {
                callback();
                hooks[currentHook] = depsArr;
            }
            currentHook++;
        },
        useState(initialValue) {
            hooks[currentHook] = hooks[currentHook] || initialValue // assign anew every run
            const setStateHookIndex = currentHook;
            function setState(newVal) {
                hooks[setStateHookIndex] = newVal
            }
            return [hooks[currentHook++], setState]
        }
    }
})()

function useSplitUrl(initVal) {
    const [text, setText] = MyReact.useState(initVal);
    const mask = text.split('.');
    return [mask, setText];
}

function useSplitUrl111(initVal) {

    const [text, setText] = MyReact.useState(initVal)
    const mask = text.split('.');
    return [mask, setText];
}

// Example 2 continued
function Counter() {
    const [count, setCount] = MyReact.useState(0);
    const [url, setUrl] = useSplitUrl('www.baidu.com');

    MyReact.useEffect(() => {
        console.log('effect', count);
        console.log('effect-url', url);
    }, [count])

    return {
        click: () => setCount(count + 1),
        noop: () => setCount(count),
        type: () => setUrl('www.google.com'),
        render: () => console.log('render:', { count })
    }
}
let App
App = MyReact.render(Counter)
// effect 0
// render {count: 0}
App.click()
App = MyReact.render(Counter)
// effect 1
// render {count: 1}
App.noop()
App = MyReact.render(Counter)
// // no effect run
// render {count: 1}
App.click()
App = MyReact.render(Counter)

App.click()
App.type();
App = MyReact.render(Counter)