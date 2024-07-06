import { ReactNode } from 'react';

type HeaderCellProps = {
   children?: ReactNode;
}

const HeaderCell = ({children}:HeaderCellProps) => (
   <th scope="col" className="p-[16px]">{children}</th>
);

export default HeaderCell;