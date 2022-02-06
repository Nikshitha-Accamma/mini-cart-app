import React, { FunctionComponent, useEffect, useState } from "react";
import { Avatar, Card, InputNumber, List } from "antd";
import fetchClient from "../../http-commons";
import { API_END_POINTS } from "../../constants";
import { showNotification } from "../../helper/notification";
import Loader from "../../components/Loader";
import CartMenu from "../../components/CartMenu";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import "./index.scss";

type ProductDetails = {
  id: string;
  title: string;
  desc: string;
  image: string;
  price: string;
  currency: string;
  quantity: number;
  initialPrice: string;
};

/**
 * contains cart section
 */
const CartDetails: FunctionComponent = () => {
  const [cartData, setCardData] = useState<ProductDetails[]>([]);
  const [loading, setIsLoading] = useState(true);
  useEffect(() => {
    const cartDetails = localStorage.getItem("productDetails");
    if (cartDetails) {
      setCardData(JSON.parse(cartDetails));
      setIsLoading(false);
    } else {
      fetchClient
        .get(API_END_POINTS.CART_DETAILS)
        .then((res) => {
          setIsLoading(false);
          if (res.data.products) {
            const result = res.data.products.map((item: ProductDetails) => {
              return {
                ...item,
                quantity: 1,
                initialPrice: item.price,
              };
            });
            setCardData(result);
            localStorage.setItem("productDetails", JSON.stringify(result));
          }
        })
        .catch(() => {
          setIsLoading(false);
          showNotification(
            "error",
            "Error while fetching cart details",
            "Cart Details"
          );
        });
    }
  }, []);
  const removeItem = (index: number) => {
    const newProductDetails = [...cartData];
    newProductDetails[index].quantity -= 1;
    console.log(
      "newProductDetails[index].price =",
      newProductDetails[index].price
    );
    if (newProductDetails[index].quantity) {
      newProductDetails[index].price = `${
        newProductDetails[index].quantity *
        parseInt(newProductDetails[index].price)
      }`;
    } else {
      newProductDetails[index].price = newProductDetails[index].initialPrice;
    }
    setCardData(newProductDetails);
    localStorage.setItem("productDetails", JSON.stringify(newProductDetails));
  };
  const addItem = (index: number) => {
    const newProductDetails = [...cartData];
    newProductDetails[index].quantity += 1;
    newProductDetails[index].price = `${
      newProductDetails[index].quantity *
      parseInt(newProductDetails[index].price)
    }`;
    setCardData(newProductDetails);
    localStorage.setItem("productDetails", JSON.stringify(newProductDetails));
  };
  const deleteItem = (index: number) => {
    const newProductDetails = [...cartData];
    newProductDetails[index].quantity = 0;

    newProductDetails[index].price = newProductDetails[index].initialPrice;

    setCardData(newProductDetails);
    localStorage.setItem("productDetails", JSON.stringify(newProductDetails));
  };
  return (
    <Card
      className="cart-container"
      type="inner"
      title=""
      extra={<CartMenu productDetails={cartData} deleteItem={deleteItem} />}
    >
      {loading ? (
        <Loader fontSize={60} />
      ) : (
        <List
        className="cart-listing"
          dataSource={cartData}
          renderItem={(item: ProductDetails, index: number) => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={<Avatar src={item.image} />}
                title={item.title}
                description={item.desc}
              />
              <div>
                {item.quantity ? (
                  <span
                    onClick={() => removeItem(index)}
                    className="remove-add-icon"
                  >
                    <MinusOutlined />
                  </span>
                ) : (
                  ""
                )}
                <InputNumber
                  disabled
                  value={item.quantity}
                  style={{ width: 40 }}
                />
                <span
                  onClick={() => addItem(index)}
                  className="remove-add-icon"
                >
                  <PlusOutlined />
                </span>
                {item.quantity ? (
                  <span className="price-details">{`${item.currency}${item.price}`}</span>
                ) : (
                  ""
                )}
              </div>
            </List.Item>
          )}
        />
      )}
    </Card>
  );
};

export default CartDetails;
