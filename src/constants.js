export const URL_USER_TABLE = 'api/now/table/sys_user';
export const URL_USER_RECORD_ID = 'api/now/table/sys_user/:id';
///////////////////////////////////////////////////////////
export const LOAD_STARTED = 'LOAD_STARTED';
export const FETCH_USER_DATA = 'FETCH_USER_DATA';
export const FETCH_USER_DATA_SUCCEEDED = 'FETCH_USER_DATA_SUCCEEDED';
export const FETCH_USER_RECORD = 'FETCH_USER_RECORD';
export const FETCH_USER_RECORD_SUCCEEDED = 'FETCH_USER_RECORD_SUCCEEDED';
export const DELETE_USER_RECORD = 'DELETE_USER_RECORD';
export const DELETE_USER_RECORD_DISPATCH = 'DELETE_USER_RECORD_DISPATCH';
export const DELETE_USER_RECORD_SUCCEEDED = 'DELETE_USER_RECORD_SUCCEEDED';
export const USER_UPDATE_DATA = 'USER_UPDATE_DATA';
export const UPDATING_USER_RECORD = 'UPDATING_USER_RECORD';
export const UPDATED_USER_RECORD = 'UPDATED_USER_RECORD';
export const ADD_BUTTON = 'ADD_BUTTON';
export const ADD_NEW_USER_DATA = 'ADD_NEW_USER_DATA';
export const ADDING_USER_RECORD = 'ADDING_USER_RECORD';
export const ADDED_USER_RECORD = 'ADDED_USER_RECORD';

///////////////////////////////////////////////////////////

export const NOW_BUTTON_CLICKED = 'NOW_BUTTON#CLICKED';
export const NOW_MODAL_OPENED_SET = 'NOW_MODAL#OPENED_SET';

///////////////////////////////////////////////////////////

export const userTable = [
    'sys_user'
];

export const tableLabels = {
    'sys_user': 'User Table'
};

export const columns = [
    {
        field: "active",
        label: "Active"
    },
    {
        field: "first_name",
        label: "First Name"
    },
    {
        field: "last_name",
        label: "Last Name"
    },
    {
        field: "email",
        label: "Email"
    },
    {
        field: "location",
        label: "Location"
    },
    {
        field: 'more',
        label: "More"
    },
    {
        field: "sys_id",
        label: "sys_id"
    }

];


