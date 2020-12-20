# svelte-tooltipify

This minimal project is to implement a tooltip Svelte component with following Specs

### Specs

- [x] On a client without a mouse, the tooltip should be activated on tap only, it can be deactivated on scroll or tapping outside of the tooltip
- [x] On a client with a mouse, the tooltip should be activated onMouseOver and deactivated onMouseLeave, also it should deactivate on scroll and resize
- [x] Should support detecting the bounds, e.g. if the tooltip is displayed on left, the tail should correspond to it, see example below. A good idea to demo it displaying in corners and top, right, bottom, left bounds.
- [x] It should also auto detect and place the tooltip on different directions depending on the content if it fits. E.g. if there is not enough space at the top of the page, tooltip should appear below the content.

### Checklist

- [x] Init Svelte project with minimal setup (not using boilerplates or generators).
- [x] It should be re-usable as much as possible, i.e. a tooltip can be attached to anything
- [x] Keep the code clean, concise, elegant, robust and efficient as possible
- [x] Add animations and/or transitions when the tooltip appears and disappear
- [x] Make use of advanced sass/scss features

### Extra Checklist

- [x] Added Jest and testing-library with a simple test.
- [x] Integrated ESLint and Prettier.
- [x] Pre-configurate VSCode settings to help install essential extensions
- [x] Pre-configurate VSCode settings to auto format / auto fix based on eslint and prettier rules.
- [x] Deployed live demo to netlify (see below)

### Demo

TRY LIVE DEMO: [https://svelte-tooltipify.netlify.app](https://svelte-tooltipify.netlify.app)

OR Watch video

[![Watch Demo Svelte Tooltipify](http://img.youtube.com/vi/Ra9YzUAy9Co/0.jpg)](http://www.youtube.com/watch?v=Ra9YzUAy9Co 'Watch Demo Svelte Tooltipify')
