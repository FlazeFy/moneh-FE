import React from 'react'
import GetFooter from '../footer'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
// CSS Modules
import '../../../modules/styles/navbar.css'
import '../../../modules/styles/globals.css'

describe('Footer Testing', () => {
    // Desktop
    it('TCC-FT1 Get Footer (Dekstop)', () => {
        cy.viewport('macbook-15')
        cy.mount(<GetFooter/>)
    })

    // Mobile
    it('TCC-FT2 Get Footer (Mobile)', () => {
        cy.viewport('iphone-6')
        cy.mount(<GetFooter/>)
    })
})