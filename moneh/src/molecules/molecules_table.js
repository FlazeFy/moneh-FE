import React from 'react'
import Axios from "axios"

import OrganismsPageBar from '../organisms/page_bar'
import GetOrdering from '../components/controls/ordering'
import GetManageModal from '../components/modals/manage'
import { parseJSON } from '../modules/helpers/decode'
import GetButtonTag from '../components/buttons/tag'
import { removeHTMLTags, ucFirstChar } from '../modules/helpers/converter'

export default function MoleculesTable({builder, items, maxPage, currentPage, ctx, urlPut, urlDel}) {
    function getExtraDesc(ext, val){
        if(ext != null){
            if(ext['pos'] == "start"){
                return `${ext['desc']} ${val}`
            } else if(ext['pos'] == "end") {
                return `${val} ${ext['desc']}`
            } 
        } else {
            return val
        }
    }

    const deleteItem = async (e, url) => {
        e.preventDefault();
        try {
            await Axios.delete(url)
        } catch (err) {
            alert(err)
        }
        window.location.reload(false)
    };

    return (
        <div>
            <GetOrdering ctx={ctx}/>
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
                                                                            return (
                                                                                <GetButtonTag key={jdx} slug={tag['slug_name']} name={tag['tag_name']}/>
                                                                            );
                                                                        })
                                                                    : 
                                                                        <span className='fst-italic'>- No Tag Found -</span>
                                                                }
                                                            </th>
                                                        );
                                                    } else {
                                                        return (
                                                            <th className='p-3' key={`tbody_${idx}_${jdx}`}>-</th>
                                                        )
                                                    }
                                                } else if(build['type'] == "image"){
                                                    return (
                                                        <th className='p-3' key={`tbody_${idx}_${jdx}`}>
                                                            <img className='img img-fluid img-profile' style={{width:"75px", height:"75px", borderWidth:"2.5px"}} src={item[build['object_name']]}/>
                                                        </th>
                                                    );
                                                } else {
                                                    if(idx == 0){
                                                        return (
                                                            <th scope="row" key={`tbody_${idx}_${jdx}`}>{getExtraDesc(build['extra_desc'], item[build['object_name']])}</th>
                                                        );
                                                    } else {
                                                        return (
                                                            <th key={`tbody_${idx}_${jdx}`}>{getExtraDesc(build['extra_desc'], item[build['object_name']])}</th>
                                                        );
                                                    }
                                                }
                                            } else {
                                                return (
                                                    <th key={`tbody_${idx}_${jdx}`}><GetManageModal builder={builder} items={item} id={idx} funPut={urlPut+item['id']} funDel={(e) => deleteItem(e, urlDel+item['id'])} is_with_btn={true}/></th>
                                                );
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
  