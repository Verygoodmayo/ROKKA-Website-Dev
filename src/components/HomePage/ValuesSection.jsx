
import arrowRight from '../../../static/svg/Arrow_Right.svg'
import arrowLeft from '../../../static/svg/Arrow_Left.svg'
import { useLayoutEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/all'
import gsap from 'gsap'

export default function ValuesSection() {

    
    const image1 = useRef()
    const image2 = useRef()
    const image3 = useRef()
    const imagesArray = [image1, image2, image3]
    const index = 0
    const currentImage = imagesArray[index]

    const number= useRef()

    const card1 = useRef()
    const card2 = useRef()
    const card3 = useRef()
    const cardsArray = [card1, card2, card3]

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        let ctx = gsap.context(() => {
            let timeline = gsap.timeline({
                
            })
        })

        return () => ctx.revert();
    })

    return (
        <div
            id="values-container"
            className="section"
        >
            <div id="wrapper">
                <div id="header">
                    <p>
                        {'We Believe In'}
                    </p>
                </div>
                <div id="content">
                    <div id="info">
                        <p>
                            {'We want to communicate three pillars for company. these three values reflects on to our product and any project we participate in.'}
                        </p>
                        <span id="index">
                            {(index+1)}
                        </span>
                    </div>
                    <div id="main">
                        <div className="value-nav" id="value-nav-left">
                            <img id="nav-left-image" className="nav-image" src={arrowLeft}></img>
                        </div>
                        <div id='main-wrapper'></div>
                        <div className="value-nav" id="value-nav-right">
                            <img id="nav-left-image" className="nav-image" src={arrowRight}></img>
                        </div>
                    </div>
                    <div id="image">
                        <div ref={image1} id="value-image-container-0" className="value-image-container">
                            <img id="value-imag-0" className="value-image"></img>
                        </div>
                        <div ref={image2} id="value-image-container-1" className="value-image-container">
                            <img id="value-imag-1" className="value-image"></img>
                        </div>
                        <div ref={image3} id="value-image-container-2" className="value-image-container">
                            <img id="value-imag-2" className="value-image"></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}