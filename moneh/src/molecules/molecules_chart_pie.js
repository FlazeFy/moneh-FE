import React from 'react';
import Chart from 'react-apexcharts';
import { formatCurrency } from '../modules/helpers/converter';
import MoleculesFilterLimit from './molecules_filter_limit';
import { cleanSlugToText } from '../modules/helpers/converter';

export default function MoleculesChartPie({items, filter_name, is_currency, is_slug}){
    //Initial variable
    var chart = [];

    //Converter
    const data = Object.values(items);

    function getSeries(val){
        let catSeries = [];
        val.forEach(e => { 
            catSeries.push(parseInt(e.total));
        });
        return catSeries;
    }

    function getCategory(val){
        let catData = [];
        val.forEach(e => { 
            catData.push(is_slug ? cleanSlugToText(e.context) : e.context);
        });
        return catData;
    }

    chart = {
        series: getSeries(data),
        options: {
            labels: getCategory(data),
            tooltip: {
                y: {
                    formatter: function (val) {
                        return is_currency ? formatCurrency(val) : val
                    }
                }
            }
        }
    };

    return (
        <div className='custom-tbody' style={{padding:"6px"}}>
            <div className="me-4">
                {
                    filter_name ? 
                        <MoleculesFilterLimit ctx={filter_name} type={"pie"}/>
                    :
                        <></>
                }
                <Chart
                    options={chart.options}
                    series={chart.series}
                    type="pie"
                />
            </div>
        </div>
    );
}