import { MouseEventHandler, ReactNode } from 'react';
import TrashIcon from '@assets/icon-trash-bean.svg'
import './data-table.css'

export type DataTableColumn = {
   name: string;
}

export type DataTableProps = {
    columns: Array<DataTableColumn>;
    rows: Array<Array<string>>;
    onEdit: Function;
    onRemove: Function;
}

const DataTable = ({columns, rows, onEdit, onRemove}: DataTableProps) => {
    return (
        <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
            <tr>
                {columns.map((column, i) => <HeaderCell key={i}>{column.name}</HeaderCell>)}
                <HeaderCell></HeaderCell>
            </tr>
            </thead>
            <tbody>
            {rows.map((row, i) => <Row index={i} key={i} values={row.slice(0, columns.length)} onEdit={onEdit} onRemove={onRemove}/>)}
            </tbody>
        </table>
    );
};

type HeaderCellProps = {
    children?: ReactNode;
}
const HeaderCell = ({children}:HeaderCellProps) => (
    <th scope="col" className="p-[16px]">{children}</th>
);

type RowProps = {
    index: number;
    values: Array<string>;
    onEdit: Function;
    onRemove: Function;
}
export const Row = ({index, values, onEdit, onRemove}: RowProps) => {
    const onRowClick = () => onEdit(index);

    const onRemoveClick: MouseEventHandler<HTMLButtonElement> = e => {
        e.stopPropagation();
        onRemove(index);
    }

    return (
        <tr className="bg-white border-b" onClick={onRowClick}>
            {values.map((value, i) => <RowCell key={i}>{value}</RowCell>)}
            <RowCell><RemoveButton onClick={onRemoveClick}/></RowCell>
        </tr>
    );
}

type RowCellProps = {
    children?: ReactNode;
}
const RowCell = ({children}:RowCellProps) => (
    <td className="p-[16px]">{children}</td>
);

type RemoveButtonProps = {
    onClick: MouseEventHandler<HTMLButtonElement>;
}
const RemoveButton = ({onClick} : RemoveButtonProps) => (
    <button type="button" onClick={onClick} className='remove-button'>
        <img src={TrashIcon} alt="Remove" className="w-6 h-6 text-gray-600"/>
        <span className="sr-only">Icon description</span>
    </button>
)

export default DataTable;

