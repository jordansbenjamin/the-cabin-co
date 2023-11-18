/* eslint-disable no-unused-vars */
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
`;

// You can do this to add styles to an existing component
const StyledNavLink = styled(NavLink)`
	&:link,
	&:visited {
		display: flex;
		align-items: center;
		gap: 1.2rem;

		color: var(--color-grey-600);
		font-size: 1.6rem;
		font-weight: 500;
		padding: 1.2rem 2.4rem;
		transition: all 0.3s;
	}

	/* This works because react-router places the active class on the active StyledNavLink */
	&:hover,
	&:active,
	&.active:link,
	&.active:visited {
		color: var(--color-grey-800);
		background-color: var(--color-grey-50);
		border-radius: var(--border-radius-sm);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		color: var(--color-grey-400);
		transition: all 0.3s;
	}

	&:hover svg,
	&:active svg,
	&.active:link svg,
	&.active:visited svg {
		color: var(--color-brand-600);
	}
`;

function MainNav() {
	return (
		<nav>
			<NavList>
				{/* This will refresh/re-paint the page
              which is not what we want in a SPA app
          */}
				{/* <li>
					<Link href="/dashboard">Home</Link>
				</li>
				<li>
					<Link href="/bookings">Bookings</Link>
				</li> */}

				{/* We need NavLink by react router in order for routing/linking to work */}
				<li>
					{/* Issue is now its not styled, but solution is above */}
					<StyledNavLink to="/dashboard">Home</StyledNavLink>
				</li>
				<li>
					<StyledNavLink to="/bookings">Bookings</StyledNavLink>
				</li>
			</NavList>
		</nav>
	);
}

export default MainNav;
