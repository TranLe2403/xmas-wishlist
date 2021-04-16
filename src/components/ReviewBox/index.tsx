import React, { useEffect, useState } from "react";

import "./index.css";
import { ModifiedCart, ProductDetail } from "../../types";
import OverviewField from "../OverviewField";
import Total from "../Total";

export type ProductListAfterAction = {
  childrenId: number;
  products: ProductDetail[];
};

type ProductForTotal = {
  [id: number]: {
    title: string;
    repeatTimes: number;
    quantity: number;
    price: number;
  };
};

type Props = {
  discardList: ProductListAfterAction[];
  approveList: ProductListAfterAction[];
  discardItemList: ModifiedCart | undefined;
};

const ReviewBox = ({
  discardList,
  approveList,
  discardItemList,
}: Props): JSX.Element => {
  const [combinedDiscardArray, setCombinedDiscardArray] = useState<
    ProductListAfterAction[]
  >([]);
  const [allApprovedProductList, setAllApprovedProductList] = useState<
    ProductDetail[]
  >([]);

  useEffect(() => {
    if (discardItemList) {
      // possible to be undefined
      const itemlist = Object.values(discardItemList);

      const newItemList: ProductListAfterAction[] = itemlist.map((item) => {
        return { childrenId: item.id, products: Object.values(item.products) };
      });

      setCombinedDiscardArray(discardList.concat(newItemList));
    } else {
      setCombinedDiscardArray(discardList);
    }

    const approvedProductList = approveList.reduce((acc, val) => {
      return acc.concat(val.products);
    }, [] as ProductDetail[]);

    setAllApprovedProductList(approvedProductList);
  }, [discardList, discardItemList, approveList]);

  console.log(allApprovedProductList);

  const productsForTotal: ProductForTotal = allApprovedProductList.reduce(
    (acc: ProductForTotal, val) => {
      const isSavedProductId = acc.hasOwnProperty(val.id); //check if product id is saved already from different cart
      return {
        ...acc,
        [val.id]: {
          title: val.title,
          repeatTimes: isSavedProductId ? acc[val.id].repeatTimes + 1 : 1,
          quantity: isSavedProductId
            ? acc[val.id].quantity + val.quantity
            : val.quantity,
          price: val.price,
        },
      };
    },
    {}
  );

  const productsInTotalArray = Object.values(productsForTotal);

  return (
    <div className="overview-box-container">
      <h2>Let's take a look at overview</h2>
      <div className="overview-fields-container">
        <OverviewField itemsList={approveList} field="Approve" />
        <div className="field-separator"></div>
        <OverviewField itemsList={combinedDiscardArray} field="Discard" />
      </div>
      <Total productsInTotalArray={productsInTotalArray} />
    </div>
  );
};

export default ReviewBox;