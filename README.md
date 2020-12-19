# svelte-tooltipify

This minimal project is to implement a tooltip Svelte component with following Specs

### Specs:
- On a client without a mouse, the tooltip should be activated on tap only, it can be deactivated on scroll or tapping outside of the tooltip
- On a client with a mouse, the tooltip should be activated onMouseOver and deactivated onMouseLeave, also it should deactivate on scroll and resize
- Should support detecting the bounds, e.g. if the tooltip is displayed on left, the tail should correspond to it, see example below. A good idea to demo it displaying in corners and top, right, bottom, left bounds.
- It should also auto detect and place the tooltip on different directions depending on the content if it fits. E.g. if there is not enough space at the top of the page, tooltip should appear below the content.
