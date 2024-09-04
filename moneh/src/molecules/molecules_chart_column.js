import React from 'react';
import Chart from 'react-apexcharts';
import OrganismsPageBar from '../organisms_navbar/page_bar'
import MoleculesFilterLimit from './molecules_filter_limit';
import MoleculesFilterOrder from './molecules_filter_order';

export default function MoleculesChartColumn({items, builder, maxPage, currentPage, ctx}) {
    //Initial variable
    var chart = [];

    //Converter
    const data = Object.values(items).reverse()

    function getSeries(val, type){
        let catSeries = [];
        val.forEach(e => { 
            catSeries.push(parseInt(e[type]))
        })
        return catSeries
    }

    function buildSeries(builder){
        let series = []
        builder.forEach(e => {
            series.push(
                {
                    name: e['column_name'],
                    data: getSeries(data, e['object_name'])
                }
            )
        })

        return series
    }

    function getCategory(val){
        let catData = []
        val.forEach(e => { 
            catData.push(e.context)
        })
        return catData
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    chart = {
        series: buildSeries(builder),
        options: {
            chart: {
                height: 350,
                type: 'bar',
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    dataLabels: {
                    position: 'top', // top, center, bottom
                    },
                }
            },
            dataLabels: {
                enabled: false,
            },
            
            xaxis: {
            categories: getCategory(data),
            position: 'top',
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            crosshairs: {
                fill: {
                type: 'gradient',
                gradient: {
                        colorFrom: '#D8E3F0',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                    }
                }
            },
            tooltip: {
                enabled: true,
            }
            },
            yaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
                formatter: function (val) {
                return numberWithCommas(val);
                }
            }
            
            }
        }
    };

    return (
        <div className='custom-tbody' style={{overflowY:"hidden"}}>
            <MoleculesFilterOrder ctx={ctx}/>
            <MoleculesFilterLimit ctx={ctx} type={"table"}/>
            <div className="mt-4">
                <Chart
                    options={chart.options}
                    series={chart.series}
                    type="bar"
                    height="550"
                />
            </div>
            <OrganismsPageBar key={1} curr={currentPage} max={maxPage} ctx={ctx}/>
        </div>
    );
}
  