<script>
  import { fade } from 'svelte/transition'
  import { afterUpdate } from 'svelte'
  import IsMobile from 'is-mobile'

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

  let tooltipId = `tooltip-${Math.random()}`

  const showTooltip = () => {
    active = true
  }

  const isMobile = IsMobile()

  const hideToolTip = () => {
    horizontalPosition = 'center'
    verticalPosition = 'top'
    active = false
    fittingChecked = false
  }

  const handleDocumentTouch = (e) => {
    if (e.target && e.target.parentNode) {
      const clickedToolTipId = e.target.parentNode.getAttribute('id')
      if (clickedToolTipId !== tooltipId) {
        hideToolTip()
      }
    }
  }

  // Hide tooltip on scroll or window resize
  $: if (windowHeight || windowWidth || windowScrollX || windowScrollY) {
    hideToolTip()
  }

  afterUpdate(() => {
    if (active && !fittingChecked) {
      if (!tooltipContentNode || !wrapperNode) {
        return
      }

      const documentWidth = document.documentElement.clientWidth
      const documentHeight = document.documentElement.clientHeight

      const wrapperRect = wrapperNode.getBoundingClientRect()
      const leftPos = wrapperRect.x !== undefined ? wrapperRect.x : wrapperRect.left
      const topPos = wrapperRect.y !== undefined ? wrapperRect.y : wrapperRect.top
      const rightPos = leftPos + wrapperRect.width
      const bottomPos = topPos + wrapperRect.height

      const tooltipContentRect = tooltipContentNode.getBoundingClientRect()

      const scrollX = window.scrollX !== undefined ? window.scrollX : window.pageXOffset
      const scrollY = window.scrollY !== undefined ? window.scrollY : window.pageYOffset

      const fitRight = rightPos + tooltipContentRect.width <= scrollX + documentWidth
      const fitLeft = leftPos - tooltipContentRect.width >= 0

      const fitTop = topPos - tooltipContentRect.height >= 0
      const fitBottom = bottomPos + tooltipContentRect.height <= scrollY + documentHeight

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
  export let textColor = '#ffffff'
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
        border-top-color: transparent !important;
        border-left-color: transparent !important;
        border-right-color: transparent !important;
      }

      &.top {
        top: -$arrowSize;
        left: 50%;
        margin-left: -$arrowSize;
        border-width: $arrowSize $arrowSize 0;
        border-bottom-color: transparent !important;
        border-left-color: transparent !important;
        border-right-color: transparent !important;
      }
    }

    .tooltip-content {
      padding: 3px 8px;
      position: absolute;
      text-align: center;
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

<svelte:body on:touchstart={isMobile ? handleDocumentTouch : undefined} />
<svelte:window
  bind:scrollX={windowScrollX}
  bind:scrollY={windowScrollY}
  bind:innerWidth={windowWidth}
  bind:innerHeight={windowHeight} />

<div
  id={tooltipId}
  bind:this={wrapperNode}
  class="tooltip"
  on:touchend={isMobile ? showTooltip : undefined}
  on:mouseover={!isMobile ? showTooltip : undefined}
  on:mouseout={hideToolTip}>
  {#if content && active}
    <div
      in:fade
      out:fade
      class={`tooltip-arrow ${verticalPosition}`}
      style="border-color: {backgroundColor};" />
    <div
      in:fade
      out:fade
      bind:this={tooltipContentNode}
      class={`tooltip-content ${verticalPosition} ${horizontalPosition}`}
      style="background-color: {backgroundColor}; color: {textColor};">
      {content}
    </div>
  {/if}
  <slot />
</div>
