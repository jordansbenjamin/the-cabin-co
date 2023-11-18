import styled, { css } from "styled-components";

const Row = styled.div`
	display: flex;

	${(props) =>
		props.type === "horizontal" &&
		css`
			justify-content: space-between;
			align-items: center;
		`}

	${(props) =>
		props.type === "vertical" &&
		css`
			flex-direction: column;
			gap: 1.6rem;
		`}
`;

// Setting default props in React
Row.defaultProps = {
    type: 'vertical'
}

export default Row;

// How you would normally set default props
// function Row({test = 'Some default prop'}) {
//     return (
//         <div>
            
//         </div>
//     )
// }
