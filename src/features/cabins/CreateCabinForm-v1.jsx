/* eslint-disable no-unused-vars */
import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

// const FormRow = styled.div`
// 	display: grid;
// 	align-items: center;
// 	grid-template-columns: 24rem 1fr 1.2fr;
// 	gap: 2.4rem;

// 	padding: 1.2rem 0;

// 	&:first-child {
// 		padding-top: 0;
// 	}

// 	&:last-child {
// 		padding-bottom: 0;
// 	}

// 	&:not(:last-child) {
// 		border-bottom: 1px solid var(--color-grey-100);
// 	}

// 	&:has(button) {
// 		display: flex;
// 		justify-content: flex-end;
// 		gap: 1.2rem;
// 	}
// `;

// const Label = styled.label`
// 	font-weight: 500;
// `;

// const Error = styled.span`
// 	font-size: 1.4rem;
// 	color: var(--color-red-700);
// `;

function CreateCabinForm() {
	// basically react hook form manages controlled components for us
	// 1) register all input fields that we want react hook form to handle
	const { register, handleSubmit, reset, getValues, formState } = useForm();

	const { errors } = formState;

	const queryClient = useQueryClient();
	// whenever we change data, perform CRUD operations, use:
	const { mutate, isLoading: isCreating } = useMutation({
		mutationFn: createCabin,
		onSuccess: () => {
			toast.success("New cabin successfully created");
			// Invalidate queries after creation to re-fetch updated data
			queryClient.invalidateQueries({ queryKey: ["cabins"] });
			// reset form only when successfuly (thats why not in onSubmit)
			reset();
		},
		onError: (err) => toast.error(err.message),
	});

	function onSubmit(data) {
		// console.log(data);
		mutate({ ...data, image: data.image[0] });
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
					disabled={isCreating}
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
					disabled={isCreating}
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
					disabled={isCreating}
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
					disabled={isCreating}
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
					disabled={isCreating}
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
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation="secondary" type="reset">
					Cancel
				</Button>
				<Button disabled={isCreating}>Add cabin</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
