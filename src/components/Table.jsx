import React from "react";
import PropTypes from "prop-types";

export default function Table(props) {
  const { fields, items } = props;

  return (
    <table {...props}>
      <thead>
        <tr>
          {fields.map((field, index) => (
            <th key={index}>{field.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            {fields.map((field, key) => {
              if (field.hasOwnProperty("render")) {
                return <td key={key}>{field.render(item, index)}</td>;
              }

              if (field.hasOwnProperty("name")) {
                return <td key={key}>{item[field.name]}</td>;
              }

              return <td key={key}>{item[field.label]}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      name: PropTypes.string,
      render: PropTypes.func
    })
  ).isRequired,
  items: PropTypes.array.isRequired
};
