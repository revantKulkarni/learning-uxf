import '@servicenow/now-modal';
import '@servicenow/now-button';
import {
    ADD_NEW_USER_DATA,
    ADD_BUTTON,
    NOW_MODAL_OPENED_SET
} from '../../constants';
export default (state, { dispatch, updateState }) => {
	const { properties } = state;
	const { items } = properties;
	const { addUserModal } = state.properties;

	const { first_name, last_name, email } = state;
	const array = [];

	function handleChange(e) {
		const { value, name } = e.target;
		console.log(value, name);
		var obj = { value, name };
		array.push(obj);
		console.log(array);
		
	}

	function handleSubmit() {
		dispatch(ADD_NEW_USER_DATA, { array });
	}

	return (
		<div>
			<now-button
				className="btnStyle"
				on-click={() => {
					dispatch(ADD_BUTTON);
				}}
				label="Add User"
				variant="primary"
				size="sm"
				icon=""
				tooltip-content=""
			></now-button>
		
			<now-modal
				opened={addUserModal}
				manageOpened={() => {
					dispatch(NOW_MODAL_OPENED_SET, addUserModal);
				}}
				size="lg"
				header-label="Add a new user"
			>
				<div>
					<form>
						<label for="fName">First Name</label>
						<input
							on-change={handleChange}
							type="text"
							id="fName"
							name="first_name"
						/>
						<br />
						<label for="lName">Last Name</label>
						<input
							on-change={handleChange}
							type="text"
							id="lName"
							name="last_name"
						/>
						<br />
						<label for="email">Email :</label>
						<input
							on-change={handleChange}
							type="text"
							id="email"
							name="email"
						/>
						<br />
						<now-button
							on-click={handleSubmit}
							className="btnStyle"
							label="Add"
							variant="primary"
							size="md"
							icon=""
							tooltip-content=""
						></now-button>
					</form>
				</div>
			</now-modal>
		</div>
	);
};
