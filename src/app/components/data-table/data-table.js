import './data-table.css'
import TrashIcon from '@assets/icon-trash-bean.svg'

const DataTable = ({columns, rows, onEdit, onRemove}) => {
    return (
        <table class="w-full text-sm text-left text-gray-500 ">
            <thead class="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                <tr>
                    {columns.map(column => <HeaderCell>{column.name}</HeaderCell>)}
                    <HeaderCell></HeaderCell>
                </tr>
            </thead>
            <tbody>
                {rows.map((row, i) => <Row index={i} values={row.slice(0, columns.length)} onEdit={onEdit} onRemove={onRemove}/>)}
            </tbody>
        </table>
    );
};

const HeaderCell = ({children}) => (
    <th scope="col" class="p-[16px]">{children}</th>
);

export const Row = ({index, values, onEdit, onRemove}) => {
    const onRowClick = () => onEdit(index);

    const onRemoveClick = e => {
        e.stopPropagation();
        onRemove(index);
    }

    return (
        <tr class="bg-white border-b" onClick={onRowClick}>
            {values.map(value => <RowCell>{value}</RowCell>)}
            <RowCell><RemoveButton onClick={onRemoveClick}/></RowCell>
        </tr>
    );
}

const RowCell = (props) => (
    <td class="p-[16px]">{props.children}</td>
);

const RemoveButton = ({onClick}) => (
    <button type="button" onClick={onClick} class='remove-button'>
        <img src={TrashIcon} alt="Remove" class="w-6 h-6 text-gray-600"/>
        <span class="sr-only">Icon description</span>
    </button>
)

export default DataTable;

