import { allProducts } from "@/data/products";
import axiosInstance from "@/utils/globalAxios";
import React, { useEffect } from "react";
import { useContext, useState } from "react";

const dataContext = React.createContext();

export const useContextElement = () => {
  return useContext(dataContext);
};

export default function Context({ children }) {

const storedOrderDetails = JSON.parse(localStorage.getItem('orderDetails')) || null;
  
const storedLogined = JSON.parse(localStorage.getItem('logined') || 'false');
  const storedCartId = localStorage.getItem('cartId');
  const storedCartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  const [orderDetails, setOrderDetails] = useState(storedOrderDetails);
  const [cartProducts, setCartProducts] = useState(storedCartProducts);
  const [wishList, setWishList] = useState([]);
  const [quickViewItem, setQuickViewItem] = useState(allProducts[0]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [logined, setLogined ] = useState(storedLogined);
  const [cartId, setCartId] = useState(storedCartId);

  const [cartAmount, setCartAmount] = useState(0);

  // useEffect(() => {
  //   const subtotal = cartProducts.reduce((accumulator, product) => {
  //     return accumulator + product.quantity * product.price;
  //   }, 0);
  //   setTotalPrice(subtotal);
  // }, [cartProducts]);


  // useEffect(() => {
  //   // if (cartId) {
  //     // fetchOrderedDetails(cartId);
  //   // }

  //   const fetchOrderedDetails = async (cartId) => {
  //     console.log('>>>>>>>>>>>>>cartid는 찍혀?', cartId);
  //     try {
  //       const response = await axiosInstance.post(`/bisang/pay/details`, {cartId});
  //       console.log("response1");
  //       setOrderedDetail(response.data);
  //       console.log("ordered:",orderedDetail);
  //       console.log("response2");
  //       localStorage.setItem("orderedDetail", JSON.stringify(response.data));
  //       console.log("response3");
  //       console.error('>>>>>>>>>>>>>context/들어옴?', response.data);
  //     } catch (error) {
  //       console.log('Error fetching order details:', error);
  //     }
  //   }
  //   if (cartId) {
  //     fetchOrderedDetails(cartId);
  //   }
  // },[]);

  // const fetchOrderedDetails = async (cartId) => {
  //   console.log('>>>>>>>>>>>>>cartid는 찍혀?', cartId);
  //   try {
  //     const response = await axiosInstance.post(`/bisang/pay/details`, {cartId});
  //     setOrderedDetail(response.data);
  //     console.error('>>>>>>>>>>>>>context/들어옴?', response.data);
  //   } catch (error) {
  //     console.error('Error fetching order details:', error);
  //   }
  // };

  // useEffect(() => {
  //   const subtotal = cartProducts.reduce((accumulator, product) => {
  //     return accumulator + product.quantity * product.price;
  //   }, 0);
  //   setTotalPrice(subtotal);
  // }, [cartProducts]);

  const addProductToCart = (id) => {
    if (!cartProducts.filter((elm) => elm.id == id)[0]) {
      const item = {
        ...allProducts.filter((elm) => elm.id == id)[0],
        quantity: 1,
      };
      setCartProducts((pre) => [...pre, item]);

      document
        .getElementById("cartDrawerOverlay")
        .classList.add("page-overlay_visible");
      document.getElementById("cartDrawer").classList.add("aside_visible");
    }
  };
  const isAddedToCartProducts = (id) => {
    if (cartProducts.filter((elm) => elm.id == id)[0]) {
      return true;
    }
    return false;
  };

  const toggleWishlist = (id) => {
    if (wishList.includes(id)) {
      setWishList((pre) => [...pre.filter((elm) => elm != id)]);
    } else {
      setWishList((pre) => [...pre, id]);
    }
  };
  const isAddedtoWishlist = (id) => {
    if (wishList.includes(id)) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartProducts"));
    if (items?.length) {
      setCartProducts(items);
    }

  }, []);

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("wishlist"));
    if (items?.length) {
      setWishList(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishList));
  }, [wishList]);

  useEffect(() => {
    localStorage.setItem("logined", JSON.stringify(logined));
  }, [logined]);

  useEffect(() => {
    localStorage.setItem("cartId", cartId);
  }, [cartId]);

  useEffect(() => {
    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));

    console.log("orderdetails가 그래서 들어왔니? :"+orderDetails); //여기서는 아직 못받아옴
    
  }, [orderDetails]);

  const resetCart = () => {
    setCartProducts([]);
    localStorage.removeItem('cartProducts');
  }

  const contextElement = {
    cartProducts,
    setCartProducts,
    totalPrice,
    setTotalPrice,
    addProductToCart,
    isAddedToCartProducts,
    toggleWishlist,
    isAddedtoWishlist,
    quickViewItem,
    wishList,
    setQuickViewItem,
    logined,
    setLogined,
    orderDetails,
    setOrderDetails,
    cartId,
    setCartId,
    cartAmount,
    setCartAmount,
    resetCart
  };
  return (
    <dataContext.Provider value={contextElement}>
      {children}
    </dataContext.Provider>
  );
}
