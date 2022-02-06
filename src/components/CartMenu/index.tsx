import React, { FunctionComponent } from "react";
import {
  CaretDownOutlined,
  ShoppingCartOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { List, Popover } from "antd";

type ProductDetails = {
  id: string;
  title: string;
  desc: string;
  image: string;
  price: string;
  currency: string;
  quantity: number;
};

type CartMenuProps = {
  productDetails: ProductDetails[];
  deleteItem: (index: number) => void;
};

const CartMenu: FunctionComponent<CartMenuProps> = ({
  productDetails,
  deleteItem,
}: CartMenuProps) => {
  let numberOfItem: number = 0;
  let totalCost: number = 0;
  let currency: string = "";
  productDetails.forEach((item) => {
    if (item.quantity) {
      numberOfItem += item.quantity;
      totalCost += parseInt(item.price);
      currency = item.currency;
    }
  });

  const content = (
    <List
      className="menu-cart-listing"
      dataSource={productDetails}
      renderItem={(item: ProductDetails, index: number) =>
        item.quantity ? (
          <List.Item key={item.id} className="menu-list-item">
            <List.Item.Meta
              avatar={<CloseOutlined onClick={() => deleteItem(index)} />}
              title={item.title}
              description={`${item.currency}
                  ${item.price}`}
            />
            <div className="list-content">{`Qty ${item.quantity}`}</div>
          </List.Item>
        ) : (
          <></>
        )
      }
    />
  );

  return numberOfItem ? (
    <Popover
      placement="bottomRight"
      title={null}
      content={content}
      trigger="click"
    >
      <div>
        <div>{`${currency}${totalCost}`}</div>
        <div>
          {`${numberOfItem} items`} <CaretDownOutlined />
          <ShoppingCartOutlined style={{ fontSize: 20 }} />
        </div>
      </div>
    </Popover>
  ) : (
    <>
      <div>{`${currency}${totalCost}`}</div>
      <div>
        {`${numberOfItem} items`}
        <ShoppingCartOutlined style={{ fontSize: 20 }} />
      </div>
    </>
  );
};

export default CartMenu;
