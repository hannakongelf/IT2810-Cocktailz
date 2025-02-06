import Layout from '../layout/Layout';
import Login from '../components/login/login';

/**
 * Page to display the user profile
 * @returns ProfilePage component
 */

const ProfilePage = () => {
	// Return the login component
	return (
		<Layout>
			<Login />
		</Layout>
	);
};

export default ProfilePage;
