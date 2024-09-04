// components/MoleculesToast.js
import React from 'react';
import { toast } from 'react-toastify';

const MoleculesToast = ({ msg }) => {
  return (
    <div>
      <p className='text-success'>{msg}</p>
    </div>
  );
};

export default MoleculesToast;
