import PropTypes from 'prop-types';
import useGetUser from '../Shared/CustomHooks/useGetUser';
import DashboardHome from './Donor/DashboardHome';
import AdminDashboardHome from './Admin/AdminDashboardHome';

const DashboardWrapper = () => {
    const {data:currentUser, isPending} = useGetUser()


    
    if (!isPending) {

        if (currentUser.role === "donor") {
            return <DashboardHome ></DashboardHome>;
        }    
        // else if (currentUser.role === "admin") {
        //     return <AdminDashboardHome user={currentUser}></AdminDashboardHome>;
        // }
        else {
            return <AdminDashboardHome user={currentUser}></AdminDashboardHome>;
            
        }
    
} 
};

DashboardWrapper.propTypes = {
    
};

export default DashboardWrapper;