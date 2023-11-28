// import { useState } from "react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";

// adapating modal to compound component pattern
function AddCabin() {
	return (
		<Modal>
			<Modal.Open opens="cabin-form">
				<Button>Add new cabin</Button>
			</Modal.Open>
			<Modal.Window name="cabin-form">
				<CreateCabinForm />
			</Modal.Window>

			{/* You can have multiple windows in the same model component */}
			{/* <Modal.Open opens="table">
				<Button>Add new cabin</Button>
			</Modal.Open>
			<Modal.Window name="table">
				<CreateCabinForm />
			</Modal.Window> */}
		</Modal>
	);
}

// Without compound component pattern, AddCabin is tasked with keeping track of modal state
// not ideal since we have to do this whenever we use modal
// function AddCabin() {
// 	const [isOpenModal, setIsOpenModal] = useState(false);

// 	return (
// 		<div>
// 			<Button onClick={() => setIsOpenModal((show) => !show)}>Add new cabin</Button>
// 			{isOpenModal && (
// 				<Modal onClose={() => setIsOpenModal(false)}>
// 					<CreateCabinForm onCloseModal={() => setIsOpenModal(false)}/>
// 				</Modal>
// 			)}
// 		</div>
// 	);
// }

export default AddCabin;
