<script>
  const horizontalPosition = 'left'
  const verticalPosition = 'top'
  export let content = ''
  export let backgroundColor = '#000000'
  export let textColor = '#ffffffff'
</script>

<style type="text/scss">
  $arrowSize: 10px;
  $arrowPadding: 5px;
  $arrowPosition: $arrowSize + $arrowPadding;

  .tooltip {
    position: relative;

    .tooltip-arrow {
      position: absolute;
      width: 0;
      height: 0;
      border-color: transparent;
      border-right-color: transparent;
      border-style: solid;

      &.bottom {
        bottom: 0;
        left: 50%;
        margin-left: -$arrowSize;
        border-width: 0 $arrowSize $arrowSize;
        border-bottom-color: var(--background-color);
      }

      &.top {
        top: 0%;
        bottom: -$arrowSize;
        left: 50%;
        margin-left: -$arrowSize;
        border-width: $arrowSize $arrowSize 0;
        border-top-color: var(--background-color);
      }
    }

    .tooltip-content {
      padding: 3px 8px;
      color: #fff;
      position: absolute;
      text-align: center;
      background-color: var(--background-color);
      border-radius: 4px;
      max-width: 200px;

      &.bottom {
        top: 100%;
      }

      &.top {
        bottom: 100%;
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

<div class="tooltip">
  <slot />
  {#if content}
    <div
      class={`tooltip-arrow ${verticalPosition}`}
      style="--background-color: {backgroundColor};" />
    <div
      class={`tooltip-content ${verticalPosition} ${horizontalPosition}`}
      style="--background-color: {backgroundColor}; color: {textColor};">
      {content}
    </div>
  {/if}
</div>
