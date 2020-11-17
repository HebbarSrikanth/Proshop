import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keyword }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keyword' content={keyword} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome to ProShop | Home',
    description: 'We sell the best products',
    keyword: 'electronics,buy electronics,because its the revolution',
}

export default Meta
