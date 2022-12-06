/**
 * @jest-environment node
 */
import {cleanup, fireEvent, render} from '@testing-library/react'
import {Golem} from './Golem'
import React from 'react' 

afterEach(cleanup)
it('label matches text', () => {
  const {queryByLabelText, getByLabelText} = render(
    <Golem></Golem>,
  )

  expect(queryByLabelText(/golem/i)).toBeTruthy()
})
