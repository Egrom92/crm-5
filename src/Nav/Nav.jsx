import React from 'react'
import Modes from './Modes/Modes'
import History from './ViewHistory/ViewHistory'

export default function Nav(props) {
    const {
        modes,
        hc,
        setOrders
    } = props;

    return (
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
                <Modes
                    modes={modes}
                    hc={hc}
                    setOrders={setOrders}
                />
                <History/>
            </div>
        </nav>
    )
}