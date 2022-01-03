import { createCustomElement } from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss'
import view from './view';

createCustomElement('now-add-user', {
    renderer: { type: snabbdom },
    initialState : {
        first_name : '',
        last_name: '',
        email : ''
    },
    view,
    properties: {
        addUserModal: { default: false }
    },
    styles
})