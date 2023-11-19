import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";

// queryClient basically sets up the cache BTS
const queryClient = new QueryClient({
	defaultOptions: {
		// options for queries
		queries: {
			// stale time is the amount of time
			// the data in the cache will stay fresh
			// or stay valid until it is automatically re-fetched
			staleTime: 60 * 1000,
		},
	},
});

function App() {
	return (
		// Provide query data to entire app tree
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false}/>
			<GlobalStyles />
			<BrowserRouter>
				<Routes>
					{/* Nesting routes inside AppLayout route
						layout route because no path prop
					*/}
					<Route element={<AppLayout />}>
						{/* Replacing and redirecting the index route for the dashboard */}
						<Route index element={<Navigate replace to="dashboard" />} />
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="bookings" element={<Bookings />} />
						<Route path="cabins" element={<Cabins />} />
						<Route path="users" element={<Users />} />
						<Route path="settings" element={<Settings />} />
						<Route path="account" element={<Account />} />
					</Route>

					<Route path="login" element={<Login />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
