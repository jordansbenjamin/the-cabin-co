/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { cloneElement, createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";

const StyledModal = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: var(--color-grey-0);
	border-radius: var(--border-radius-lg);
	box-shadow: var(--shadow-lg);
	padding: 3.2rem 4rem;
	transition: all 0.5s;
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: var(--backdrop-color);
	backdrop-filter: blur(4px);
	z-index: 1000;
	transition: all 0.5s;
`;

const Button = styled.button`
	background: none;
	border: none;
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;
	position: absolute;
	top: 1.2rem;
	right: 1.9rem;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		/* Sometimes we need both */
		/* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
		color: var(--color-grey-500);
	}
`;

const ModalContext = createContext();

function Modal({ children }) {
	const [openName, setOpenName] = useState("");

	const close = () => setOpenName("");
	const open = setOpenName;
	// const open = (name) => setOpenName(name);

	return <ModalContext.Provider value={{ openName, close, open }}>{children}</ModalContext.Provider>;
}

function Open({ children, opens: opensWindowName }) {
	const { open } = useContext(ModalContext);

	// advanced react func: cloneElement
	// return children;
	return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
	const { openName, close } = useContext(ModalContext);

	const ref = useRef();

	// global event listeners for click event
	useEffect(() => {
		function handleClick(e) {
			// ref.current is the DOM node that references the ref'd element is stored
			if (ref.current && !ref.current.contains(e.target)) {
				close();
			}
		}

		// Adding true as third arg means the event is handled in the capturing phase
		// instead of the bubbling phase, so as the event moves down the tree and not up
		document.addEventListener("click", handleClick, true);

		// remove event listener as component unmounts
		return () => document.removeEventListener("click", handleClick, true);
	}, [close]);

	if (name !== openName) return null;

	// createPortal recieves as its first argument the JSX that we want to render
	// and then as the second argument, a DOM node where we want to render this JSX
	return createPortal(
		<Overlay>
			<StyledModal ref={ref}>
				<Button onClick={close}>
					<HiXMark />
				</Button>

				{/* <div>{children}</div> */}
				{/* We dont know what element to receive so wrap inside div just in case */}
				{/* To pass in a prop to children */}
				<div>{cloneElement(children, { onCloseModal: close })}</div>
			</StyledModal>
		</Overlay>,
		document.body
	);
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
