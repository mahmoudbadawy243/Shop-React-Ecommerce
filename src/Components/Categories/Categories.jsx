import React from "react";
import useProducts from "../../Hooks/useProducts";

export default function Categories() {
  let {data , isError , error , isLoading , isFetching} = useProducts()
  console.log(data);


  return <div>Categories</div>;
}
