// Example 2
const MyReact = (function () {
    let _val, _deps; // hold our state in module scope
    return {
        render(Component) {
            const Comp = Component()
            Comp.render()
            return Comp
        },
        useEffect(callback, depsArr) {
            const hasNoDeps = !depsArr;
            const hasChangedDeps = _deps ? depsArr.every((dep, i) => dep === _deps[i]) : true;
            if (hasNoDeps || hasChangedDeps) {
                callback();
                _deps = depsArr;
            }
        },
        useState(initialValue) {
            _val = _val || initialValue // assign anew every run
            function setState(newVal) {
                _val = newVal
            }
            return [_val, setState]
        }
    }
})()

// Example 2 continued
function Counter() {
    const [count, setCount] = MyReact.useState(0)

    MyReact.useEffect(() => {
        console.log('effect', count)
    }, [count])

    return {
        click: () => setCount(count + 1),
        noop: () => setCount(count),
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