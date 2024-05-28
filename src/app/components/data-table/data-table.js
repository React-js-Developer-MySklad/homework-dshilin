import './data-table.css'
import TrashIcon from '@assets/icon-trash-bean.svg'
import {createRef} from "@tiny-ui/ref";

const DataTable = ({columns, rows, bodyRef}) => {
    return (
        <table class="w-full text-sm text-left text-gray-500 ">
            <thead class="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                <tr>
                    {columns.map(column => <HeaderCell>{column.name}</HeaderCell>)}
                    <HeaderCell></HeaderCell>
                </tr>
            </thead>
            <tbody ref={bodyRef}>
                {rows.map(row => <Row values={row.slice(0, columns.length)}/>)}
            </tbody>
        </table>
    );
};

const HeaderCell = ({children}) => (
    <th scope="col" class="p-[16px]">{children}</th>
);

export const Row = ({values}) => {
    const ref = createRef();
    return (
        <tr class="bg-white border-b" ref={ref}>
            {values.map(value => <RowCell>{value}</RowCell>)}
            <RowCell><RemoveButton rowRef={ref}/></RowCell>
        </tr>
    );
}

const RowCell = (props) => (
    <td class="p-[16px]">{props.children}</td>
);

const RemoveButton = ({rowRef}) => (
    <button type="button" onClick={() => rowRef.htmlElement.remove()} class='remove-button'>
        <img src={TrashIcon} alt="Remove" class="w-6 h-6 text-gray-600"/>
        <span class="sr-only">Icon description</span>
    </button>
)

export default DataTable;

