import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import '../main-user-component';
import styles from './styles.scss';

const view = (state, {updateState}) => {
	return (
		<div>
			<main-user-component />
		</div>
	);
};

createCustomElement('x-595663-sys-user-table-component', {
	renderer: {type: snabbdom},
	view,
	styles
});
