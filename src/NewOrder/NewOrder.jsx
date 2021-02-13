import React, { useState } from "react";

export default function NewOrder(props) {
  const { hc, products, addNewOrder } = props;

  const [activeProduct, setActiveProduct] = useState("default");
  const [order, setOrder] = useState({});
  const [fullname, setFullname] = useState("");

  const changeActiveProduct = function (e) {
    setActiveProduct(e.target.value);
  };

  const changeOrder = () => {
    products.forEach((product) => {
      if (product.value !== activeProduct) {
        return;
      }

      const date = new Date();
      const dateTime = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
      product.client = fullname;
      product.status = "new";
      product.datetime = dateTime;
      setOrder(product);
    });
  };

  const sendNewOrder = () => {
    changeOrder();
    if (order.client) {
      addNewOrder(order);
    }
  };

  return (
    <div className="d-flex justify-content-center" style={{ height: "100vh" }}>
      <div className="d-flex flex-column justify-content-center">
        <div className="card" style={{ width: 500 }}>
          <div className="card-header">
            <h2>Новый заказ</h2>
          </div>
          <div className="card-body">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">ФИО:</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  value={client}
                  onInput={(e) => setFullname(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Заказ:</label>
              <div className="col-sm-9">
                <select
                  className="form-control"
                  value={activeProduct}
                  onChange={changeActiveProduct}
                >
                  <option key={0} value={"default"}>
                    Выберите заказ
                  </option>
                  {products.map((product, i) => (
                    <option key={i + 1} value={product.value}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="card-footer d-flex justify-content-end">
            <button className="btn btn-success" onClick={sendNewOrder}>
              Отправить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
