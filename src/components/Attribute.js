import React from 'react';


function Attribute({ attribute }) {
  return (
    <div>
      
   {attribute.name}  : {attribute.value}
</div>
  );
}

export default Attribute;
