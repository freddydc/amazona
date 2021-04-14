import React from "react";

export default function CartScreen(props) {
    const productId = props.match.params.id;

    /*
    * Note: split('=') value [1], get the second value of index.
    ? Note: get "qty" data finding, from URL: `/cart/${productId}?qty=${qty}`
    * Note: qty "?" return, rendering a number of quantity.
    */

    const qty = props.location.search
        ? Number(props.location.search.split("=")[1])
        : 1;

    console.log("URL qty:", props.location.search, "\nQty:", qty);

    return (
        <div>
            <h1>Cart Screen</h1>
            <p>
                Add To Cart: Product Id: {productId} -- Quantity: {qty}
            </p>
        </div>
    );
}
