// import { Navigation } from '@mui/icons-material';
import React from 'react';
import LocationService from '../services/LocationService';
// import UserService from '../services/UserService';
// import { useParams } from 'react-router-dom';
import '../styles/Login.css';
import RegisterService from '../services/RegisterService';

function RegisterComponent () {

    // const [countries, setCountries] = React.useState([]);
    const [cities, setCities] = React.useState([]);
    const [value, setValue]= React.useState(2);
    // const [date, onChange] = React.useState(new Date());

    // React.useEffect(() => { 
    //     LocationService.getCountries().then((response) => {
    //         setCountries(response.data)
    //     })
    // }, []);

    React.useEffect(() => { 
        LocationService.getCitiesByCountry(value).then((response) => {
            setCities(response.data);
        })
    }, []);

    const postData = async (event) => {
        //console.log("aici");
        console.log(event);
        await RegisterService.sendUserInfo(event);
    }

    const handleRoute = (msg) => { 
        navigate('/response', msg);
    }

    const handleChange = value => {
        console.log("aici");
        setDate(value);
        setShowCalendar(false);
    };

    function handleSubmit(e) {
        e.preventDefault();
        const { first_name, last_name, username, password, gender, city} = e.target.elements;

        const birth_date = moment(date.toLocaleDateString(), 'DD/MM/YYYY').format('YYYY-MM-DD');
        console.log(birth_date);

        const userInfo = { "first_name": first_name.value 
                         , "last_name": last_name.value
                         , "username": username.value
                         , "password": password.value 
                         , "gender": (gender.value == 'female') ? 'F' : 'M'
                         , "city": city.value
                         , "birth_date": birth_date};
        console.log(userInfo);
        RegisterService.sendUserInfo(userInfo)
            .then( (response) => { navigate('/login');  /*navigate('/login');*/})
            .catch( (error) => { alert("Could not register! Please try again!"); });
    }

    return (
        <div className="background">
            <div className="register">
                <div className="content">
                    <form onSubmit={postData}>
                        <h3>Register</h3>

                        <div className="register-info">
                            {/* <label>Email address</label> */}
                            <input type="first_name" key="first_name" placeholder="First name" />
                        </div>

                        <div className="register-info">
                            {/* <label>Email address</label> */}
                            <input type="last_name" key="last_name" placeholder="Last name" />
                        </div>

                        <div className="register-info">
                            {/* <label>Password</label> */}
                            <input type="email" key="email" placeholder="Email" />
                        </div>

                        <div className="register-info">
                            {/* <label>Password</label> */}
                            <input type="password" key="password" placeholder="Enter password" />
                        </div>

                        <div className="register-info-div"> 
                            <div className="div-inline">
                                <select name="gender" key="gender">
                                    <option value="female" placeholder="Gender" >Female</option>
                                    <option value="male" placeholder="Gender" >Male</option>
                                </select>
                            </div>
                            {/* <div className="div-inline">
                                <select value={value} onChange={handleChange}>
                                { 
                                    countries.map(
                                        (country, key) => {
                                            return <option value={`${country.id}`}> {country.name}</option>
                                        }
                                    )
                                }
                                </select>
                            </div> */}
                            <div className="div-inline">
                                <select value={value} name="city" key="city">
                                { 
                                    cities.map(
                                        (city, key) => {
                                            return <option value={`${city.id}`}> {city.name}</option>
                                        }
                                    )
                                }
                                </select>
                            </div>
                        </div>
                        {/* <div className="info">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div> */}
                        <div className="calendar">
                            <input
                                value={date.toLocaleDateString()}
                                onFocus={() => setShowCalendar(true)}
                            />
                            <Calendar 
                                className={showCalendar ? "" : "hide"}
                                value={date}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="loginButton">SUBMIT</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterComponent;