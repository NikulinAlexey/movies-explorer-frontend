import React from 'react'
import './Preloader.css'

const Preloader = ({
    isSpinnerVisible,
}) => {
    return (
        isSpinnerVisible &&
        <div className="preloader">
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader
