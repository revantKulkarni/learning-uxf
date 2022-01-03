import { createCustomElement } from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import view from './view';
import styles from './styles.scss'



createCustomElement('now-user-modal', {
    renderer: { type: snabbdom },
    view,
    properties: {
        items: { default: [] },
        recordActive: { default: '' },
        recordSysID: { default: '' },
        recordEmail: { default: '' },
        recordFirstName: { default: '' },
        recordLastName: { default: '' },
        recordLocation: { default: '' },
        openModal: { default: false }
    },
    styles
})