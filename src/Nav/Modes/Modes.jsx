import React from 'react'
import NavTitle from '../NavTitle';

export default function Modes (props) {
    const {setOrders, hc, modes} = props

    const getParams = function (param) {
        if (param === 'Все заказыa') {
            return {}
        }
        return { status: param }
    }

    const userSort = async (title) => {
        const userList = await hc.get("/posts", getParams(title));
        console.log(userList)
        setOrders(userList);
    };

    const modeList = []

    modes.forEach((mod, i) => {

        const modePoint = (
            <li key={i} className={'nav-item'}>
                <span className={`nav-link btn ${mod.className}`} onClick={()=>userSort(mod.name)}>
                    {mod.name}
                </span>
            </li>
        )

        modeList.push(modePoint)
    })

    return (
        <>
            <NavTitle title={'Режимы'}/>

            <ul className="nav flex-column">
                {modeList}
            </ul>
        </>
    )
}