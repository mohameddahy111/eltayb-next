// "use client"

import axios from "axios";
import { useEffect, useState } from "react";

export const useGetProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const getProduct = async () => {
    return await axios.get(`${process.env.URL}/product`);
  };

  useEffect(() => {
    getProduct()
      .then((res) => {
        if (res.status === 200) {
          setProducts(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

return {products , loading ,error}
};
