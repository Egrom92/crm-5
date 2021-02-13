import React from 'react'
import hc from '../../hc';


export default function Pagination(props) {
    const {pageSelect, page, pages} = props;
    const pagination = [];


    console.log(hc.getAndCount("/orders"))

    for (let i = 0; i <= pages; i++) {

        let span = '';
        let p = i;
        if (i === 0 ) {
            span = 'Назад';
            p = page - 1;
        } else if (i === pages) {
            span = 'Вперед';
            p = page + 1;
        } else {
            span = i
        }

        const li = (
            <li key={i} className={`page-item ${
                i === page ? 'active' : '' }`} onClick={() => pageSelect(p)}>
                <span className={'page-link'}>
                    {span}
                </span>
            </li>
        )
        pagination.push(li)
    }
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                    <span className="page-link"
                          tabIndex="-1"
                          aria-disabled="true"
                    >Назад</span>
                </li>
                {pagination}
                <li className="page-item">
                    <span className="page-link">Вперед</span>
                </li>
            </ul>
        </nav>
    )
}