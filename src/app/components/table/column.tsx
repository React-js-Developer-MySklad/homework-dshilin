import { ReactNode } from 'react';

export interface ColumnProps<T> {
   children?: null;
   title: ReactNode;
   key: string;
   render: (item: T) => ReactNode;
}


// @ts-ignore
function Column<T>(_: ColumnProps<T>) {
   return null;
}

export default Column;