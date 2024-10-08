import React from 'react'
import MoleculesChartBar from '../molecules_chart_bar'
import '../../modules/templates/apexchart.js'

describe('Bar Chart Component Testing', () => {
  it('TCC-C3 Get Bar Chart Without Filter', () => {
    const type = 'bar'
    const items = [
      {
        context:"Quartal 1",
        total: 30
      },
      {
        context:"Quartal 2",
        total: 22
      },
      {
        context:"Quartal 3",
        total: 41
      },
      {
        context:"Quartal 4",
        total: 36
      }
    ]

    cy.mount(<MoleculesChartBar items={items} filter_name={null} />)

    // Template Apexchart test
    cy.templateApexChart(type, items)
  })
})