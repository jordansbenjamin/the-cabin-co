import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
	const ref = useRef();

	// global event listeners for click event
	useEffect(() => {
		function handleClick(e) {
			// ref.current is the DOM node that references the ref'd element is stored
			if (ref.current && !ref.current.contains(e.target)) {
				handler();
			}
		}

		// Adding true as third arg means the event is handled in the capturing phase
		// instead of the bubbling phase, so as the event moves down the tree and not up
		// document.addEventListener("click", handleClick, true);
		document.addEventListener("click", handleClick, listenCapturing);

		// remove event listener as component unmounts
		return () => document.removeEventListener("click", handleClick, listenCapturing);
	}, [handler, listenCapturing]);

	return ref;
}
