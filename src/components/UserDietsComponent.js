import React from 'react';
import { useParams } from 'react-router-dom';
import UserService from '../services/UserService';
import {NavLink} from 'react-router-dom';

import '../styles/User.css';

function UserDietsComponent(props) {

    let { id } = useParams(); 

    const [diets, setDiets] = React.useState([]);
    const is_admin = localStorage.getItem("is_admin");
    
    // React.useEffect(() => { 
    //     UserService.getUserById(id).then((response) => {
    //         setDiets(response.data);
    //         console.log(user);
    //     })
    //     //console.log("called " + id);
    // }, []);

    return (
        <div className="all">
            <div className="one">
                <div className="nav">
                    <NavLink to={`/users/${id}`} className="inactive"> Account Info </NavLink>
                    <NavLink to={`/users/${id}/updates`} className="inactive"> Updates </NavLink>
                    <NavLink to={`/users/${id}/diets`} className="active"> My diets </NavLink>
                    {is_admin!="false" && <div className="line"></div>}
                    {is_admin!="false" &&<NavLink to={`/users/${id}/allusers`} className="inactive"> All users </NavLink>}
                    {is_admin!="false" &&<NavLink to={`/users/${id}/alldiets`} className="inactive"> All diets </NavLink>}
                    {is_admin!="false" &&<NavLink to={`/users/${id}/allbillings`} className="inactive"> All billings </NavLink>}
                    <div className="line"></div>
                </div>
                <div className="logout">
                    <NavLink to={`/logout`} className="inactive"> Log out </NavLink>
                </div>
            </div>

            <div>

            </div>
        </div>
    )
}

export default UserDietsComponent;