import React from "react";
import { useLocation } from "react-router-dom";
import CustomerEditForm from "./CustomerEditForm";

const CustomerEditWrapper = () => {
  const location = useLocation();
  const customer = location.state?.customer;

  return <CustomerEditForm customer={customer} />;
};

export default CustomerEditWrapper;
