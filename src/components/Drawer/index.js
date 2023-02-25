import Info from "../Info";
import React from "react";
import axios from "axios";
import styles from "./Drawer.module.css"
import { useCart } from "../../hooks/useCart";

function Index({onClose,
                 onRemove ,
                 items=[],
                 opened}){

    const {cartItems,setCartItems,totalPrice}=useCart();
    const [isOrderComplete, setIsOrderComplete]=React.useState(false);
    const [orderId, setOrderId]=React.useState(null);
    const [isLoading, setIsLoading]=React.useState(false);


    const onClickOrder=async ()=>{
        try{
            setIsLoading(true);
            const {data}=await axios.post("https://63a9da26594f75dc1dc25cdf.mockapi.io/orders", {
                items: cartItems
            });
            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);
            for (let i=0;i<cartItems.length;i++){
                const item=cartItems[i];
                axios.delete("https://63a9da26594f75dc1dc25cdf.mockapi.io/cart/"+item.id)
            }
        }
        catch (e) {
            alert("can not make order :(")
        }
        setIsLoading(false);
    }
    return(
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible:''}`}>
            <div className={styles.drawer}>
                <h2 className="d-flex justify-between mb-30">
                    Cart
                    <img onClick={onClose} className="removeBtn cu-p"
                         src="/img/btn-remove.svg" alt="remove img"/>
                </h2>
                {
                    items.length > 0 ?
                    (
                        <div className={"d-flex flex-column flex"}>
                            <div className={styles.items}>
                                {
                                    items.map((obj)=>(
                                        <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                            <div style={{backgroundImage: 'url('+obj.imageurl+')'}}
                                                 className="cartItemImg"></div>
                                            <div className="mr-20 flex">
                                                <p>{obj.title}</p>
                                                <b>{obj.price}$</b>
                                            </div>
                                            <img onClick={()=>onRemove(obj.id) }
                                                 className="removeBtn"
                                                 src="/img/btn-remove.svg"
                                                 alt="remove img"/>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className={styles.cartTotalBlock}>
                                <ul>
                                    <li className="d-flex" >
                                        <span>Итого:</span>
                                        <div></div>
                                        <b>{totalPrice}$</b>
                                    </li>
                                    <li className="d-flex" >
                                        <span>Tax 5%:</span>
                                        <div></div>
                                        <b>{totalPrice*0.05}$</b>
                                    </li>
                                </ul>
                                <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Make order
                                    <img src={"/img/arrow.svg"} alt={"arrowSvg"}/>
                                </button>
                            </div>
                        </div>

                    ) : (
                        <Info
                            title={isOrderComplete ? "Order has been confirmed" : "Cart is empty"}
                            description={ isOrderComplete
                                ? "Your order has been transferred to delivery service"
                                : "Add at least one pair of sneakers to make order"}
                            imageurl={isOrderComplete
                                ? "/img/complete-order.jpg"
                                : "/img/empty-cart.jpg"}
                        ></Info>
                        )
                }
            </div>
        </div>
    );
}
export default Index;