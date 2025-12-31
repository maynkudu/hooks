# hooks

A small collection of hooks.

## Install

npm i use-react-hooks

or

yarn add use-react-hooks

## Usage

```ts
import { useWindow, useCursor, useLocalStorage } from "@maynkudu/hooks";

function Example() {
    const { width, height } = useWindow();
    const cursor = useCursor();
    const [theme, setTheme] = useLocalStorage("theme", "light");

    return (
        <div>
            {width} x {height}
        </div>
    );
}
```
