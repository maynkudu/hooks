# useLocalStorage

Persistent local storage state.

```ts
const [value, setValue, { reset, remove }] = useLocalStorage("theme", "light");
```

Values persist across reloads and tabs.
