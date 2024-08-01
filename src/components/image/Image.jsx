import React from 'react'
import { ReactComponent as Clear } from '../../assets/close-circle.svg'
export const ImageComponent = ({ image, loading, setImage }) => {
    return (
        <div className="image-container">
            {image && <img src={image} alt="Uploaded" className="uploaded-image" />}
            {loading && <div className="scanning-overlay"></div>}
            <Clear className='clear' onClick={() => setImage(null)} />

        </div>

    )
}
