<script>
  import SvelteTooltipify from './SvelteTooltipify.svelte'
</script>

<style type="text/scss">
  a {
    cursor: pointer;
  }

  .fixed {
    position: fixed;
  }

  .top {
    top: 0;
  }

  .bottom {
    bottom: 0;
  }

  .left {
    left: 0;
  }

  .right {
    right: 0;
  }

  .center {
    left: 50%;
    transform: translateX(-50%);
  }

  .middle {
    top: 50%;
    transform: translateY(-50%);
  }

  .middleCenter {
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
</style>

<main>
  <div class="fixed top left">
    <SvelteTooltipify content="This is a tooltip"><a>Open tooltip</a></SvelteTooltipify>
  </div>

  <div class="fixed top center">
    <SvelteTooltipify content="This is a tooltip"><a>Open tooltip</a></SvelteTooltipify>
  </div>

  <div class="fixed top right">
    <SvelteTooltipify content="This is a tooltip"><a>Open tooltip</a></SvelteTooltipify>
  </div>

  <div class="fixed middle left">
    <SvelteTooltipify content="This is a tooltip"><a>Open tooltip</a></SvelteTooltipify>
  </div>

  <div class="fixed middleCenter">
    <SvelteTooltipify content="This is a tooltip"><a>Open tooltip</a></SvelteTooltipify>
  </div>

  <div class="fixed middle right">
    <SvelteTooltipify content="This is a tooltip"><a>Open tooltip</a></SvelteTooltipify>
  </div>

  <div class="fixed bottom left">
    <SvelteTooltipify content="This is a tooltip"><a>Open tooltip</a></SvelteTooltipify>
  </div>

  <div class="fixed bottom center">
    <SvelteTooltipify content="This is a tooltip"><a>Open tooltip</a></SvelteTooltipify>
  </div>

  <div class="fixed bottom right">
    <SvelteTooltipify content="This is a tooltip"><a>Open tooltip</a></SvelteTooltipify>
  </div>
</main>
