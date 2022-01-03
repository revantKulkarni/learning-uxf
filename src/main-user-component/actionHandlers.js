import { createHttpEffect } from '@servicenow/ui-effect-http';
import { actionTypes } from '@servicenow/ui-core';

import {
    columns,
    LOAD_STARTED,
    URL_USER_TABLE,
    URL_USER_RECORD_ID,
    FETCH_USER_DATA,
    FETCH_USER_DATA_SUCCEEDED,
    FETCH_USER_RECORD,
    FETCH_USER_RECORD_SUCCEEDED,
    DELETE_USER_RECORD,
    DELETE_USER_RECORD_DISPATCH,
    DELETE_USER_RECORD_SUCCEEDED,
    ADD_BUTTON,
    ADD_NEW_USER_DATA,
    ADDING_USER_RECORD,
    ADDED_USER_RECORD,
    USER_UPDATE_DATA,
    UPDATING_USER_RECORD,
    UPDATED_USER_RECORD,
    NOW_BUTTON_CLICKED,
    NOW_MODAL_OPENED_SET,
    NOW_ALERT_ACTION_CLICKED
} from '../constants';

console.log("Inside actionHandler");
export default {
    actionHandlers: {
        [actionTypes.COMPONENT_BOOTSTRAPPED]: ({ dispatch }) => {
            const query = 'sys_class_nameINsys_user';
            const fields = columns.map((col) => {
                return col.field;
            }).join(',');
            console.log("Bootstrapped");
            dispatch(FETCH_USER_DATA, {
                sysparm_query: query, sysparm_display_value: 'all', sysparm_exclude_reference_link: true, sysparm_field: fields
            });
        },

        [FETCH_USER_DATA]: createHttpEffect(URL_USER_TABLE, {
            startActionType: LOAD_STARTED,
            method: 'GET',
            queryParams: ['sysparm_query', 'sysparm_display_value', 'sysparm_exclude_reference_link', 'sysparm_field'],
            successActionType: FETCH_USER_DATA_SUCCEEDED
        }),

        [LOAD_STARTED]: ({updateState}) => {
			updateState({isLoading: true});
		},

        [FETCH_USER_DATA_SUCCEEDED]: (coeffects) => {
            const { action, updateState } = coeffects;
            const { result } = action.payload;
            console.log('this is result');
            console.log(typeof result);
            const dataRows = result.map((row) => {
                const tableName = row.sys_class_name.value;

                return Object.keys(row).reduce((acc, val) => {
                    if (val == 'sys_class_name.value') {
                        acc[val] = row[val].value;
                    } else {
                        acc[val] = row[val].display_value;
                    }
                    return acc;
                }, {});
            });
            console.log(dataRows);
            updateState({isLoading: false});
            updateState({ dataRows })
        },

        [NOW_BUTTON_CLICKED]: (coeffects) => {
            const { dispatch, action } = coeffects;
            const { sys_id, sys_class_name } = action.payload;
            if (sys_id !== undefined) {
                dispatch(FETCH_USER_RECORD, {
                    id: sys_id,
                    table: sys_class_name,
                    sysparm_display_value: 'all',
                    sysparm_exclude_reference_link: true
                });
            }

        },

        [FETCH_USER_RECORD]: createHttpEffect(URL_USER_RECORD_ID, {
            method: 'GET',
            pathParams: ['table', 'id'],
            queryParams: [
                'sysparm_display_value',
                'sysparm_exclude_reference_link'
            ],
            batch: false,
            successActionType: FETCH_USER_RECORD_SUCCEEDED
        }),
        [FETCH_USER_RECORD_SUCCEEDED]: (coeffects) => {
            const { action, updateState } = coeffects;
            const { result } = action.payload;
            // console.log(action.payload);
            const items = Object
                .keys(result)
                .sort()
                .reduce((acc, val) => {
                    acc.push({
                        label: val,
                        value: {
                            type: 'string',
                            value: result[val].display_value
                        }
                    });

                    return acc;
                }, []);

            updateState({
                items,
                recordSysID: result.sys_id.display_value,
                recordActive: result.active.display_value,
                recordEmail: result.email.display_value,
                recordFirstName: result.first_name.display_value,
                recordLastName: result.last_name.display_value,
                recordLocation: result.location.display_value,
                openModal: true
            });
        },

        [NOW_MODAL_OPENED_SET]: ({ updateState }) => {
            updateState({ openModal: false });
            updateState({ addUserModal: false });
        },

        [DELETE_USER_RECORD]: (coeffects) => {
            const { action, dispatch, state, updateState } = coeffects;
            updateState({ dataRows: state.dataRows.filter(dataRow => dataRow.sys_id !== action.payload) });
            dispatch(DELETE_USER_RECORD_DISPATCH, { id: action.payload })
        },

        [DELETE_USER_RECORD_DISPATCH]: createHttpEffect('api/now/table/sys_user/:id', {
            method: 'DELETE', pathParams: 'id', successActionType: DELETE_USER_RECORD_SUCCEEDED,
        }),

        [DELETE_USER_RECORD_SUCCEEDED]: (coeffects) => {
            alert('This Record has been deleted');
        },

        [USER_UPDATE_DATA]: (coeffects) => {
            const { dispatch, action, updateState } = coeffects;
            const { payload } = action;
            const { recordSysID, sys_class_name } = action.payload;
            action.preventDefault();
            const fields = columns.filter((col) => {
                return col.field === payload.name;
            })
            const updatedData = {
                [payload.name]: payload.value
            }
            dispatch(UPDATING_USER_RECORD, {
                id: recordSysID,
                value: action.payload.value,
                data: updatedData
            })
        },

        [UPDATING_USER_RECORD]: createHttpEffect('/api/now/table/sys_user/:id', {
            method: 'PUT',
            pathParams: 'id',
            dataParam: 'data',
            successActionType: UPDATED_USER_RECORD
        }),

        [UPDATED_USER_RECORD]: (coeffects) => {
        },

        [NOW_ALERT_ACTION_CLICKED]: ({ updateState }) => {
            updateState({ clicked: undefined });
        },

        [ADD_BUTTON]: (coeffects) => {
            const { dispatch, action, updateState } = coeffects;
            updateState({ addUserModal: true });
        },

        [ADD_NEW_USER_DATA]: (coeffects) => {
            const { dispatch, action } = coeffects;
            const { payload } = action;
            console.log('This is Payload');
            action.preventDefault();
            var arr = payload.array;
            // var obj = arr.reduce((newObj, item, email) => {
                // console.log(item); // ln
                const newObject = Object.assign({}, ...arr.map(item => ({ [item.name]: item.value })));
                console.log(newObject); // fn

            dispatch(ADDING_USER_RECORD, {
                data: newObject
            })

            // });

        },

        [ADDING_USER_RECORD]: createHttpEffect('/api/now/table/sys_user', {
            method: 'POST',
            dataParam: 'data',
            successActionType: ADDED_USER_RECORD
        }),

        [ADDED_USER_RECORD]: (coeffects) => {
            console.log(coeffects);
            console.log('User Added');
            location.reload();
        }
    }
}