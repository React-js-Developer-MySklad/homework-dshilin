import React, { FC, MouseEventHandler } from 'react';
import TrashIcon from '@assets/icon-trash-bean.svg';

type RemoveButtonProps = {
   handleRemove: () => void;
}

const RemoveButton: FC<RemoveButtonProps> = ({handleRemove}) => {
   const onClick: MouseEventHandler = e => {
      e.stopPropagation();
      handleRemove();
   }
   return (
      <button type="button" onClick={onClick} className='remove-button'>
         <img src={TrashIcon} alt="Remove" className="w-6 h-6 text-gray-600"/>
         <span className="sr-only">Icon description</span>
      </button>
   )
}

export default RemoveButton