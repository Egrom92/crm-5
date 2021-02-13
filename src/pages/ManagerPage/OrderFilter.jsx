import React, {useState, useEffect} from 'react'
import hc from "../../hc";
import { statuses } from "../../data";
import {useHistory} from 'react-router-dom';

export default function OrderFilter(props) {
    const history = useHistory();

    const {setOrders, setQueryParams, queryParams} = props

    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState('all');
    const [status, setStatus] = useState("all");
    const [fullName, setFullName] = useState('');


    const userSort = async (title, direction) => {
        const userList = await hc.get("/users", {
            _sort: title,
            _order: direction
        });

        setOrders(userList);
    };

    // const getQueryParams = () => {
    //     let queryes = history.location.search.slice(1).split('&')
    //
    //     queryes = queryes.map(el => el.split('='))
    //     let result = queryes.reduce((acc, item) => {
    //         acc[item[0]] = item[1]
    //
    //         return acc
    //     }, {})
    //     setQueryParams(result)
    // }

    useEffect(() => {
        hc.get("/products", { _limit: 1000 }).then((products) =>
            setProducts(products)
        );
    }, []);

    const filterStatus = (e) => {
        const status = e.target.value;
        setStatus(status);


        history.push({
            pathname: '/',
            search: "?" + new URLSearchParams({status: status}).toString()
        });

        hc.get("/orders", {status: status}).then((orders) => setOrders(orders))
    };

    const filterOrder = (e) => {
        const productId = e.target.value
        setProductId(productId);

        history.push({
            pathname: '/',
            search: "?" + new URLSearchParams({productId: productId}).toString()
        })

        hc.get("/orders", {productId: productId}).then((orders) => setOrders(orders))
    };

    const filterFullname = (e) => {
        const newFullName = e.target.value
        console.log(newFullName)
        
        setFullName(newFullName)

        hc.get("/orders", {fullname: fullName}).then((orders) => setOrders(orders))
    }

    return (
        <div className="form-row p-2">
            <div className="form-group col">
                <label>ФИО:</label>
                <input onInput={(e) => filterFullname(e)} className="form-control" type="text" placeholder="ФИО"/>
            </div>
            <div className="form-group col">
                <label>Заказ:</label>
                <select
                    className="form-control"
                    value={productId}
                    onChange={(e) => filterOrder(e)}
                >
                    <option key={0} value={"all"}>
                        Все
                    </option>
                    {products.map((product, i) => (
                        <option key={i + 1} value={product.id}>
                            {product.name}
                        </option>
                    ))}
                </select>

            </div>
            <div className="form-group col">
                <label>Статус:</label>
                <select
                    className="form-control"
                    value={status}
                    onChange={(e) => filterStatus(e)}
                >
                    <option key={0} value={"all"}>
                        Все
                    </option>
                    {statuses.map((status, i) => (
                        <option key={i + 1} value={status.value}>
                            {status.name}
                        </option>
                    ))}
                </select>


            </div>
            <div className="form-group col">
                <label>Сумма:</label>
                <input className="form-control mb-2" type="number" placeholder="От"/>
                <input className="form-control" type="number" placeholder="До"/>
            </div>
            <div className="form-group col">
                <label>Дата:</label>
                <input className="form-control mb-2" type="date"/>
                <input className="form-control" type="date"/>
            </div>
        </div>
    )
}