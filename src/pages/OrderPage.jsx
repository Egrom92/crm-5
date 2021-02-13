import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { NavLink, useParams, useHistory } from "react-router-dom";
import hc from "../hc";
import { statuses } from "../data";

export default function OrderPage(props) {
  const params = useParams();
  const history = useHistory();
  const orderId = parseInt(params.orderId);

  const [id, setId] = useState(0);
  const [fullname, setFullname] = useState("");
  const [status, setStatus] = useState("new");
  const [createdAt, setCreatedAt] = useState(0);
  const [productId, setProductId] = useState(0);
  const [products, setProducts] = useState([]);

  /* ... */

  useEffect(() => {
    hc.get("/products", { _limit: 1000 }).then((products) =>
      setProducts(products)
    );
  }, []);

  useEffect(() => {
    hc.get(`/orders/${orderId}`).then((order) => {
      setId(order.id);
      setFullname(order.fullname);
      setProductId(order.productId);
      setCreatedAt(order.createdAt);
      setStatus(order.status);
    });
  }, [orderId]);

  const saveChanges = (e) => {
    e.preventDefault();

    const order = {
      fullname,
      productId: +productId,
      status,
      createdAt
    };

    Promise.resolve()
      .then(() => hc.patch(`/orders/${id}`, order))
      .then(() => props.onSave(id))
      .then(() => history.push("/"));
    // .then(() => hc.get("/orders", { _limit: 1000 }))
    // .then((orders) => setOrders(orders));
  };

  const deleteOrder = () => {
    hc.delete(`/orders/${id}`).then(() => props.onDelete(id));
  };

  const date = new Date(createdAt);

  const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

  return (
    <main
      role="main"
      className="ml-sm-auto col-lg-12 px-4 d-flex flex-column p-2"
    >
      <div className="card">
        <div className="card-header">
          <h2>{fullname}</h2>
        </div>
        <div className="card-body">
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">ID:</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control-plaintext"
                readOnly
                value={id}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">ФИО:</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Заказ:</label>
            <div className="col-sm-10">
              <select
                className="form-control"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              >
                {products.map((product, i) => (
                  <option key={i + 1} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Дата:</label>
            <div className="col-sm-10">
              <input
                type="date"
                className="form-control"
                value={dateString}
                onChange={(e) =>
                  setCreatedAt(new Date(e.target.value).getTime())
                }
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Статус:</label>
            <div className="col-sm-10">
              <select
                className="form-control"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {statuses.map((status, i) => (
                  <option key={i + 1} value={status.value}>
                    {status.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-end">
          <NavLink
            to="/"
            className="btn btn-outline-danger mr-2"
            onClick={deleteOrder}
            disabled={id === 0}
          >
            Удалить заказ
          </NavLink>
          <NavLink
            to="/"
            className="btn btn-success"
            onClick={saveChanges}
            disabled={id === 0}
          >
            Сохранить
          </NavLink>
        </div>
      </div>
    </main>
  );
}

OrderPage.propTypes = {
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

OrderPage.defaultProps = {
  onSave: () => {},
  onDelete: () => {}
};
