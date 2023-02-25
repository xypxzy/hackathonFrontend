import styles from './Card.module.css'
import React from "react";
import AppContext from "../../context";

function Index(
    {   id,
        title,
        price,
        imageurl,
        onFavourite,
        onPlus,
        favourited=false,
    })
{
    const {isItemAdded}=React.useContext(AppContext);
    const[isFavourite, setIsFavourite]=React.useState(favourited);
    const itemObj={ id, parentId:id, title, price, imageurl};

    const onClickPlus=()=>{
        onPlus(itemObj);
    }
    const onClickFavourite=()=>{
        onFavourite(itemObj);
        setIsFavourite(!isFavourite);
    }

    return(
    <div className={styles.card}>
                    <div className={styles.favourite} onClick={onClickFavourite} >
                        { onFavourite &&(
                            <img src={isFavourite ? "/img/liked.svg" :"/img/unliked.svg"} alt="unliked"/>
                        )}
                    </div>
                    <img width={'100%'} height={135} src={imageurl} alt={"sneakers1Img"}/>
                    <h5>{title}</h5>
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column">
                            <span>Price:</span>
                            <b>{price}$</b>
                        </div>
                        {onPlus && (
                            <img className={styles.plus}
                                 onClick={onClickPlus}
                                 src={isItemAdded(id) ?"/img/btn-checked.svg":"/img/btn-plus.svg"} alt="plus"/>
                        )}
                    </div>
    </div>
    );
}
export default Index;