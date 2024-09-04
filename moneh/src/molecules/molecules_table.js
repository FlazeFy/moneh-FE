import React from 'react'
import Axios from "axios"

import MoleculesFilterOrder from './molecules_filter_order'
import { parseJSON } from '../modules/helpers/decode'
import { numberToPrice, removeHTMLTags, ucFirstChar } from '../modules/helpers/converter'
import AtomsButton from '../atoms/atoms_button'
import OrganismsPageBar from '../organisms/organisms_page_bar'
import OrganismsManageModal from '../organisms/organisms_manage'
import { commaThousandFormat } from '../modules/helpers/math'
import MoleculesCurrency from './molecules_currency'

export default function MoleculesTable({builder, items, maxPage, currentPage, ctx, urlPut, urlDel}) {
    const getExtraDesc = (ext, val) => {
        if(Array.isArray(ext)){
            let start, end
            ext.forEach(el => {
                if(el.pos == 'start'){
                    start = el.desc
                } else if(el.pos == 'end'){
                    end = el.desc
                }
            });
            return `${start}${val}${end}`
        } else {
            if(ext != null){
                if(ext['pos'] == "start"){
                    return `${ext['desc']}${val}`
                } else if(ext['pos'] == "end") {
                    return `${val}${ext['desc']}`
                } 
            } else {
                return val
            }
        }
    }

    const deleteItem = async (e, url) => {
        e.preventDefault()
        try {
            await Axios.delete(url)
        } catch (err) {
            alert(err)
        }
        window.location.reload(false)
    };

    return (
        <div>
            <MoleculesFilterOrder ctx={ctx}/>
            <table className="table">
                <thead>
                    <tr key={"a"}>
                    {
                        builder.map((val, idx) => {
                            return (
                                <td key={idx}><b>{val['column_name']}</b></td>
                            );
                        })
                    }
                    </tr>
                </thead>
                <tbody>
                    {
                        items && items.length > 0 ?
                            items.map((item, idx) => {
                                return (
                                    <tr key={idx}>
                                    {
                                        builder.map((build, jdx) => {
                                            if(item[build['column_name']] != 'Manage' && item[build['object_name']] != null){
                                                if(build['type'] == "html"){
                                                    return (
                                                        <th key={`tbody_${idx}_${jdx}`}>{ucFirstChar(removeHTMLTags(item[build['object_name']]))}</th>
                                                    );
                                                } else if(build['type'] == "tag"){
                                                    if(item[build['object_name']] != ""){
                                                        const tags = parseJSON(item[build['object_name']])
                                                        return (
                                                            <th className='p-3' key={`tbody_${idx}_${jdx}`}>
                                                                {
                                                                    tags && tags.length > 0 ?
                                                                        tags.map((tag, jdx) => {
                                                                            return <AtomsButton button_type="tag" key={jdx} slug={tag['slug_name']} title={tag['tag_name']}/>
                                                                        })
                                                                    : 
                                                                        <span className='fst-italic'>- No Tag Found -</span>
                                                                }
                                                            </th>
                                                        );
                                                    } else {
                                                        return <th className='p-3' key={`tbody_${idx}_${jdx}`}>-</th>
                                                    }
                                                } else if(build['type'] == "image"){
                                                    return (
                                                        <th className='p-3' key={`tbody_${idx}_${jdx}`}>
                                                            <img className='img img-fluid img-profile' style={{width:"75px", height:"75px", borderWidth:"2.5px"}} src={item[build['object_name']]}/>
                                                        </th>
                                                    );
                                                } else {
                                                    let val = item[build['object_name']]
                                                    if(build['formatter'] == 'currency'){
                                                        val = <MoleculesCurrency val={val}/>
                                                    }

                                                    if(idx == 0){
                                                        return (
                                                            <th scope="row" key={`tbody_${idx}_${jdx}`}>{getExtraDesc(build['extra_desc'], val)}</th>
                                                        );
                                                    } else {
                                                        return (
                                                            <th key={`tbody_${idx}_${jdx}`}>{getExtraDesc(build['extra_desc'], val)}</th>
                                                        );
                                                    }
                                                }
                                            } else {
                                                return <th key={`tbody_${idx}_${jdx}`}><OrganismsManageModal builder={builder} items={item} id={idx} funPut={urlPut+item['id']} funDel={(e) => deleteItem(e, urlDel+item['id'])} is_with_btn={true}/></th>
                                            }
                                        })
                                    }
                                    </tr>
                                );
                            })
                        :
                            <tr>
                                <td>No Data</td>
                            </tr>
                    }
                </tbody>
            </table>
            <OrganismsPageBar curr={currentPage} max={maxPage} ctx={ctx}/>
        </div>
    );
}
  