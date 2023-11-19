/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";

const Table = styled.div`
	border: 1px solid var(--color-grey-200);

	font-size: 1.4rem;
	background-color: var(--color-grey-0);
	border-radius: 7px;
	overflow: hidden;
`;

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
	const {
		isLoading,
		data: cabins,
		error,
	} = useQuery({
		// queryKey uniquely identifies the data we are going to query
		// has to be an array with a string or other complexities
		queryKey: ["cabins"],
		// queryFn is responsible for querying/fetching data from API
		// specified func needs to return a promise
		// whatever data is returned will be store in the cache
		queryFn: getCabins,
	});

	if (isLoading) {
		return <Spinner />;
	}

	return (
		// role makes HTML more accessible
		// because it will function as a table but its not using
		// the HTML table element
		<Table role="table">
			<TableHeader role="row">
				<div></div>
				<div>Cabin</div>
				<div>Capacity</div>
				<div>Price</div>
				<div>Discount</div>
				<div></div>
			</TableHeader>
			{cabins.map((cabin) => (
				<CabinRow cabin={cabin} key={cabin.id} />
			))}
		</Table>
	);
}

export default CabinTable;
