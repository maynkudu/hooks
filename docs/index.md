# @maynkudu/hooks

A collection of lightweight, type-safe React hooks designed for performance and reliability. Built with SSR-safety and tree-shaking at its core.

[![npm version](https://img.shields.io/npm/v/@maynkudu/hooks/latest.svg)](https://www.npmjs.com/package/@maynkudu/hooks)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## Why @maynkudu/hooks?

- **SSR Ready**: Internal checks for `window` and `document` ensure compatibility with Next.js, Remix, etc.
- **Fully Tree-Shakeable**: Import only the hooks you need; keep your bundle lean.
- **TypeScript-First**: Explicit generics and inferred return types for a better DX.
- **Production Tested**: Handles edge cases like component unmounting during async operations and event listener cleanup.

---

## Installation

```bash
# With npm
npm install @maynkudu/hooks@latest

# With yarn
yarn add @maynkudu/hooks@latest

# With pnpm
pnpm add @maynkudu/hooks@latest

# With bun
bun add @maynkudu/hooks@latest
```

---

## Quick Start

```tsx
import { useWindow, useDebounce, useClipboard } from "@maynkudu/hooks";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { width } = useWindow();

  // Debounce expensive operations
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Simple clipboard access
  const { copy, copied } = useClipboard();

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      {width < 768 ? <MobileUI /> : <DesktopUI />}
      <button onClick={() => copy(debouncedSearch)}>
        {copied ? "Value Copied!" : "Copy Debounced Value"}
      </button>
    </div>
  );
};
```

---

## Comprehensive Hook Catalog

### 📱 Responsive & Layout

| Hook                                   | Purpose                                                     |
| :------------------------------------- | :---------------------------------------------------------- |
| `useWindow`                            | Track viewport dimensions with optimized resize listeners.  |
| `useMobile`, `useTablet`, `useDesktop` | Direct boolean checks for common device breakpoints.        |
| `useMatchMedia`                        | Reactive interface for custom CSS media queries.            |
| `useScrollPosition`                    | Performance-optimized scroll tracking.                      |
| `useVisible`                           | Intersection Observer wrapper to detect element visibility. |

### ⚙️ State & Logic

| Hook              | Purpose                                                            |
| :---------------- | :----------------------------------------------------------------- |
| `useLocalStorage` | Type-safe state persistence synced across tabs.                    |
| `useUndo`         | Complex state history management (Undo/Redo logic).                |
| `useDebounce`     | Value debouncing to limit high-frequency updates.                  |
| `useInterval`     | Declarative `setInterval` that pauses when the component unmounts. |

### 🖱️ User Interaction

| Hook           | Purpose                                                  |
| :------------- | :------------------------------------------------------- |
| `useHover`     | Tracks hover state via mouseEnter/mouseLeave.            |
| `useKeyPress`  | Global or scoped keyboard event listeners.               |
| `useClipboard` | Modern API for clipboard operations with feedback state. |
| `useIdle`      | Detect user inactivity based on a configurable timeout.  |
| `useCursor`    | Real-time mouse coordinate tracking.                     |

### 🌐 Browser & System

| Hook                   | Purpose                                                     |
| :--------------------- | :---------------------------------------------------------- |
| `useOnline`            | Reactive network status (online/offline).                   |
| `usePageVisibility`    | Detect when the user switches tabs or minimizes the window. |
| `usePreferredLanguage` | Access the browser's locale settings reactively.            |
| `useRetryAsync`        | Wrapper for async calls with configurable retry strategies. |

---

## Core Principles

1.  **No Magic**: Hooks behave predictably according to the React lifecycle.
2.  **Performance**: Event listeners are passive where possible and cleaned up on unmount.
3.  **Strict Typing**: Every hook is written in TypeScript, providing full intellisense for your IDE.

---

## Requirements

- **React**: ^18.0.0
- **TypeScript**: ^4.5.0 (Optional, but recommended)

---

## Contributing

We value pragmatic improvements. If you'd like to contribute, please:

1. Fork the repo.
2. Create a feature branch.
3. Ensure your hook follows the SSR-safety pattern.
4. Submit a PR.

## License

MIT © [maynkudu](https://github.com/maynkudu)
