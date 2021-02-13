import React from 'react'
import NavTitle from '../NavTitle';

export default function ViewHistory(props) {
    return (
        <>
            <NavTitle title={'Последние просматриваемые'}/>

            <ul className="nav flex-column mb-2 group">
                <li className="nav-item list-group-item">
                    <span className="nav-link">
                            Максим Анатольевич
                    </span>
                </li>
                <li className="nav-item list-group-item">
                    <span className="nav-link">
                            Серьгей Дмитриевич
                    </span>
                </li>
                <li className="nav-item list-group-item">
                    <span className="nav-link">
                            Ольга Арбузова
                    </span>
                </li>
                <li className="nav-item list-group-item">
                    <span className="nav-link">
                            Максимус Валькиш
                    </span>
                </li>
            </ul>
        </>
    )
}