import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./../style.css";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { RiShareBoxLine } from "react-icons/ri";
import AOS from "aos";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function Product() {
  const { id } = useParams();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [prod, setProd] = useState({
    imageNames: [],
    title: "",
    description: "",
  });

  useEffect(()=>{
    if(localStorage.getItem('authToken') == null){
      window.location.href = `https://meghainfocom.up.railway.app/login`;
    }else{
      AOS.init({
        easing: "ease-in-out",
        duration: 500,
      });
      AOS.refresh();
    }
  }, [])
  

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BASE_URL}/api/products/id/${id}`,
      {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setProd(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleInquiry = () => {
    fetch(
      `${import.meta.env.VITE_BASE_URL}/api/user/product/${id}/request`,
      {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",

        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        // setProd(res.data.content);
        console.log(res.message);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className=" min-h-screen grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6 pt-20 md:pt-20 lg:pt-24 xl:pt-24">
      <div data-aos="fade-right" className="prod">
        {prod.imageNames.length > 0 && (
          <>
            <Swiper
              style={{
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
              }}
              spaceBetween={10}
              navigation={true}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper2"
            >
              {prod?.imageNames?.map((img, key) => (
                <SwiperSlide key={key}>
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/api/products/image/${img}`}
                    
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={6}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
            >
              {prod?.imageNames?.map((img, key) => (
                <SwiperSlide key={key}>
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/api/products/image/${img}`}
                    
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </div>
      <div data-aos="fade-left" className="grid gap-4 md:gap-10 items-start">
        <div className="grid gap-4">
          <h1 className="font-bold text-4xl">{prod.title}</h1>
        </div>
        <div className="grid gap-4 text-lg leading-relaxed">
          <p>{prod.description}</p>
        </div>
        <div className="flex items-center gap-4">
          {/* <a href="whatsapp://send?text=www.google.com" className="flex border-2 border-bt bg-bt text-bt-tx px-10 py-2 rounded-lg hover:drop-shadow-xl" data-action="share/whatsapp/share"> */}
          <a
            href="https://api.whatsapp.com/send?text=www.google.com"
            className="flex border-2 border-bt bg-bt text-bt-tx px-10 py-2 rounded-lg hover:drop-shadow-xl"
            target="_blank"
          >
            <RiShareBoxLine className="w-5 h-5 mr-2" />
            Share
          </a>
          <a
            href={`https://wa.me/7802927494/?text=Product name: ${prod.title}`}
            onClick={handleInquiry}
            className="flex border-2 border-bt text-bt px-10 py-2 font-bold rounded-lg hover:drop-shadow-xl"
          >
            Inquiry
          </a>
        </div>
      </div>
    </div>
  );
}
