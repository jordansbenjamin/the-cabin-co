/* eslint-disable no-unused-vars */
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";
import { useUpdateSetting } from "./useUpdateSettings";

function UpdateSettingsForm() {
	// Fetch settings data
	const {
		isLoading,
		// settingsData is initially does not exist hence being undefined
		// a trick is use a default value of an empty arr or obj, because they're technically truthy
		settingsData: { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = {},
	} = useSettings();

	const { isUpdating, updateSetting } = useUpdateSetting();

	if (isLoading) return <Spinner />;

	function handleUpdate(e, field) {
		const { value } = e.target;
		// console.log(value);

		if (!value) return;

		updateSetting({ [field]: value });
	}

	return (
		<Form>
			<FormRow label="Minimum nights/booking">
				<Input
					type="number"
					id="min-nights"
					defaultValue={minBookingLength}
					disabled={isUpdating}
					// onBlur because once a value is added into an input field
					// and a user leaves that input, it updates it
					onBlur={(e) => handleUpdate(e, "minBookingLength")}
				/>
			</FormRow>

			<FormRow label="Maximum nights/booking">
				<Input
					type="number"
					id="max-nights"
					defaultValue={maxBookingLength}
					disabled={isUpdating}
					onBlur={(e) => handleUpdate(e, "maxBookingLength")}
				/>
			</FormRow>

			<FormRow label="Maximum guests/booking">
				<Input
					type="number"
					id="max-guests"
					defaultValue={maxGuestsPerBooking}
					disabled={isUpdating}
					onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
				/>
			</FormRow>

			<FormRow label="Breakfast price">
				<Input
					type="number"
					id="breakfast-price"
					defaultValue={breakfastPrice}
					disabled={isUpdating}
					onBlur={(e) => handleUpdate(e, "breakfastPrice")}
				/>
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
