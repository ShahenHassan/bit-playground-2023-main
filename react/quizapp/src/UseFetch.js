import React from 'react';
import {useState,useEffect} from 'react'

export default function USeFetch(url){
    const [data,setData]=useState();
    const [error,setError]=useState();
    const [isLoading,setIsloading]=useState(true);

    const fetchData =async ()=> {   
        try{
            const res=await fetch(url);
            const resjson=await res.json();
            setData(resjson);
            setIsloading(false);
        }
        catch(err){
            setError("an error happend");
            setIsloading(false);
        }
    };
    useEffect(()=>{
        fetchData();
    },[]);

    return{data,error,isLoading};
}
 
