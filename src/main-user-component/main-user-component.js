import { createCustomElement } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import view from "./view";
import styles from "./styles.scss";
import actionHandlers from "./actionHandlers";

createCustomElement("main-user-component", {
	renderer: { type: snabbdom },
	view,
	initialState: {
		isLoading: false
	},
	...actionHandlers,
	styles
});
