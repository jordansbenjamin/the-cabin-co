import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";

const StyledAppLayout = styled.div`
	display: grid;
	grid-template-columns: 26rem 1fr;
	grid-template-rows: auto 1fr;
	height: 100vh;
`;

const Main = styled.main`
	background-color: var(--color-grey-50);
	padding: 4rem 4.8rem 6.4rem;
`;

function AppLayout() {
	return (
		<StyledAppLayout>
			{/* So here could be a header, which would be the same
                for all routes
            */}
			<Header />
			<Sidebar />
			{/* main used to wrap outlet for consistent styling */}
			<Main>
				{/* Outlet is used to display child routes */}
				<Outlet />
			</Main>
		</StyledAppLayout>
	);
}

export default AppLayout;
