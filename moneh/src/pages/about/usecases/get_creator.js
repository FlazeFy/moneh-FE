import React from 'react'
import { useState, useEffect } from "react"
import { getLocal } from '../../../modules/storages/local'
import AtomsBreakLine from '../../../atoms/atoms_breakline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { faFacebook, faGithub, faInstagram, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import AtomsText from '../../../atoms/atoms_text'
import MoleculesAlertBox from '../../../molecules/molecules_alert_box'

export default function GetCreator({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [itemsCreator, setItemsCreator] = useState([])
    const [itemsSocial, setItemsSocial] = useState([])

    useEffect(() => {
        fetch(`https://leonardhors.site/api/user`)
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true)
                setItemsCreator(result)        
            },
            (error) => {
                if(getLocal(ctx + "_sess") !== undefined){
                    setIsLoaded(true)
                    setItemsCreator(JSON.parse(getLocal(ctx + "_sess")))
                } else {
                    setIsLoaded(true)
                    setError(error)
                }
            }
        )
    },[])

    useEffect(() => {
        fetch(`https://leonardhors.site/api/social`)
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true)
                setItemsSocial(result)        
            },
            (error) => {
                if(getLocal(ctx + "_sess") !== undefined){
                    setIsLoaded(true)
                    setItemsSocial(JSON.parse(getLocal(ctx + "_sess")))
                } else {
                    setIsLoaded(true)
                    setError(error)
                }
            }
        )
    },[])

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={ctx}/>
    } else if (!isLoaded) {
        return (
            <div>
                <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
            </div>
        )
    } else {
        return (
            <div className='mx-auto d-block text-center'> 
                {
                    itemsCreator.map((val, i, idx) => {
                        if(i === 0){
                            return (
                                <>
                                    <img className='img-profile' src='https://media.licdn.com/dms/image/D5603AQHbKizHEv_9fQ/profile-displayphoto-shrink_400_400/0/1693052510059?e=1709164800&v=beta&t=6To_YQYtD_3BKZqS6UWzAfgFNGqXNaaRFu3AMe2QdSQ'/>
                                    <AtomsBreakLine length={3} />
                                    <AtomsText text_type="main_heading" body={<>Hello there 👋, {val['greeting_bio']}</>}/>
                                    <h4 className='text-white'>{val['mini_bio']}</h4>
                                    <AtomsBreakLine length={1} />
                                    <p className='text-white'>{val['long_bio']}</p>
                                    <AtomsBreakLine length={1} />
                                </>
                            )
                        } else {
                            return <></>
                        }
                    })
                }
                {
                    itemsSocial.map((val, i, idx) => {
                        if(i === 0){
                            return (
                                <>
                                    <AtomsText text_type="main_heading" body="Contact Me"/>
                                    <AtomsBreakLine length={1} />
                                    <a className='btn btn-success p-3 me-3' href={val['facebook']} style={{borderRadius:"var(--roundedCircle)"}}><FontAwesomeIcon icon={faFacebook} size="xl"/></a>
                                    <a className='btn btn-success p-3 me-3' href={val['whatsapp']} style={{borderRadius:"var(--roundedCircle)"}}><FontAwesomeIcon icon={faWhatsapp} size="xl"/></a>
                                    <a className='btn btn-success p-3 me-3' href={val['github']} style={{borderRadius:"var(--roundedCircle)"}}><FontAwesomeIcon icon={faGithub} size="xl"/></a>
                                    <a className='btn btn-success p-3 me-3' href={val['instagram']} style={{borderRadius:"var(--roundedCircle)"}}><FontAwesomeIcon icon={faInstagram} size="xl"/></a>
                                    <a className='btn btn-success p-3 me-3' href={val['linkedin']} style={{borderRadius:"var(--roundedCircle)"}}><FontAwesomeIcon icon={faLinkedin} size="xl"/></a>
                                    <a className='btn btn-success p-3 me-3' href={'mailto: ' + val['email']} style={{borderRadius:"var(--roundedCircle)"}}><FontAwesomeIcon icon={faEnvelope} size="xl"/></a>
                                </>
                            )
                        } else {
                            return <></>
                        }
                    })
                }
            </div>
        )
    }
}
  