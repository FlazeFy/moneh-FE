import React from 'react'
import Axios from "axios"
import MoleculesFilterOrder from './molecules_filter_order'
import { parseJSON } from '../modules/helpers/decode'
import { getCleanTitleFromCtx, removeHTMLTags, ucFirstChar } from '../modules/helpers/converter'
import AtomsButton from '../atoms/atoms_button'
import OrganismsPageBar from '../organisms/organisms_page_bar'
import OrganismsManageModal from '../organisms/organisms_manage'
import MoleculesCurrency from './molecules_currency'
import Swal from 'sweetalert2'

export default function MoleculesTable({builder, items, maxPage, currentPage, ctx, urlPut, urlDel, onPostSuccess}) {
    const getExtraDesc = (ext, val) => {
        if(Array.isArray(ext)){
            let start, end
            ext.forEach(el => {
                if(el.pos === 'start'){
                    start = el.desc
                } else if(el.pos === 'end'){
                    end = el.desc
                }
            });
            return `${start}${val}${end}`
        } else {
            if(ext !== null){
                if(ext['pos'] === "start"){
                    return `${ext['desc']}${val}`
                } else if(ext['pos'] === "end") {
                    return `${val}${ext['desc']}`
                } 
            } else {
                return val
            }
        }
    }

    const deleteItem = async (e, id, url) => {
        Swal.fire({
            title: "Are you sure?",
            text: `want to delete this ${getCleanTitleFromCtx(ctx)}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete it!",
            cancelButtonText: "No, Cancel!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                e.preventDefault()
                Swal.showLoading()

                try {
                    const response = await Axios.delete(url)

                    Swal.close()
                    if (response.data.status === 200) {
                        Swal.fire({ 
                            icon: "success", 
                            title: "Success", 
                            text: response.data.message 
                        })
                        if (onPostSuccess) onPostSuccess()
                    } else {
                        Swal.fire({ 
                            icon: "error", 
                            title: "Oops...", 
                            text: response.data.message 
                        })
                    }
                } catch (err) {
                    Swal.close()
                    Swal.fire({ 
                        icon: "error", 
                        title: "Oops...", 
                        text: "Something went wrong!" 
                    })
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: "Cancelled",
                    text: `Delete ${getCleanTitleFromCtx(ctx)} dismissed`,
                    icon: "error"
                })
            }
        })
    };

    return (
        <div>
            <MoleculesFilterOrder ctx={ctx} onPostSuccess={onPostSuccess}/>
            <table className="table">
                <thead>
                    <tr key={"a"}>
                    {
                        builder.map((val, idx) => {
                            return (
                                <th key={idx}><b>{val['column_name']}</b></th>
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
                                            if(item[build['column_name']] !== 'Manage' && item[build['object_name']] !== null){
                                                if(build['type'] === "html"){
                                                    return (
                                                        <td key={`tbody_${idx}_${jdx}`}>{ucFirstChar(removeHTMLTags(item[build['object_name']]))}</td>
                                                    );
                                                } else if(build['type'] === "tag"){
                                                    if(item[build['object_name']] !== ""){
                                                        const tags = parseJSON(item[build['object_name']])
                                                        return (
                                                            <td className='p-3' key={`tbody_${idx}_${jdx}`}>
                                                                {
                                                                    tags && tags.length > 0 ?
                                                                        tags.map((tag, jdx) => {
                                                                            return <AtomsButton button_type="tag" key={jdx} slug={tag['slug_name']} title={tag['tag_name']}/>
                                                                        })
                                                                    : 
                                                                        <span className='fst-italic'>- No Tag Found -</span>
                                                                }
                                                            </td>
                                                        );
                                                    } else {
                                                        return <td className='p-3' key={`tbody_${idx}_${jdx}`}>-</td>
                                                    }
                                                } else if(build['type'] === "image"){
                                                    return (
                                                        <td className='p-3' key={`tbody_${idx}_${jdx}`}>
                                                            <img className='img img-fluid img-profile' style={{width:"75px", height:"75px", borderWidth:"2.5px"}} src={item[build['object_name']]}/>
                                                        </td>
                                                    );
                                                } else {
                                                    let val = item[build['object_name']]
                                                    if(build['formatter'] === 'currency'){
                                                        val = <MoleculesCurrency val={val}/>
                                                    }

                                                    if(idx === 0){
                                                        return (
                                                            <td scope="row" key={`tbody_${idx}_${jdx}`}>{getExtraDesc(build['extra_desc'], val)}</td>
                                                        );
                                                    } else {
                                                        return (
                                                            <td key={`tbody_${idx}_${jdx}`}>{getExtraDesc(build['extra_desc'], val)}</td>
                                                        );
                                                    }
                                                }
                                            } else {
                                                return <td key={`tbody_${idx}_${jdx}`}><OrganismsManageModal builder={builder} items={item} id={idx} funPut={urlPut+item['id']} funDel={(e) => deleteItem(e, idx, urlDel+item['id'])} is_with_btn={true} onPostSuccess={onPostSuccess}/></td>
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
  