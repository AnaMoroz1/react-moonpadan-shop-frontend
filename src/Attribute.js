import React from 'react';


function Attribute({ attribute }) {
  return (
    <tr>
    <td>{attribute.name}</td>
    <td>{attribute.value}</td>
  </tr>
  );
}

export default Attribute;
