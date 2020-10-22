import React from 'react'
import PropTypes from 'prop-types'

const Rating = ({ rating, color, text }) => {
    return (
        <>
            <span>
                <i
                    style={{ color }}
                    className={
                        rating >= 1 ? 'fas fa-star' :
                            rating >= 0.5 ? 'fas fa-star-half-alt' :
                                'far fa-star'}>
                </i>
            </span>
            <span>
                <i
                    style={{ color }}
                    className={
                        rating >= 2 ? 'fas fa-star' :
                            rating >= 1.5 ? 'fas fa-star-half-alt' :
                                'far fa-star'}>
                </i>
            </span>
            <span>
                <i
                    style={{ color }}
                    className={
                        rating >= 3 ? 'fas fa-star' :
                            rating >= 2.5 ? 'fas fa-star-half-alt' :
                                'far fa-star'}>
                </i>
            </span>
            <span>
                <i
                    style={{ color }}
                    className={
                        rating >= 4 ? 'fas fa-star' :
                            rating >= 3.5 ? 'fas fa-star-half-alt' :
                                'far fa-star'}>
                </i>
            </span>
            <span>
                <i
                    style={{ color }}
                    className={
                        rating >= 5 ? 'fas fa-star' :
                            rating >= 4.5 ? 'fas fa-star-half-alt' :
                                'far fa-star'}>
                </i>
            </span>
            <span className='mx-1'>{text && text}</span>
        </>
    )
}

Rating.defultProps = {
    rating: 0
}

Rating.propTypes = {
    color: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
}

export default Rating
