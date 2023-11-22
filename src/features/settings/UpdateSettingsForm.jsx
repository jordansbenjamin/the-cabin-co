/* eslint-disable no-unused-vars */
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";

function UpdateSettingsForm() {
	// Fetch settings data
	const {
		isLoading,
		// settingsData is initially does not exist hence being undefined
		// a trick is use a default value of an empty arr or obj, because they're technically truthy
		settingsData: { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = {},
	} = useSettings();

	if (isLoading) return <Spinner />;

	return (
		<Form>
			<FormRow label="Minimum nights/booking">
				<Input type="number" id="min-nights" defaultValue={minBookingLength} />
			</FormRow>
			<FormRow label="Maximum nights/booking">
				<Input type="number" id="max-nights" defaultValue={maxBookingLength} />
			</FormRow>
			<FormRow label="Maximum guests/booking">
				<Input type="number" id="max-guests" defaultValue={maxGuestsPerBooking} />
			</FormRow>
			<FormRow label="Breakfast price">
				<Input type="number" id="breakfast-price" defaultValue={breakfastPrice} />
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
