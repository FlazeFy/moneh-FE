import React from 'react'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
// CSS Modules
import '../../../modules/styles/organisms_navbar.css'
import '../../../modules/styles/globals.css'
import OrganismsFooter from '../organisms_footer'

describe('Footer Testing', () => {
    // Desktop
    it('TCC-FT1 Get Footer (Dekstop)', () => {
        cy.viewport('macbook-15')
        cy.mount(<OrganismsFooter/>)
    })

    // Mobile
    it('TCC-FT2 Get Footer (Mobile)', () => {
        cy.viewport('iphone-6')
        cy.mount(<OrganismsFooter/>)
    })
})