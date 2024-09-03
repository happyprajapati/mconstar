import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";

export default function Cards({ name }) {
  const [message, setMsg] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (name === "new") {
      fetch(`${import.meta.env.VITE_BASE_URL}/api/products/?page=0&size=8`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          // Authorization: `Bearer eyJhbGciOiJIUzM4NCJ9.eyJpYXQiOjE3MjQ4MTk4ODcsImV4cCI6MTcyNDkwNjI4NywicGhvbmUiOiIxMjM0NTY3ODkwIiwiYXV0aG9yaXRpZXMiOiJST0xFX1VTRVIifQ.cpD-2p3gTf0wyXPnff8HlPif_ZK0lvKwD5VeXo54NYGapL32NtK-7Wv3RBJgQgRd`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            console.log(res.data.content);
            setProducts(res.data.content);
            // console.log(res.data);
          }
        });
    } else if (name === "admin") {
      fetch(`${import.meta.env.VITE_BASE_URL}/api/products/featured`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          // Authorization: `Bearer eyJhbGciOiJIUzM4NCJ9.eyJpYXQiOjE3MjQzOTAyNTIsImV4cCI6MTcyNDQ3NjY1MiwicGhvbmUiOiIxMjM0NTY3ODkwIiwiYXV0aG9yaXRpZXMiOiJST0xFX1VTRVIifQ.fJ4AsVIViddZhzi7vYUNETV6a4pOGRojzeivTxNFJmRP5hZRHk4lIrNAMLrwoUH-`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            console.log(res.data.content);
            setProducts(res.data.content);
            // console.log(res.data);
          }
        });
    }
  }, []);

  return (
    <>
      {name == "new" && (
        <div className="items-center mx-7 my-10">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl pb-5">
            New Arrival
          </h2>
          <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products?.map((prod, key) => (
              <a key={key} href={`/prod/${prod.id}`}>
                <Card className="">
                  <CardHeader floated={false} className="h-64">
                    <img
                      src={`${import.meta.env.VITE_BASE_URL}/api/products/image/${prod.imageNames[0]}`}
                      alt="card-image"
                      className="h-full w-full object-cover"
                    />
                  </CardHeader>
                  <CardBody>
                    <div className="flex items-center justify-between">
                      <Typography color="blue-gray" className="font-medium">
                        {prod.title}
                      </Typography>
                    </div>
                  </CardBody>
                </Card>
              </a>
            ))}
          </div>
        </div>
      )}

      {name == "admin" && (
        <div className="items-center mx-7 my-10">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl pb-5">
            Top Trending
          </h2>
          <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products?.map((prod, key) => (
              <a key={key} href={`/prod/${prod.id}`}>
                <Card className="">
                  <CardHeader floated={false} className="h-64">
                    <img
                      src={`${import.meta.env.VITE_BASE_URL}/api/products/image/${prod.imageNames[0]}`}
                      alt="card-image"
                      className="h-full w-full object-cover"
                    />
                  </CardHeader>
                  <CardBody>
                    <div className="flex items-center justify-between">
                      <Typography color="blue-gray" className="font-medium">
                        {prod.title}
                      </Typography>
                    </div>
                  </CardBody>
                </Card>
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
