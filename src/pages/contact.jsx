import { useEffect, useState } from "react";
import AOS from 'aos'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Bounce, toast } from 'react-toastify';

const schema = z
  .object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    contact: z
      .string()
      .min(10, { message: "Contact must be at least 10 characters" }),
    message: z.string()
  })

export default function Contact() {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });
  const [message, setMsg] = useState("");
  
  useEffect(()=>{
    if(localStorage.getItem('authToken') == null){
      window.location.href = `https://meghainfocom.up.railway.app/login`;
    }else{
      AOS.init({
        easing: 'ease-in-out',
        duration: 500
    });
    AOS.refresh();
    }
  }, [])



const handleContact = (formData) =>{
  fetch("https://universal-workflow-management-production.up.railway.app/signup", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === true) {
        toast.success(res.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }else{
        toast.error(res.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
      });
      }
    }).catch((err) => {
      console.log(err);
      setMsg(`Error Occured : ${err}`);
    });
}

  return (
    <>
      <div data-aos="zoom-out" className="max-w-md space-y-6 h-screen mx-auto px-3 pt-24">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold">Get in Touch</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Have a question or want to work together? Fill out the form below
            and we\'ll get back to you as soon as possible.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(handleContact)}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 text-sm md:text-sm lg:text-lg"
              >
                Name
              </label>
              <input
                {...register("name")}
                name="name"
                placeholder="Enter your name"
                className="block w-full p-2 rounded-md border border-stroke focus:shadow-md outline-none text-sm md:text-sm lg:text-md"
                required=""
                type="text"
              />
              {errors.name && 
                  <span className="text-[#b91c1c]">
                    {errors.name.message}
                  </span>
                }
            </div>
            <div className="space-y-1">
              <label
                htmlFor="contact"
                className="block text-sm font-medium text-gray-700 text-sm md:text-sm lg:text-lg"
              >
                Contact No
              </label>
              <input
                {...register("contact")}
                name="contact"
                placeholder="Enter your number"
                type="tel"
                className="block w-full p-2 rounded-md border border-stroke focus:shadow-md outline-none text-sm md:text-sm lg:text-md"
                required=""
              />
              {errors.contact && 
                  <span className="text-[#b91c1c]">
                    {errors.contact.message}
                  </span>
                }
            </div>
          </div>
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 text-sm md:text-sm lg:text-lg"
            >
              Email
            </label>
            <input
              name="email"
              {...register("email")}
              placeholder="Enter your email"
              type="email"
              className="block w-full p-2 rounded-md border border-stroke focus:shadow-md outline-none text-sm md:text-sm lg:text-md"
              required=""
            />
            {errors.email && 
                  <span className="text-[#b91c1c]">
                    {errors.email.message}
                  </span>
                }
          </div>
          <div className="space-y-1">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 text-sm md:text-sm lg:text-lg"
            >
              Message
            </label>
            <textarea
              name="message"
              {...register("message")}
              placeholder="Enter your message..."
              className="block w-full p-2 rounded-md border border-stroke focus:shadow-md outline-none text-sm md:text-sm lg:text-md min-h-[100px]"
              required=""
            ></textarea>
          </div>
          <div className="flex justify-center p-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-bt text-bt-tx px-10 py-2 rounded-lg disabled:bg-[#6b7280] disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      {message && (
          <div className="flex justify-center w-full my-2 p-2 border border-[#dc2626] bg-[#fecaca] rounded-md">
            <span className="text-[#b91c1c]">{message}</span>
          </div>
        )}
      </div>
    </>
  );
}
