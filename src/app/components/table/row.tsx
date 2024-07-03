import { ColumnProps } from './column';
import React, { MouseEvent } from 'react';
import RowCell from './row-cell';

type RowProps<T> = {
   columns: Array<ColumnProps<T>>;
   item: T;
   onRowClick: (item: T) => void;
}

function Row<T>({columns, item, onRowClick}: RowProps<T>) {
   const onClick = (e: MouseEvent) => {
      e.stopPropagation();
      onRowClick(item);
   }

   return (
      <tr className="bg-white border-b" onClick={onClick}>
         {columns.map(column => <RowCell key={column.key}>{column.render(item)}</RowCell>)}
      </tr>
   );
}

export default Row;