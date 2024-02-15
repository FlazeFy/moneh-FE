import React from 'react'
import Axios from "axios"

import PageBar from '../bars/page_bar'
import GetOrdering from '../controls/ordering'
import GetManageModal from '../modals/manage'
import { parseJSON } from '../../modules/helpers/decode'
import GetButtonTag from '../buttons/tag'
import { removeHTMLTags, ucFirstChar } from '../../modules/helpers/converter'

export default function GetGeneralTable({builder, items, maxPage, currentPage, ctx, urlPut, urlDel}) {
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
                        builder.map((val, i, index) => {
                            return (
                                <td key={i}><b>{val['column_name']}</b></td>
                            );
                        })
                    }
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((item, i, idx) => {
                            return (
                                <tr key={i}>
                                {
                                    builder.map((build, j, ins) => {
                                        if(item[build['column_name']] != 'Manage' && item[build['object_name']] != null){
                                            if(build['type'] == "html"){
                                                return (
                                                    <th>{ucFirstChar(removeHTMLTags(item[build['object_name']]))}</th>
                                                );
                                            } else if(build['type'] == "tag"){
                                                if(item[build['object_name']] != ""){
                                                    const tags = parseJSON(item[build['object_name']])
                                                    return (
                                                        <th className='p-3'>
                                                            {
                                                                tags.map((tag, j, ins) => {
                                                                    return (
                                                                        <GetButtonTag key={j} slug={tag['slug_name']} name={tag['tag_name']}/>
                                                                    );
                                                                })
                                                            }
                                                        </th>
                                                    );
                                                } else {
                                                    return (
                                                        <th className='p-3'>-</th>
                                                    )
                                                }
                                            } else if(build['type'] == "image"){
                                                return (
                                                    <th className='p-3'>
                                                        <img className='img img-fluid img-profile' style={{width:"75px", height:"75px", borderWidth:"2.5px"}} src={item[build['object_name']]}/>
                                                    </th>
                                                );
                                            } else {
                                                if(i == 0){
                                                    return (
                                                        <th scope="row" key={j}>{getExtraDesc(build['extra_desc'], item[build['object_name']])}</th>
                                                    );
                                                } else {
                                                    return (
                                                        <th key={j}>{getExtraDesc(build['extra_desc'], item[build['object_name']])}</th>
                                                    );
                                                }
                                            }
                                        } else {
                                            return (
                                                <th key={j}><GetManageModal builder={builder} items={item} id={i} funPut={urlPut+item['id']} funDel={(e) => deleteItem(e, urlDel+item['id'])}/></th>
                                            );
                                        }
                                    })
                                }
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            <PageBar curr={currentPage} max={maxPage} ctx={ctx}/>
        </div>
    );
}
  