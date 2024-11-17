import axios from "axios";
import { createContext } from "react";

export let CartContext = createContext()

let headers = { token : localStorage.getItem('userToken')}

async function addToCart(productId) {
  return await axios.post('https://ecommerce.routemisr.com/api/v1/cart',
      { productId: productId },
      { headers : headers}
    ).then((response)=>response)
    .catch((error)=>error)
}
// ------------------------------------------------------------------------------------------

  function displayCartItems() {
  return axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
    headers:headers
  }).then((response) => response)
  .catch((err)=>err)
}
// ------------------------------------------------------------------------------------------

function removeCartItems(productId) {
  return axios.delete( `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { headers : headers}
    ).then((response)=>response)
    .catch((error)=>error)
}
// ------------------------------------------------------------------------------------------

function updateCartItems(productId , count) {
  return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    { count : count }, // body , from documentation
    { headers : headers}
  ).then((response)=>response)
  .catch((error)=>error)
}

// ------------------------------------------------------------------------------------------
export default function CartContextProvider(props) {
  
    
    return <CartContext.Provider value={{addToCart , displayCartItems , removeCartItems , updateCartItems}} >
      {props.children}

    </CartContext.Provider>
    
  }
