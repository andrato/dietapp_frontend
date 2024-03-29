import React from 'react';
import { useNavigate } from "react-router-dom";
import Image from "../assets/1.jpeg";
import PaymentService from '../services/PaymentService';

export default function DietItem({key, id, image, name, price}) {

    const [diets, setDiets] = React.useState([]);
    const [showButton, setShowButton] = React.useState(true);
    // const user_token = localStorage.getItem("user_token");
    const user_id = localStorage.getItem("user_id");
    const navigate = useNavigate();
    image = Image;
  
    const handleRoute = () => { 
        navigate(`/diet/${id}`);
    }

    React.useEffect(() => { 
        // ToDo: replace 1 with the current logged in user, if it exists, if not, then empty
        if(user_id) {
            PaymentService.getDiets(user_id).then((response) => {
                console.log(response);
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
        const obj = diets.find(diet => diet.dietDto.id === id);
        
        console.log("verify diet");
        console.log(diets);
        console.log(obj);

        if(obj){
            setShowButton(false);
        }
    }

    // isDietBought();
    function handleBuy() { 
        if(user_id) {
            const obj = {
                "userDto":{
                    "id": user_id
                },
                "dietDto": {
                    "id": id
                },
                "paymentDto": {
                    "amount": price
                }
            };

            // to do: if order succedden, then the page should be reloaded
            // and the user should be able to access the foods
            // until user does not buy the diet, the foods will be grayed out
            PaymentService.addPayment(obj) 
            .then( (response) => { console.log(response.data); handleRoute(); })
            .catch( (error) => { console.log(error); alert("Payment error");});
        }
        else {
            navigate('/login');
        }
    }

    // isDietBought();
    return (
        <div className="menuItem">
            <div onClick={handleRoute}>
                <div style={{ backgroundImage: `url(${image})` }}>
                </div>
                <h3 style={{ paddingLeft: 17 + 'px'}}> {name} </h3>
            </div>
            <div className="item-end">
                <div id="price">{price}LEI</div>
                {showButton &&
                        <div id="buton"><button className="btn btn-primary" onClick={handleBuy}>Buy</button></div>
                }
            </div>
        </div>
    )
}