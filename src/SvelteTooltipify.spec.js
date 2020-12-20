import { render, fireEvent, waitFor } from '@testing-library/svelte'

import SvelteTooltipifyTest from './SvelteTooltipifyTest.svelte'

const testButtonId = 'test-button'
const tooltipTestContent = 'Hello World'

describe('SvelteTooltipify component', () => {
  it('should render component normally, show the tooltip on hover and hide the tooltip on mouse out', async () => {
    const { getByTestId, queryByText } = render(SvelteTooltipifyTest, {
      content: tooltipTestContent,
      testButtonId
    })

    const testButton = getByTestId(testButtonId)
    expect(queryByText(tooltipTestContent)).not.toBeInTheDocument()
    await fireEvent.mouseOver(testButton)
    expect(queryByText(tooltipTestContent)).toBeInTheDocument()
    await fireEvent.mouseOut(testButton)
    await waitFor(() => {
      expect(queryByText(tooltipTestContent)).not.toBeInTheDocument()
    })
  })
})
