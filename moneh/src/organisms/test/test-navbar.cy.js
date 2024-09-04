import React from 'react'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
// CSS Modules
import '../../../modules/styles/organisms_navbar.css'
import '../../../modules/styles/globals.css'
import OrganismsNavbar from '../organisms_navbar'

describe('Navbar Component Testing', () => {
    // Desktop
    it('TCC-NB1 Get Navbar With Opened Main Menu (Desktop)', () => {
        cy.viewport('macbook-15')
        cy.mount(<OrganismsNavbar active="home" subactive={null}/>)
    })

    it('TCC-NB2 Get Navbar With Opened Sub Menu (Desktop)', () => {
        cy.viewport('macbook-15')
        cy.mount(<OrganismsNavbar active="stats" subactive="stats_flow"/>)
    })

    // Mobile
    it('TCC-NB3 Get Navbar With Opened Main Menu (Mobile)', () => {
        cy.viewport('iphone-6')
        cy.mount(<OrganismsNavbar active="home" subactive={null}/>)
    })

    it('TCC-NB4 Get Navbar With Opened Sub Menu (Mobile)', () => {
        cy.viewport('iphone-6')
        cy.mount(<OrganismsNavbar active="stats" subactive="stats_flow"/>)
    })
})