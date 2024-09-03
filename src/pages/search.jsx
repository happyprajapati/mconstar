import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
  } from "@material-tailwind/react";
import AOS from 'aos'

function search() {

  const { value } = useParams();
  const [data, setData] = useState([])

  useEffect(()=>{
    AOS.init({
      easing: 'ease-in-out',
      duration: 500
  });
  AOS.refresh();
  },[])

  useEffect(()=>{
    if(localStorage.getItem('authToken') == null){
      window.location.href = `https://meghainfocom.up.railway.app/login`;
    }
  }, [])

    useEffect(()=> {
        fetch(`${import.meta.env.VITE_BASE_URL}/api/products/search?search=${value}&page=0&size=10`, {
            method: 'GET',
          })
            .then((res) => res.json())
            .then((res) => {
              console.log(res.data.content);
              setData(res.data.content);
            });
    },[])

  return (
    <div className="min-h-screen pt-30 md:pt-20 lg:pt-24 xl:pt-24 px-5">
      
      <h2 data-aos="fade-right" className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
        {value}
      </h2>
      <div data-aos="fade-left" className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cold-4 my-5">
        {data?.map((data, key)=> (
          <a href={`/prod/${data.id}`} key={key}>
          <Card className="">
            <CardHeader floated={false} className="h-64">
              <img 
                src={`${import.meta.env.VITE_BASE_URL}/api/products/image/${data.imageNames[0]}`}
                alt="card-image"
                className="h-full w-full object-cover"
              />
            </CardHeader>
            <CardBody>
              <div className="flex items-center justify-between">
                <Typography color="blue-gray" className="font-medium">
                  {data.title}
                </Typography>
              </div>
              <div className="flex items-center justify-between">
                <Typography color="blue-gray" className="font-bold text-bold">
                  {data.category.name}
                </Typography>
              </div>
            </CardBody>
          </Card>
          </a>
        ))}
      </div>
    </div>
  )
}

export default search
