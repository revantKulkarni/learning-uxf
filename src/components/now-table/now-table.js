import { createCustomElement } from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import view from './view';

createCustomElement('now-table', {
    renderer: { type: snabbdom },
    view,
    properties: {
        dataColumns: {
            default: []
        },
        dataRows: {
            default: []
        }
    },
    styles
});