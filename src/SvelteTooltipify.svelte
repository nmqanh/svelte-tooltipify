<script>
  import { fade } from 'svelte/transition'
  import { afterUpdate } from 'svelte'
  let horizontalPosition = 'center'
  let verticalPosition = 'top'
  let active = false
  let fittingChecked = false
  let tooltipContentNode = null
  let wrapperNode = null
  let windowScrollX
  let windowScrollY
  let windowWidth
  let windowHeight

  const handleOnMouseOver = () => {
    active = true
  }

  const handleOnMouseLeave = () => {
    horizontalPosition = 'center'
    verticalPosition = 'top'
    active = false
    fittingChecked = false
  }

  // Hide tooltip on scroll or window resize
  $: if (windowHeight || windowWidth || windowScrollX || windowScrollY) {
    handleOnMouseLeave()
  }

  afterUpdate(() => {
    if (active && !fittingChecked) {
      if (!tooltipContentNode || !wrapperNode) {
        return
      }

      const documentWidth = document.documentElement.clientWidth
      const documentHeight = document.documentElement.clientHeight

      let wrapperRect = wrapperNode.getBoundingClientRect()
      let rightPos = wrapperRect.x + wrapperRect.width
      let leftPos = wrapperRect.x
      let topPos = wrapperRect.y
      let bottomPos = wrapperRect.y + wrapperRect.height

      let tooltipContentRect = tooltipContentNode.getBoundingClientRect()

      let fitRight = rightPos + tooltipContentRect.width <= window.scrollX + documentWidth
      let fitLeft = leftPos - tooltipContentRect.width >= 0

      let fitTop = topPos - tooltipContentRect.height >= 0
      let fitBottom = bottomPos + tooltipContentRect.height <= window.scrollY + documentHeight

      if (fitTop) {
        verticalPosition = 'top'
      } else if (fitBottom) {
        verticalPosition = 'bottom'
      } else {
        verticalPosition = 'bottom'
      }

      if (fitLeft && fitRight) {
        horizontalPosition = 'center'
      } else if (fitLeft) {
        horizontalPosition = 'left'
      } else if (fitRight) {
        horizontalPosition = 'right'
      } else {
        horizontalPosition = 'center'
      }

      fittingChecked = true
    }
  })

  export let content = ''
  export let backgroundColor = '#000000'
  export let textColor = '#ffffffff'
</script>

<style type="text/scss">
  $arrowSize: 10px;
  $arrowPadding: 3px;
  $arrowPosition: $arrowSize + $arrowPadding;

  .tooltip {
    position: relative;
    display: inline-block;
    box-sizing: border-box;

    .tooltip-arrow {
      position: absolute;
      width: 0;
      height: 0;
      border-color: transparent;
      border-right-color: transparent;
      border-style: solid;
      pointer-events: none;

      &.bottom {
        left: 50%;
        top: 100%;
        margin-left: -$arrowSize;
        border-width: 0 $arrowSize $arrowSize;
        border-bottom-color: var(--background-color);
      }

      &.top {
        top: -$arrowSize;
        left: 50%;
        margin-left: -$arrowSize;
        border-width: $arrowSize $arrowSize 0;
        border-top-color: var(--background-color);
      }
    }

    .tooltip-content {
      padding: 3px 8px;
      position: absolute;
      text-align: center;
      background-color: var(--background-color);
      border-radius: 4px;
      width: auto;
      pointer-events: none;
      white-space: nowrap;

      &.bottom {
        top: calc(100% + #{$arrowSize});
      }

      &.top {
        bottom: calc(100% + #{$arrowSize});
      }

      &.center {
        left: 50%;
        transform: translateX(-50%);
      }

      &.right {
        left: calc(50% - #{$arrowPosition});
      }

      &.left {
        right: calc(50% - #{$arrowPosition});
      }
    }
  }
</style>

<svelte:window
  bind:scrollX={windowScrollX}
  bind:scrollY={windowScrollY}
  bind:innerWidth={windowWidth}
  bind:innerHeight={windowHeight} />

<div
  bind:this={wrapperNode}
  class="tooltip"
  on:mouseover={handleOnMouseOver}
  on:mouseout={handleOnMouseLeave}>
  {#if content && active}
    <div
      in:fade
      out:fade
      class={`tooltip-arrow ${verticalPosition}`}
      style="--background-color: {backgroundColor};" />
    <div
      in:fade
      out:fade
      bind:this={tooltipContentNode}
      class={`tooltip-content ${verticalPosition} ${horizontalPosition}`}
      style="--background-color: {backgroundColor}; color: {textColor};">
      {content}
    </div>
  {/if}
  <slot />
</div>
