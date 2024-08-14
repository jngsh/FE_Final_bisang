import { Link, useLocation } from "react-router-dom"
import { useContextElement } from "@/context/Context";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import BASE_URL from "@/utils/globalBaseUrl";

export default function CartDrawer() {
  // const { cartProducts, setCartProducts, totalPrice, setTotalPrice, logined, token } = useContextElement();
  // const { cartId } = useContextElement();
  // const [loading, setLoading] = useState(true);
  // const [localCart, setLocalCart] = useState([]);
  // const [checkboxes, setCheckboxes] = useState({
  //   free_shipping: false,
  //   flat_rate: false,
  //   local_pickup: false
  // });

  // const { pathname } = useLocation();
  // const closeCart = () => {
  //   document
  //     .getElementById("cartDrawerOverlay")
  //     .classList.remove("page-overlay_visible");
  //   document.getElementById("cartDrawer").classList.remove("aside_visible");
  // };
  // // const setQuantity = (id, quantity) => {
  // //   if (quantity >= 1) {
  // //     const item = cartProducts.filter((elm) => elm.id == id)[0];
  // //     const items = [...cartProducts];
  // //     const itemIndex = items.indexOf(item);
  // //     item.quantity = quantity;
  // //     items[itemIndex] = item;
  // //     setCartProducts(items);
  // //   }
  // // };

  // const setQuantity = async (cartItemId, quantity) => {
  //   if (quantity >= 1) {
  //     try {
  //       const response = await axios.put(`${BASE_URL}/bisang/carts/items`, { cartItemId, amount: quantity });
  //       const updatedCart = response.data || [];
  //       setCartProducts(updatedCart);
  //       setLocalCart(updatedCart);
  //       localStorage.setItem('cartProducts', JSON.stringify(updatedCart));

  //       const newTotalPrice = updatedCart.reduce(
  //         (total, item) => total + (item.amount * item.product.productPrice), 0
  //       );
  //       setTotalPrice(newTotalPrice);
  //     } catch (error) {
  //       console.error("수량 업데이트 중 오류 발생:", error);
  //     }
  //   }
  // };

  // // const removeItem = (id) => {
  // //   setCartProducts((pre) => [...pre.filter((elm) => elm.id != id)]);
  // // };
  // // useEffect(() => {
  // //   closeCart();
  // // }, [pathname]);

  // const removeItem = async (cartItemId) => {
  //   try {
  //     const response = await axios.delete(`${BASE_URL}/bisang/carts/items/${cartItemId}`);
  //     const updatedCart = response.data || [];
  //     setCartProducts(updatedCart);
  //     setLocalCart(updatedCart);
  //     localStorage.setItem('cartProducts', JSON.stringify(updatedCart));

  //     const newTotalPrice = updatedCart.reduce(
  //       (total, item) => total + (item.amount * item.product.productPrice), 
  //       0
  //     );
  //     setTotalPrice(newTotalPrice);
  //   } catch (error) {
  //     console.error("아이템 삭제 중 오류 발생:", error);
  //   }
  // };

  // useEffect(() => {
  //   // 로그인 상태가 true일 때만 카트 데이터를 가져옵니다.
  //   if (logined) {
  //     const fetchCartProducts = async () => {
  //       try {
  //         const response = await axios.get(`${BASE_URL}/bisang/carts/${cartId}/items`, {
  //           headers: {
  //             Authorization: token ? `Bearer ${token}` : ''
  //           }
  //         });
  //         console.log("response.data", response.data);
  //         if (response.data && response.data.length) {
  //           // 서버에서 가져온 카트 데이터를 상태에 저장합니다.
  //           setCartProducts(response.data);
  //         } else {
  //           // 카트 데이터가 없는 경우 처리
  //           setCartProducts([]);
  //         }
  //       } catch (error) {
  //         console.error('Error fetching cart products:', error);
  //         // 오류 처리 (예: 상태 초기화 등)
  //         setCartProducts([]);
  //       }
  //     };
  
  //     fetchCartProducts();
  //   }
  // }, [logined, token]); // `logined`, `token`이 변경될 때마다 실행
  
  // useEffect(() => {
  //   const fetchCartItems = async () => {
  //     if (!cartId) {
  //       console.warn("No cartId found.");
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       const [cartResponse, itemsResponse] = await Promise.all([
  //         axios.get(`${BASE_URL}/bisang/carts/${cartId}`),
  //         axios.get(`${BASE_URL}/bisang/carts/${cartId}/items`)
  //       ]);
        
  //       const items = itemsResponse.data || [];
  //       setLocalCart(items);
  //       setCartProducts(items);

  //       const calculatedTotalPrice = items.reduce(
  //         (total, item) => total + (item.amount * item.product.productPrice), 0
  //       );
  //       setTotalPrice(calculatedTotalPrice);

  //     localStorage.setItem('cartProducts', JSON.stringify(items));     
  //     } catch (error) {
  //       console.error("카트 데이터를 가져오는 중 오류 발생:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCartItems();
  // }, [totalPrice]);

  return (
    <>

    </>
  );
}
