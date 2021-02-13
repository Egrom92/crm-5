export const orderTableHeaders = [
  {
    label: "",
    field: "ID"
  },
  {
    label: "ИФО",
    field: "client"
  },
  {
    label: "Заказ",
    field: "name"
  },
  {
    label: "Сумма",
    field: "price"
  },
  {
    label: "Статус",
    field: "status"
  },
  {
    label: "Действия",
    field: "action"
  },
  {
    label: "Дата / Время",
    field: "dateTime"
  }
];
// primary key
export const statuses = [
  {
    value: "new",
    name: "Новый",
    className: "btn-outline-primary"
  },
  {
    value: "process",
    name: "На исполнение",
    className: "btn-outline-warning"
  },
  {
    value: "back",
    name: "Возврат",
    className: "btn-outline-danger"
  },
  {
    value: "archived",
    name: "Заархивированные",
    className: "btn-outline-dark"
  }
];
