import AtomsText from "../atoms/atoms_text";
import { ucFirstWord } from "../modules/helpers/converter";
import MoleculesCurrency from "../molecules/molecules_currency";
import OrganismsManageModal from "./organisms_manage";


export default function OrganismsWishlistBox(props){
    const builder = [
        {
            column_name: "Type",
            object_name: "wishlists_type",
            extra_desc: null,
            type: 'select',
            class: 'form-control',
            label: 'Wishlist Type',
            placeholder: 'Type wishlist type',
            url: 'http://127.0.0.1:1323/api/v1/dct/wishlists_type?page=1'
        },
        {
            column_name: "Name",
            object_name: "wishlists_name",
            extra_desc: null,
            type: 'text',
            class: 'form-control',
            label: 'Wishlist Name',
            placeholder: 'Type wishlist name',
            is_required: true,
            is_obsecure: false,
            max: 75,
        },
        {
            column_name: "Description",
            object_name: "wishlists_desc",
            extra_desc: null,
            type: 'textarea',
            class: 'form-control',
            label: 'Wishlist Description',
            is_required: true,
            max: 500,
        },
        {
            column_name: "Price",
            object_name: "wishlists_price",
            extra_desc: null,
            type: 'number',
            class: 'form-control',
            label: 'Wishlist Price',
            placeholder: 'Type wishlist price',
            is_required: true,
            max: 36,
        },
        {
            column_name: "Priority",
            object_name: "wishlists_priority",
            extra_desc: null,
            type: 'select',
            class: 'form-control',
            label: 'Wishlist Priority',
            placeholder: 'Type wishlist priority',
            url: [
                {
                    "dictionaries_name": "high"
                },
                {
                    "dictionaries_name": "medium"
                },
                {
                    "dictionaries_name": "low"
                }
            ],
        },
        {
            type: 'checkbox',
            column_name: "Is Achieved",
            object_name: "is_achieved",
            class: 'form-check-input',
            label: 'Is Achieved',
        },
        {
            column_name: "Manage",
            object_name: null,
            extra_desc: null
        }
    ]

    const getPriorityBackground = (val) => {
        if(val === "high"){
            return "bg-danger-light"
        } else if(val === "medium"){ 
            return "bg-warning-light"
        } else if(val === "low"){ 
            return "bg-success-light"
        }
    }

    return <>
        <OrganismsManageModal builder={builder} items={props.val} id={props.idx} is_with_btn={false}/>
        <button className={"wish-box "+getPriorityBackground(props.val['wishlists_priority'])} data-bs-toggle="modal" data-bs-target={"#manageModal"+props.idx}>
            <span className="btn-tag position-absolute" style={{top:"-12.5px", right:"-12.5px"}}>{ucFirstWord(props.val['wishlists_type'])}</span>
            {
                props.val['wishlists_img_url'] ? <img className="wish-img" src={props.val['wishlists_img_url']}/> : <span className="no_data"><img className="wish-img" src='/assets/box.png'/></span>
            }
            <div className='container-white py-2'>
                <AtomsText text_type="mini_sub_heading" body={props.val['wishlists_name']}/>
                <p>{props.val['wishlists_desc']}</p>
                <div className="text-start">
                    <AtomsText text_type="main_content" body="Price"/>
                    <AtomsText text_type="mini_sub_heading" body={<span className="text-primary fw-bold"><MoleculesCurrency val={props.val['wishlists_price']}/></span>}/>
                </div>
            </div>
        </button>
    </>
}