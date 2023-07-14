import { createReducer } from "@reduxjs/toolkit";

export const cartReducers = createReducer({
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    subTotal: 0,
    shipping: 0,
    taxes: 0,
    total: 0
}, {
    addToCart: (state, action) => {
        const item = action.payload
        const isItemPresent = state.cartItems.find((e) => e.id === item.id)

        if (isItemPresent) {
            state.cartItems.forEach(e => {
                if (e.id === item.id)
                    e.quantity += 1;
            })
        } else {
            state.cartItems.push(item)
        }

        // As the data is not coming from the server, we have to store the state variable data in localstorage so we can access the cartItems even after a refresh.
        let string = JSON.stringify(state.cartItems)
        localStorage.setItem("cartItems", string)
    },
    incrementQty: (state, action) => {
        const id = action.payload;

        state.cartItems.forEach((e) => {
            if (e.id === id)
                e.quantity += 1;
        })


        let string = JSON.stringify(state.cartItems)
        localStorage.setItem("cartItems", string)
    },
    decrementQty: (state, action) => {
        const id = action.payload;

        state.cartItems.forEach((e) => {
            if (e.id === id && e.quantity !== 0)
                e.quantity -= 1;
        })

        let string = JSON.stringify(state.cartItems)
        localStorage.setItem("cartItems", string)
    },
    deleteItem: (state, action) => {
        const id = action.payload;
        state.cartItems = state.cartItems.filter((e) => { return e.id !== id })

        let string = JSON.stringify(state.cartItems)
        localStorage.setItem("cartItems", string)
    },
    calculatePrice: (state, action) => {
        state.cartItems = JSON.parse(localStorage.getItem('cartItems'))
        state.subTotal = 0;
        state.cartItems.forEach((e) => {
            state.subTotal += e.price * e.quantity
        })

        if (state.subTotal > 0 && state.subTotal <= 1000)
            state.shipping = 200;
        else
            state.shipping = 0;

        state.taxes = +(0.18 * state.subTotal).toFixed(2)

        state.total = +(state.taxes + state.subTotal + state.shipping).toFixed(2)
    }
})