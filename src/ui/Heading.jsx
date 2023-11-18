import styled, { css } from "styled-components";
// import styled from "styled-components";

// // css function for syntax highlighting
// const test = css`
// text-align: center
// `;

// this will return a React component
const Heading = styled.h1`
	${(as) =>
		as.type === "h1" &&
		css`
			font-size: 3rem;
			font-weight: 600;
		`}

	${(as) =>
		as.type === "h2" &&
		css`
			font-size: 2rem;
			font-weight: 600;
		`}

	${(as) =>
		as.type === "h3" &&
		css`
			font-size: 2rem;
			font-weight: 500;
		`}

	line-height: 1.4;
`;

export default Heading;
