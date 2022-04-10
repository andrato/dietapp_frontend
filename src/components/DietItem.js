import React from 'react';
import { useNavigate } from "react-router-dom";
import Image from "../assets/1.jpeg";

export default function DietItem({key, id, image, name, price}) {

    const user_id = localStorage.getItem("user_id");
    const navigate = useNavigate();
    image = Image;
  
    const handleRoute = () => { 
        navigate(`/diet/${id}`);
    }

    function handleBuy() {

    }

    return (
        <div className="menuItem">
            <div onClick={handleRoute}>
                <div style={{ backgroundImage: `url(${image})` }}>
                </div>
                <h3 style={{ paddingLeft: 17 + 'px'}}> {name} </h3>
            </div>
            <div className="item-end">
                <div id="price">{price}LEI</div>
                <div id="buton"><button className="btn btn-primary" onClick={handleBuy}>Buy</button></div>
            </div>
        </div>
    )
}
