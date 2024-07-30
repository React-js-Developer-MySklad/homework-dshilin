import React, { ReactElement } from 'react';
import { ColumnProps } from './column';
import HeaderCell from './header-cell';
import Row from './row';

export type TableProps<T> = {
   columns?: Array<ColumnProps<T>>;
   items: Array<T>;
   itemKeyGetter: (item: T) => string;
   onRowClick: (item: T) => void;
   children?: ReactElement<ColumnProps<T>> | Array<ReactElement<ColumnProps<T>>>;
}

export function Table<T>({columns, items, onRowClick, itemKeyGetter, children}: TableProps<T>) {
   if (children) {
      if (Array.isArray(children)) {
         columns = children.map(child => child.props);
      } else {
         columns = [children.props];
      }
   }
   return (
      <table className="w-full text-sm text-left text-gray-500">
         <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
            <tr>
               {columns.map((column) => <HeaderCell key={column.keyValue}>{column.title}</HeaderCell>)}
            </tr>
         </thead>
         <tbody>
            {items && items.map((item) => <Row key={itemKeyGetter(item)} columns={columns} item={item} onRowClick={onRowClick}/>)}
         </tbody>
      </table>
   );
}