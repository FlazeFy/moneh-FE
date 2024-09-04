import React from 'react'
import MoleculesChartPie from '../molecules_chart_pie'
import '../../../modules/templates/apexchart.js'

describe('Pie Chart Component Testing', () => {
  it('TCC-C1 Get Pie Chart Without Filter', () => {
    const type = 'pie'
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

    cy.mount(<MoleculesChartPie items={items} filter_name={null} />)

    // Template Apexchart test
    cy.templateApexChart(type, null)
  })
})