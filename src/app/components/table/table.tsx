import { MouseEvent, ReactElement, ReactNode } from 'react';
import Column, { ColumnProps } from './column';

// export interface ColumnType<T> {
//    title: ReactNode;
//    key: string;
//    render: (item: T) => ReactNode;
// }

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
            {columns.map((column) => <HeaderCell key={column.key}>{column.title}</HeaderCell>)}
         </tr>
         </thead>
         <tbody>
            {items.map((item) => <Row key={itemKeyGetter(item)} columns={columns} item={item} onRowClick={onRowClick}/>)}
         </tbody>
      </table>
   );
}

// @ts-ignore
// export function Column<T>(_: ColumnType<T>){
//    return null;
// }
//
// export const

type HeaderCellProps = {
   children?: ReactNode;
}

const HeaderCell = ({children}:HeaderCellProps) => (
   <th scope="col" className="p-[16px]">{children}</th>
);

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

type RowCellProps = {
   children?: ReactNode;
}
const RowCell = ({children}:RowCellProps) => (
   <td className="p-[16px]">{children}</td>
);
