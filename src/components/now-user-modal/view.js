import '@servicenow/now-modal';
import { 
    USER_UPDATE_DATA,
    NOW_MODAL_OPENED_SET
} from '../../constants';

export default (state, dispatch) => {
	const { properties } = state;
	const { items } = properties;
	const {
		recordSysID,
		recordActive,
		recordEmail,
		recordFirstName,
		recordLastName,
		recordLocation,
		openModal,
	} = state.properties;

	function handleChange(e) {
		const { value, name } = e.target;
		dispatch(USER_UPDATE_DATA, { value, name, recordSysID });
	}
	function handleSubmit() {
		return location.reload();
	}

	return (
		<div>
			<now-modal
				opened={openModal}
				manageOpened={() => {
					dispatch(NOW_MODAL_OPENED_SET, openModal);
				}}
				size="md"
				header-label="User Details"
			>
				<div>
					<form>
						<p>Active : {recordActive}</p>
						<label for="active">First Name</label>
						<input
							on-change={handleChange}
							type="text"
							id="fName"
							value={recordFirstName}
							name="first_name"
						/>
						<br />
						<label for="lName">Last Name</label>
						<input
							on-change={handleChange}
							type="text"
							id="lName"
							value={recordLastName}
							name="last_name"
						/>
						<br />
						<label for="email">Email :</label>
						<input
							on-change={handleChange}
							type="text"
							id="email"
							value={recordEmail}
							name="email"
						/>
						<br />
						<p>Location: {recordLocation}</p>
						<now-button
							on-click={handleSubmit}
							className="btnStyle"
							label="Update"
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
