/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// External packages
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
//
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

import { createEditCabin } from "../../services/apiCabins";

function CreateCabinForm({ cabinToEdit = {} }) {
	const { id: editId, ...editValues } = cabinToEdit;
	// check if we're editing the form based on editId being provided
	const isEditSession = Boolean(editId);
	// basically react hook form manages controlled components for us
	// 1) register all input fields that we want react hook form to handle
	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isEditSession ? editValues : {},
	});

	const { errors } = formState;

	const queryClient = useQueryClient();
	// whenever we change data, perform CRUD operations using mutate
	// THIS IS CREATE
	const { mutate: createCabin, isLoading: isCreating } = useMutation({
		mutationFn: createEditCabin,
		onSuccess: () => {
			toast.success("New cabin successfully created");
			// Invalidate queries after creation to re-fetch updated data
			queryClient.invalidateQueries({ queryKey: ["cabins"] });
			// reset form only when successfuly (thats why not in onSubmit)
			reset();
		},
		onError: (err) => toast.error(err.message),
	});

	// THIS IS UPDATE
	const { mutate: editCabin, isLoading: isEditing } = useMutation({
		// In react query you can only pass one element per function
		// so have to destructure it
		mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
		onSuccess: () => {
			toast.success("Cabin successfully edited");
			// Invalidate queries after creation to re-fetch updated data
			queryClient.invalidateQueries({ queryKey: ["cabins"] });
			// reset form only when successfuly (thats why not in onSubmit)
			reset();
		},
		onError: (err) => toast.error(err.message),
	});

	// To handle both loading condition
	const isWorking = isCreating || isEditing;

	function onSubmit(data) {
		// console.log(data);

		// checking if img is file list or url string
		const image = typeof data.image === "string" ? data.image : data.image[0];

		if (isEditSession) {
			editCabin({newCabinData: {...data, image }, id: editId});
		}
		// createCabin({ ...data, image: data.image[0] });
		createCabin({ ...data, image });
	}

	// This func is not that useful because we have errors from formState
	function onError(errors) {
		// console.log(errors);
	}

	return (
		// 2) react hook forms handle submit requires our own submit func
		// but they handle the rest?
		// handleSubmit is caled each time we try to submit a form
		// which at this time all validation is executed
		// in case there is an error with one of the validations
		// handleSubmit will call the second func (onError) and not onSubmit
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			{/* <FormRow>
				<Label htmlFor="name">Cabin name</Label>
				<Input
					type="text"
					id="name"
					{...register("name", {
						// validation
						required: "This field is required",
					})}
				/>
				{errors?.name?.message && <Error>{errors.name.message}</Error>}
			</FormRow> */}
			{/* Abstracting away the above */}
			<FormRow label="Cabin name" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isWorking}
					{...register("name", {
						// validation
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label="Maximum capacity" error={errors?.name?.message}>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isWorking}
					{...register("maxCapacity", {
						// validation
						required: "This field is required",
						min: {
							value: 1,
							message: "Capacity should be at least 1",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Regular price" error={errors?.name?.message}>
				<Input
					type="number"
					id="regularPrice"
					disabled={isWorking}
					{...register("regularPrice", {
						// validation
						required: "This field is required",
						min: {
							value: 1,
							message: "Capacity should be at least 1",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Discount" error={errors?.name?.message}>
				<Input
					type="number"
					id="discount"
					disabled={isWorking}
					defaultValue={0}
					{...register("discount", {
						// validation
						required: "This field is required",
						// custom validation
						// value is current input value in the input field
						// getValue grabs all values from the entire (it returns an obj)
						validate: (value) => value <= getValues().regularPrice || "Discount should be less than regular price",
					})}
				/>
			</FormRow>

			<FormRow label="Description for website" error={errors?.name?.message}>
				<Textarea
					type="number"
					id="description"
					disabled={isWorking}
					defaultValue=""
					{...register("description", {
						// validation
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label="Cabin photo" error={errors?.name?.message}>
				<FileInput
					id="image"
					accept="image/*"
					// You can set this in the style component as well
					// so you dont have to manually set it everytime its used
					type="file"
					{...register("image", {
						// validation
						// Not possible to grab upload image file
						// so conditionally required validation
						required: isEditSession ? false : "This field is required",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation="secondary" type="reset">
					Cancel
				</Button>
				<Button disabled={isWorking}>{isEditSession ? "Edit cabin" : "Creat new cabin"}</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
