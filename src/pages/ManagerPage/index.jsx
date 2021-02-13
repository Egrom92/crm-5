import React, { useState, useEffect } from "react";
import OrderFilter from "./OrderFilter";
import Orders from "./Orders";
import { NavLink } from "react-router-dom";
import hc from "../../hc";
import Pagination from "./Pagination";

export default function Table(props) {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [queryParams, setQueryParams] = useState([])

  useEffect(() => {
    hc.get("/products", { _limit: 1000 }).then((products) =>
      setProducts(products)
    );
  }, []);

  useEffect(() => {
    hc.get("/orders", queryParams).then((orders) => setOrders(orders));
  }, []);

  return (
    <main
      role="main"
      className="col-md-9 ml-sm-auto col-lg-10 px-4 d-flex flex-column"
    >
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Заказы</h1>
        <NavLink to="/new" className="btn btn-outline-success">
          Добавить заказ
        </NavLink>
      </div>

      <OrderFilter queryParam={queryParams} setQueryParams={setQueryParams} setOrders={setOrders} orders={orders} />

      <Orders orders={orders} products={products} />

      <Pagination orders={orders} setOrders={setOrders} />
    </main>
  );
}
