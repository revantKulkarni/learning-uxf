import "@servicenow/now-alert";
import "@servicenow/now-heading";
import "@servicenow/now-button";
import { 
    NOW_BUTTON_CLICKED,
    DELETE_USER_RECORD
} from '../../constants';


export default (state, { updateState, dispatch }) => {
    const { dataColumns, dataRows } = state.properties;
    console.log('this is datarows from view');
    const { clicked } = state;
    const { viewCard } = state;
    // console.log(clicked);
    return (
        <div className="table-container">
            {/* <h1 className="now-title">User Table</h1> */}
            {/* <div hook-init={vnode => console.log('initialized', vnode)}>Foo</div> */}

            {clicked ? (<now-alert on-click={() => updateState({ clicked: false })} icon="info-circle-outline" content="Row Clicked" action={{ "type": "dismiss" }}></now-alert>) : null}
            <table className="table">
                <thead>
                    <tr>
                        {dataColumns.map((col) => {
                            return (<th>{col.label}</th>);
                        })}
                    </tr>
                </thead>
                <tbody>
                    {dataRows.map((row) => {
                        return (
                            <tr on-click={() => updateState({
                                clicked: true
                            })}>
                                {dataColumns.map((col) => {
                                    if (col.field != 'more') {
                                        return (<td>{row[col.field]}</td>)
                                    }
                                })}
                                <td><now-button className="btnStyle" on-click={() => { dispatch(NOW_BUTTON_CLICKED, row) }} label="Update" variant="primary" size="sm" icon="" tooltip-content=""></now-button>
                                    <now-button className="btnStyle" on-click={() => { confirm('Sure you want to delete?') ? dispatch(DELETE_USER_RECORD, row['sys_id']) : alert('Record Not Deleted') }} label="Delete" variant="primary-negative" size="sm" icon="" tooltip-content=""></now-button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
