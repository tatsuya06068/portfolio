import React from 'react'
import { render, fireEvent } from '../testUtils'
import { Home } from '../../pages/profile'

describe('Home page', () => {
  it('renders a heading', () => {
    const { getByRole } = render(<Home />)

    const heading = getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })

  it('clicking button triggers alert', () => {
    const { getByText } = render(<Home />, {})
    window.alert = jest.fn()
    fireEvent.click(getByText('Test Button'))
    expect(window.alert).toHaveBeenCalledWith('With typescript and Jest')
  })
})
