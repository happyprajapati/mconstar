import { useEffect } from "react";
import AOS from 'aos'

export default function About() {
  
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

  return (
    <div className="mx-auto space-y-6 px-5 pt-20 md:pt-20 lg:pt-28 xl:pt-30">
      <div data-aos="fade-right">
      <h2 className="mx-auto max-w-[900px] text-3xl font-bold pb-1 border-b-2">
        About us
      </h2>
      <p className="mx-auto max-w-[900px] text-gray-700 md:text-xl/relaxed ">
        At Acme Inc, we are dedicated to providing innovative solutions that
        empower our clients to achieve their goals. Our mission is to be a
        trusted partner, driven by a commitment to excellence, integrity, and a
        passion for creating positive change.
      </p>
      <p className="mx-auto max-w-[900px] text-gray-700 md:text-xl/relaxed ">
        Established in 1985, Acme Inc has a rich history of pioneering new
        technologies and delivering exceptional results. Our core values of
        innovation, collaboration, and sustainability guide every aspect of our
        work, ensuring that we consistently exceed the expectations of our
        clients.
      </p>
      </div>
      <div data-aos="fade-left">
      <h2 className="mx-auto max-w-[900px] text-3xl font-bold pb-1 border-b-2">
        Our office
      </h2>
      <div className="grid lg:grid-cols-2 md:grid-cols-2 place-content-around max-w-[900px] mx-auto mb-3">
        <div className="flex flex-col gap-3">
          <h3 className="text-2xl font-bold">Acme Inc Headquarters</h3>
          <p className="text-gray-700 md:text-xl/relaxed">
            123 Main Street, Anytown 
          </p>
          <p className="text-gray-700 md:text-xl/relaxed">
            Phone: (123) 456-7890
          </p>
          <p className="text-gray-700 md:text-xl/relaxed">
            Hours: Monday - Friday, 9am - 5pm
          </p>
        </div>
        <div className="flex-1 w-full aspect-[4/3] rounded-lg ">
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d494.8542397476137!2d72.64711764239419!3d23.050552917182355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e86c2575d2843%3A0x4548d8fb329d9be5!2sC-10%2C%20Thakkarbapanagar%2C%20Ahmedabad%2C%20Gujarat%20380038!5e0!3m2!1sen!2sin!4v1717523550455!5m2!1sen!2sin"
            // width="400"
            // height="300"
            className="w-full h-52"
            style={{ border: 1 }}
            allowfullscreen=""
            loading="lazy"
        ></iframe>
        </div>
      </div>
      </div>
    </div>
  );
}
