import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, keyword, isAdmin }) => {
    return pages > 1 && (
        <>
            <Pagination style={{ justifyContent: 'center' }}>
                {[...Array(pages).keys()].map(n =>
                    <LinkContainer key={n + 1} to=
                        {isAdmin ? `/admin/productlist/${n + 1}` :
                            keyword ? `/search/${keyword}/page/${n + 1}` :
                                `/page/${n + 1}`
                        }>
                        <Pagination.Item active={n + 1 === page}>{n + 1}</Pagination.Item>
                    </LinkContainer>
                )}
            </Pagination>
        </>
    )
}

export default Paginate
