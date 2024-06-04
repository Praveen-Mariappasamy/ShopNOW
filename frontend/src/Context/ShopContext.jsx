import React, { createContext, useEffect, useState } from 'react';


export const ShopContext = createContext(null);
const getDefaultCart = () => {
    let cart = {};

    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {


    const [all_product, setAll_Product] = useState([]);


    const [filter, setFilter] = useState(1);


    const [cartItem, setCartItem] = useState(getDefaultCart());

    const [userdata, setuserdata] = useState({ name: "", email: "" });

    const getUserData = () => {

        setCartItem(getDefaultCart());


        localStorage.getItem('auth-token') &&
            fetch('https://shop-now-api-five.vercel.app/getuserdata', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: '',
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data.name);
                    setuserdata({ name: data.name, email: data.email });
                })
                .catch((error) => {
                    alert("Login First");
                });
    }




    useEffect(() => {
        Promise.all([
            fetch('https://shop-now-api-five.vercel.app/allproducts',{
                method: 'POST',
                headers:{
                    Accept: 'applcation/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({filter: filter})
            }).then((res) => res.json()),
            localStorage.getItem('auth-token')
                ? fetch('https://shop-now-api-five.vercel.app/getcart', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/form-data',
                        'auth-token': `${localStorage.getItem('auth-token')}`,
                        'Content-Type': 'application/json',
                    },
                    body: '',
                }).then((res) => res.json())
                : Promise.resolve([]), // Resolve immediately if no auth token
        ]).then(([allProductsData, cartItemData]) => {
            setAll_Product(allProductsData);
            setCartItem(cartItemData);
        });
    }, [filter])



    const addToCart = (itemId) => {
        setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        if (localStorage.getItem('auth-token')) {
            fetch('https://shop-now-api-five.vercel.app/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId }),
            })
                .then((res) => res.json())
                .then((data) => console.log(data));
        }
    }

    const removeFromCart = (itemId) => {
        setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (localStorage.getItem('auth-token')) {
            fetch('https://shop-now-api-five.vercel.app/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId }),
            })
                .then((res) => res.json())
                .then((data) => console.log(data));
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item))
                totalAmount += itemInfo.new_price * cartItem[item];
            }

        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                totalItem += cartItem[item];
            }
        }
        return totalItem;
    }


    const contextValue = { filter, setFilter , getUserData, userdata, getTotalCartItems, getTotalCartAmount, all_product, cartItem, addToCart, removeFromCart };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
