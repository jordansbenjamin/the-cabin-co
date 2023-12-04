/* eslint-disable no-unused-vars */
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";

// const Table = styled.div`
// 	border: 1px solid var(--color-grey-200);

// 	font-size: 1.4rem;
// 	background-color: var(--color-grey-0);
// 	border-radius: 7px;
// 	overflow: hidden;
// `;

const TableHeader = styled.header`
	display: grid;
	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
	column-gap: 2.4rem;
	align-items: center;

	background-color: var(--color-grey-50);
	border-bottom: 1px solid var(--color-grey-100);
	text-transform: uppercase;
	letter-spacing: 0.4px;
	font-weight: 600;
	color: var(--color-grey-600);
	padding: 1.6rem 2.4rem;
`;

function CabinTable() {
	const { isLoading, cabins } = useCabins();

	// ABSTRACTED AWAY INTO CUSTOM HOOK
	// const {
	// 	isLoading,
	// 	data: cabins,
	// 	error,
	// } = useQuery({
	// 	// queryKey uniquely identifies the data we are going to query
	// 	// has to be an array with a string or other complexities
	// 	queryKey: ["cabins"],
	// 	// queryFn is responsible for querying/fetching data from API
	// 	// specified func needs to return a promise
	// 	// whatever data is returned will be stored in the cache
	// 	queryFn: getCabins,
	// });

	if (isLoading) {
		return <Spinner />;
	}

	return (
		// role makes HTML more accessible
		// because it will function as a table but its not using
		// the HTML table element
		<Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
			<Table.Header>
				<div></div>
				<div>Cabin</div>
				<div>Capacity</div>
				<div>Price</div>
				<div>Discount</div>
				<div></div>
			</Table.Header>

			{/* You could do this, but theres a better way */}
			{/* <Table.Body>
				{cabins.map((cabin) => (
					<CabinRow cabin={cabin} key={cabin.id} />
				))}
			</Table.Body> */}

			{/* using render prop pattern */}
			<Table.Body data={cabins} render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />} />

			{/* {cabins.map((cabin) => (
					<CabinRow cabin={cabin} key={cabin.id} />
				))} */}
		</Table>
	);
}

export default CabinTable;
