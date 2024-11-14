import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export default function useProducts() {

  function getRecent() {
  return axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
  }
  
    let resonseOpject= useQuery({
      queryKey: ['recentProducts'],
      queryFn: getRecent,
      // refetchInterval: 3000, // fetch data each 3 sec
      // refetchIntervalInBackground : true , // fetch data even go another component
      staleTime: 80000, // after 1 sec data become stale not fresh
      // retry: 3, // number of fetch data in error to try to get it
      // retryDelay : 5000 // after 5 sec between each retry
    })
    return resonseOpject

    
}
