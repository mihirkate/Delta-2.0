import "./App.css"
import Price from "./Price"
import { ProductTab } from "./ProductTab";
export default function Product({title}){
    let oldPrice=["1990","122","7878"];
    let newPrice=["1500","110","7000"];
    return (
        <div className="Product">
            <h1>{title}</h1>
            <p>Description</p>
            <Price oldprice={oldPrice[idx]} newprice={newPrice[idx]}/>
        </div>
    )
}