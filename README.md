# strip-only

Ready to commit your code?

`strip-only` is a [Visual Studio Code](https://code.visualstudio.com/) extension that removes exclusive tests by stripping `.only` from your current file. Tested with [Mocha](https://mochajs.org/).

Run it and it will change all instances of `it.only` and `describe.only` to `it` and `describe` respectively. (It also works for mocha's `TDD` interface methods - `suite` and `test`.)

![strip-only](https://user-images.githubusercontent.com/2362668/41152450-e81811f8-6b13-11e8-893d-e22f9321f724.gif)

## Get started

Install the extension, [via the UI](https://code.visualstudio.com/docs/editor/extension-gallery) or:

```sh
code --install-extension rouanw.strip-only
```

The `Strip .only` command will now be available in the command palette.

You can add a keyboard shortcut, in [`keybindings.json`](https://code.visualstudio.com/docs/getstarted/tips-and-tricks#_customize-your-keyboard-shortcuts). For example:

```js
[
  // ... other shortcuts
  {
      "key": "ctrl+shift+.",
      "command": "extension.stripOnly"
  }
]
```

## Find it on the Visual Studio Marketplace

https://marketplace.visualstudio.com/items?itemName=rouanw.strip-only

## Licence

MIT
