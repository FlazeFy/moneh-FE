import React from 'react'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
// CSS Modules
import '../../../modules/styles/organisms_navbar.css'
import '../../../modules/styles/globals.css'
import OrganismsPageBar from '../page_bar'

describe('Navbar Component Testing', () => {
    // Desktop
    it('TCC-PB1 Get Page Bar (Desktop)', () => {
        cy.viewport('macbook-15')
        cy.mount(<OrganismsPageBar curr={2} max={10} ctx={'test_page_bar'}/>)
    })

    it('TCC-PB2 Get Page Bar (Mobile)', () => {
        cy.viewport('iphone-6')
        cy.mount(<OrganismsPageBar curr={2} max={10} ctx={'test_page_bar'}/>)
    })
})