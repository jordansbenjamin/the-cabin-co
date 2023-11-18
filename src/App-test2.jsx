import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

// For styling app div
// Can be put in other file, but can also leave code as co-located as possible
const StyledApp = styled.div`
	padding: 20px;
`;

function App() {
	return (
		<>
			{/* GlobaStyles component does not accept children and is self closing,
        has to be a sibling of all other components in the component tree
    */}
			<GlobalStyles />
			<StyledApp>
				<Row>
					<Row type="horizontal">
						{/* <Heading type='h1'>The Cabin Co.</Heading> */}
						{/* use 'as' prop instead of type to change the HTML element accordingly */}
						<Heading as="h1">The Cabin Co.</Heading>
						<div className="">
							<Heading as="h2">Check in and out</Heading>
							<Button>Check in</Button>
							<Button variation="secondary" size="small">
								Check out
							</Button>
						</div>
					</Row>

					<Row>
						<Heading as="h3">Form</Heading>
						<form action="">
							<Input type="number" placeholder="Number of guests"></Input>
							<Input type="number" placeholder="Number of guests"></Input>
						</form>
					</Row>
				</Row>
			</StyledApp>
		</>
	);
}

export default App;
