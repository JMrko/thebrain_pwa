import React, {Component}from 'react'
import 'styles/Sistema/Prueba/Prueba.css'
import ImagenUno from '../../../assets/Prueba/images/1.jpg'
import ImagenDos from '../../../assets/Prueba/images/2.jpg'
import ImagenTres from '../../../assets/Prueba/images/3.jpg'
import ImagenCuatro from '../../../assets/Prueba/images/4.jpg'
import ImagenCinco from '../../../assets/Prueba/images/5.jpg'
// import './scrip'
class Prueba extends Component {
    constructor(){
        super();
        this.state = {
            subioArchivo : false,
        }
        this.seleccionarBoton = this.seleccionarBoton.bind(this)
    }

    seleccionarBoton(event){
        let leftPosition = "a"

        const btn = event.currentTarget;
        const slickList = event.currentTarget.parentNode;
        const track = event.currentTarget.parentNode.querySelector('#track');
        const slick = track.querySelectorAll('.slick');

        const slickWidth = slick[0].offsetWidth;
        
        const trackWidth = track.offsetWidth;
        const listWidth = slickList.offsetWidth;

        console.log("TRACK:")
        console.log(track)
        console.log(track.style)
        console.log(track.style.left)

        track.style.left == ""  
        ? leftPosition = track.style.left = 0 
        : leftPosition = parseFloat(track.style.left.slice(0, -2) * -1);

        btn.dataset.button == "button-prev" 
        ? this.prevAction(leftPosition,slickWidth,track) 
        : this.nextAction(leftPosition,trackWidth,listWidth,slickWidth,track)
    }

    prevAction(leftPosition,slickWidth,track){
        if(leftPosition > 0) {
            console.log("entro 2")
            track.style.left = `${-1 * (leftPosition - slickWidth)}px`;
        }
    }

    nextAction(leftPosition,trackWidth,listWidth,slickWidth,track){
        if(leftPosition < (trackWidth - listWidth)) {
            track.style.left = `${-1 * (leftPosition + slickWidth)}px`;
        }
    }

    render() {
        return (
            <div>
                <div className="Carousel">
                    <div className="slick-list" id="slick-list">
                        <button 
                            className="slick-arrow slick-prev" 
                            id="button-prev" 
                            data-button="button-prev" 
                            onClick={(e) => this.seleccionarBoton(e)}
                        >
                            <svg 
                                aria-hidden="true" 
                                focusable="false" 
                                data-prefix="fas" 
                                data-icon="chevron-left" 
                                className="svg-inline--fa fa-chevron-left fa-w-10" 
                                role="img" 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 320 512">
                                    <path 
                                        fill="currentColor" 
                                        d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z">
                                    </path>
                            </svg>
                        </button>
                        <div className="slick-track" id="track">
                            {
                                [ImagenUno,ImagenDos, ImagenTres, ImagenCuatro, ImagenCinco, ImagenUno, ImagenCuatro, ImagenCinco].map((imagen) => {
                                    return (
                                        <div className="slick">
                                            <div id="Tarjeta-SubMenu-Youtube-Dashboard">
                                                {"KC: Sell In & Sell Out (Performance YTD - Soles NIV)"}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <button 
                            className="slick-arrow slick-next" 
                            id="button-next" 
                            data-button="button-next" 
                            // onclick="app.processingButton(event)"
                            onClick={(e) => this.seleccionarBoton(e)}
                        >
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" className="svg-inline--fa fa-chevron-right fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Prueba;