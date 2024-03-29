import { useNavigate } from "react-router-dom";
import React from 'react'
import DietService from '../services/DietService'
import { useParams } from 'react-router-dom';
import '../styles/DietDetails.css';
import Image from "../assets/1.jpeg";
import FoodService from '../services/FoodService';
import PaymentService from '../services/PaymentService';
import FoodItem from "./FoodItem";

function DietComponent (props){

    // get id from url 
    let { id } = useParams(); 

    const [diet, setDiet] = React.useState('');
    const [foods, setFoods] = React.useState([]);
    const [diets, setDiets] = React.useState([]);
    const [showButton, setShowButton] = React.useState(true);
    // const user_token = localStorage.getItem("user_token");
    const user_id = localStorage.getItem("user_id");

    const navigate = useNavigate();

    React.useEffect(() => { 
        DietService.getDiet(id).then((response) => {
            setDiet(response.data);
        })
    },[id]);

    React.useEffect(() => { 
        FoodService.getFoodsByDiet(id).then((response) => {
            setFoods(response.data);
        })
    },[id]);

    React.useEffect(() => { 
        // ToDo: replace 1 with the current logged in user, if it exists, if not, then empty
        if(user_id) {
            PaymentService.getDiets(user_id).then((response) => {
                setDiets(response.data);
            })
            .catch((error) => {console.log(error)});
        }
    }, [user_id]);

    React.useEffect(() => {
        if(user_id) {
            isDietBought();
        }
      });

    // check if receipe is already bought by user
    function isDietBought(){
        console.log(diets);
        for(let x of diets){
            if(x.dietDto.id === Number(id)) {
                setShowButton(false);
                break;
            }
        }
    }

    function handleBuy() { 
        console.log("HandleBuy ");
        if(user_id) {
            console.log(id);
            const obj = {
                "userDto":{
                    "id": 1
                },
                "dietDto": {
                    "id": id
                },
                "paymentDto": {
                    "amount": diet.price
                }
            };
            // const obj = {
            //     "dietName": diet.name,
            //     "userId": Number(user_id),
            //     "dietId": Number(id),
            //     "amount": Number(diet.price)
            // };

            // to do: if order succedden, then the page should be reloaded
            // and the user should be able to access the foods
            // until user does not buy the diet, the foods will be grayed out
            PaymentService.addPayment(obj) 
            .then( (response) => { navigate(`/diet/${id}`); })
            .catch( (error) => { console.log(error); alert("Payment error");});
        } else {
            navigate('/login');
        }
    }

    //console.log(diet);
    // isDietBought();
    return (
        <div className="menu">
            <div className="menuList">
                {
                    <div className="totul">
                        <div id="the-first">
                            <div className="doi">
                                    <h2>{diet.name}</h2>
                                    {/* <pre>Goal: <span>{diet.price}</span></pre> */}
                                    <pre>Maximum calories: <span>{diet.maximumCalories}</span></pre>
                                    <pre>Price: <span>{diet.price} LEI</span></pre>
                                    <pre>Description: <span>...</span></pre>
                                    
                            
                                    {showButton &&<div id="div-btn" onClick={handleBuy}>
                                        <button>Buy</button>
                                    </div>}
                            </div>
                            <div className="unu"> 
                                <img src={Image} alt="Paris" width="450" />
                            </div>
                        </div>
                        <h2>Breakfast</h2>
                        <div className="the-second">
                            {
                                foods.map(
                                    (food, key) => {
                                        if(food.foodCategoryId === 1) {
                                            return <FoodItem id={food.id} name={food.name} calories={food.calories} shouldBuy={showButton}/>
                                        }else {
                                            return ''
                                        }
                                    }
                                )
                            }
                        </div>
                        <h2>Lunch</h2>
                        <div className="the-second">
                            {
                                foods.map(
                                    (food, key) => {
                                        if(food.foodCategoryId === 2){
                                            return <FoodItem id={food.id} name={food.name} calories={food.calories} shouldBuy={showButton}/>
                                        }else {
                                            return ''
                                        }
                                    }
                                )
                            }
                        </div>
                        <h2>Dinner</h2>
                        <div className="the-second">
                            {
                                foods.map(
                                    (food, key) => {
                                        if(food.foodCategoryId === 3){
                                            return <FoodItem id={food.id} name={food.name} calories={food.calories} shouldBuy={showButton}/>
                                        }else {
                                            return '';
                                        }
                                    }
                                )
                            }
                        </div>
                        <h2>Snacks</h2>
                        <div className="the-second">
                            {
                                foods.map(
                                    (food, key) => {
                                        if(food.foodCategoryId === 4){
                                            return <FoodItem id={food.id} name={food.name} calories={food.calories} shouldBuy={showButton}/>
                                        }else {
                                            return ''
                                        }
                                    }
                                )
                            }
                        </div>
                    </div>
                }   
            </div>
        </div>
    )
}

export default DietComponent;