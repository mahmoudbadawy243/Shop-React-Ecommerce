{
  /*
  
== i must know how to work with 'Postman' as every step is coming from it like the kind of axios function is get or post or delete and ig axios need body or no and if i should send id or token and so

== to work with cart i will work with 'products.jsx' section and 'cart.jsx' and here i will use context to state management

  */
}

import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

// from Postman i know i need here to use "post" methode and should sending "id" in body of request and header of axios should carry the token
let headers = { token: localStorage.getItem("userToken") };
// -----------------------------------------------------------------------------------------
// Basic calling API to add to cart
async function addToCart(productId) {
  return await axios
    .post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId: productId },
      { headers: headers }
    )
    .then((response) => {
      // console.log(response?.data.data.totalCartPrice, "added");
      setTotalPrice(response?.data.data.totalCartPrice);
      setnoOfCartItems(response?.data.numOfCartItems);
      setCartId(response?.data.data._id);
      toast.success(response?.data.status);
      //  success
      return response;
    })
    .catch((error) => {
      // console.log(error);
      toast.error(response?.data.status);
      return error;
    });
  // .then((response) => response)
  // .catch((error) => error);
}
// ------------------------------------------------------------------------------------------
// Displaying cart -- i will use this block in 'cart.jsx'
async function displayCartItems() {
  return await axios
    .get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: headers,
    })
    .then((response) => response)
    .catch((err) => err);
}
// ------------------------------------------------------------------------------------------

async function removeCartItems(productId) {
  return await axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      // i will get productId when calling function below in return
      headers: headers,
    })
    .then((response) => response)
    .catch((error) => error);
}
// ------------------------------------------------------------------------------------------

async function updateCartItems(productId, count) {
  return await axios
    .put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { count: count }, // body , from documentation
      { headers: headers }
    )
    .then((response) => response)
    .catch((error) => error);
}

// ============================================================================================================================================
// checkout

// for sending request for API checkout i need to send 3 parameters : 'link path' ,  'cart id'  ,  'url' which go back for it after compltinh checkout and it should be in final step the domin name of project , 'form values' which is body  >>> this information get from backend on postman
// secound step go to 'checkout.jsx'
async function checkout(cartId, url, formValues) {
  return await axios
    .post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, // this link come from postman then making it dynamically
      { shippingAddress: formValues }, // body
      { headers: headers }
    )
    .then((response) => response)
    .catch((error) => error);
}

// ------------------------------------------------------------------------------------------

export default function CartContextProvider(props) {
  let [cart, setCart] = useState(null);
  async function getCart() {
    // copry
    let response = await displayCartItems();
    setCart(response.data);
  }

  useEffect(() => {
    getCart();
  }, []);

  // ------------------------------------------------------------------------------------------

  return (
    <CartContext.Provider
      value={{
        addToCart,
        displayCartItems,
        removeCartItems,
        updateCartItems,
        checkout,
        cart,
        setCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

{
  
  
// import axios from "axios";
// import { createContext, useState } from "react";
// import toast from "react-hot-toast";

// export let CartContext = createContext();

// export default function CartContextProvider(props) {
//     const [noOfCartItems, setnoOfCartItems] = useState(0);
//     const [totalPrice, setTotalPrice] = useState(0)
//     const [cartId, setCartId] = useState(null)

//     let headers = {
//         token : localStorage.getItem("userToken")
//     }

// async function addToCart(productId){
//     return axios.post("https://ecommerce.routemisr.com/api/v1/cart", {
//         productId
//     }, {
//         headers
//     }).then((response)=>{
//         console.log(response?.data.data.totalCartPrice , "added");
//         setTotalPrice(response?.data.data.totalCartPrice)
//         setnoOfCartItems(response?.data.numOfCartItems)
//         setCartId(response?.data.data._id)
//         toast.success(response?.data.status)
//         //  success
//         return response;
//     }).catch((error)=>{
//         console.log(error)
      
//         toast.error(response?.data.status)
//         return error;
//     })

// }


// async function getCartItems(){
//     return await axios.get("https://ecommerce.routemisr.com/api/v1/cart" , {
//         headers
//     }).then((response)=>{
//         console.log(response.data, "data");
//         setnoOfCartItems(response?.data.numOfCartItems);
//         setTotalPrice(response?.data.data.totalCartPrice)
//         setCartId(response?.data.data._id)

//         return response
//     }).catch((error)=>{
//         console.log(error);
//         return error
//     })
// }

// async function removeCartItem(productId){
//     return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {
//         headers
//     }).then((response)=>{
//         console.log(response?.data);
//         setTotalPrice(response?.data.data.totalCartPrice)
//         setnoOfCartItems(response?.data.numOfCartItems)
//         setCartId(response?.data.data._id)

//         return response
//     }).catch((error)=>{
//         console.log(error)

//         return error
//     })
// }

// async function updateCartItem(productId, count){
//     return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,{
//         count:count
//     }, {
//         headers
//     }).then((response)=>{
//         console.log(response , "update");
//         setTotalPrice(response?.data.data.totalCartPrice);
//         setnoOfCartItems(response?.data.numOfCartItems)
//         setCartId(response?.data.data._id)


//         return response
//     }).catch((error)=>{
//         console.log(error)

//         return error
//     })
// }
// async function onlinePayment(shippingAddress){
//     return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173` ,{
//         shippingAddress
//     }, {
//         headers
//     }).then((response)=>{
//         console.log(response?.data , "online");
//         window.location.href = response?.data.session.url
//         // setTotalPrice(response?.data.data.totalCartPrice);
//         // setnoOfCartItems(response?.data.numOfCartItems)

//         return response
//     }).catch((error)=>{
//         console.log(error)

//         return error
//     })
// }

//   return <CartContext.Provider value={{addToCart, onlinePayment ,totalPrice , getCartItems , removeCartItem ,noOfCartItems , updateCartItem}}>
//     {props.children}
    
    
//     </CartContext.Provider>;
// }

  

  
}
