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
                {rows.map(row => <Row values={row.slice(0, columns.length+1)} onEdit={onEdit} onRemove={onRemove}/>)}
            </tbody>
        </table>
    );
};

const HeaderCell = ({children}) => (
    <th scope="col" class="p-[16px]">{children}</th>
);

export const Row = ({values, onEdit, onRemove}) => {
    const onRowClick = () => onEdit(values[0]);

    const onRemoveClick = e => {
        e.stopPropagation();
        onRemove(values[0]);
    }

    return (
        <tr class="bg-white border-b" onClick={onRowClick}>
            {values.slice(1).map(value => <RowCell>{value}</RowCell>)}
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

