import React from 'react'
import {Golem} from '../../src/components/Golem'

describe('Golem.cy.ts', () => {
  it('playground', () => {
    cy.mount(<Golem><div>test</div></Golem>)
  })
})