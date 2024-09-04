import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AOS from 'aos'

export default function CatProd() {

  const { name } = useParams();
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [page, setPage] = useState(0);

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

  useEffect(()=>{
    fetch(`${import.meta.env.VITE_BASE_URL}/api/products/category/${name}?page=${page}&size=20`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        setTitle(res.data.content ? res.data.content[0]?.category?.name : "No Product Found.")
        setData(res.data);
      });
  },[page])

  const totalPages = data.totalPages;

  const getPageNumbers = () => {
    let pages = [];
    if (totalPages <= 5) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page < 3) {
        pages = [0, 1, 2, 3, '...', totalPages - 1];
      } else if (page > totalPages - 4) {
        pages = [0, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1];
      } else {
        pages = [0, '...', page - 1, page, page + 1, '...', totalPages - 1];
      }
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="min-h-screen pt-20 md:pt-20 lg:pt-24 xl:pt-24 px-5">
      
      <h2 data-aos="fade-right" className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
        {title}
      </h2>

      <div data-aos="fade-left" className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cold-4 my-5">
        {data?.content?.map((data, key)=> (
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
            </CardBody>
          </Card>
          </a>
        ))}
      </div>
      
      {data?.totalPages > 1 && (
      <div className="flex items-center justify-center gap-4 mt-3">
          <button
            disabled={page === 0 ? true : false}
            className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={() => setPage(page - 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
              className="w-4 h-4"
            >
              <path
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              ></path>
            </svg>
            Pre
          </button>
          <div className="flex items-center gap-2">
          {pageNumbers.map((num, index) => (
          <button
            key={index}
            className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${
              page === num
                ? 'shadow-md shadow-gray-900/10 bg-black text-white'
                : 'text-gray-900'
            }`}
            onClick={() => typeof num === 'number' && setPage(num)}
            disabled={typeof num === 'string'}
          >
            {num === '...' ? '...' : num + 1}
          </button>
        ))}
          </div>
          <button
            disabled={data.totalPages == page + 1}
            className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={() => setPage(page + 1)}
          >
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
              className="w-4 h-4"
            >
              <path
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              ></path>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
