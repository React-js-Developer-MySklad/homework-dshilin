import React, { ReactNode } from 'react';

type RowCellProps = {
   children?: ReactNode;
}

const RowCell = ({children}:RowCellProps) => (
   <td className="p-[16px]">{children}</td>
);

export default RowCell;