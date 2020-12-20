<script>
  import SvelteTooltipify from './SvelteTooltipify.svelte'
  export let content
  export let testButtonId
</script>

<SvelteTooltipify {content}>
  <button data-testid={testButtonId}>Test Button</button>
</SvelteTooltipify>
