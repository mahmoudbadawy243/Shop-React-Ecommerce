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


export default function CartContextProvider(props) {
  
    
    return <CartContext.Provider value={{addToCart}} >
      {props.children}

    </CartContext.Provider>
    
  }
