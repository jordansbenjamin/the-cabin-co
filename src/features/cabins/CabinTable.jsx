/* eslint-disable no-unused-vars */
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

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

	const [searchParams] = useSearchParams();

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

	if (!cabins.length) return <Empty resourceName="bookings" />;

	// 1) Filter
	const filterValue = searchParams.get("discount") || "all";

	let filteredCabins;
	if (filterValue === "all") {
		filteredCabins = cabins;
	}

	if (filterValue === "no-discount") {
		filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
	}

	if (filterValue === "with-discount") {
		filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
	}

	// 2) SORT
	const sortBy = searchParams.get("sortBy") || "startDate-asc";
	const [field, direction] = sortBy.split("-");
	// to change value to negative/positive
	const modifier = direction === "asc" ? 1 : -1;
	// based on previous step from filtered to sorted
	const sortedCabins = filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier);

	return (
		// role makes HTML more accessible
		// because it will function as a table but its not using
		// the HTML table element
		<Menus>
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
				<Table.Body
					// data={filteredCabins}
					data={sortedCabins}
					render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
				/>

				{/* {cabins.map((cabin) => (
					<CabinRow cabin={cabin} key={cabin.id} />
				))} */}
			</Table>
		</Menus>
	);
}

export default CabinTable;
