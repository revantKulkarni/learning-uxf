import "../components/now-add-user";
import "../components/now-table";
import "../components/now-user-modal";
import "@servicenow/now-heading";
import '@servicenow/now-loader';
import { columns } from "../constants";


export default (state, { updateState }) => {
	const {
		dataRows,
		items,
		recordSysID,
		recordActive,
		recordEmail,
		recordFirstName,
		recordLastName,
		recordLocation,
		openModal,
		addUserModal,
		isLoading
	} = state;

	const displayColumns = columns.filter((col) => {
		return col.field !== "sys_id";
	});
	return (
		<div>
			<now-heading className="heading" label="User Table" level="1" variant="header-primary"></now-heading>
			<now-add-user addUserModal={addUserModal}></now-add-user>
			<now-user-modal
				recordSysID={recordSysID}
				items={items}
				recordActive={recordActive}
				recordEmail={recordEmail}
				recordFirstName={recordFirstName}
				recordLastName={recordLastName}
				recordLocation={recordLocation}
				openModal={openModal}
			/>
			{isLoading ? (
				<now-loader label="Loading..." size="lg" />
			) : (
				<now-table
					title="User Table"
					dataColumns={displayColumns}
					dataRows={dataRows}
				/>
			)}
		</div>
	);
};
