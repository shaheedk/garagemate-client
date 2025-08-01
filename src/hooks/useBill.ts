import { useState } from "react";

const useBill = () => {
  const [fields, setFields] = useState([
    {
      name: "customer_name",
      label: "Customer Name",
      type: "text",
      placeholder: "Enter customer name",
      value: "",
    },
    {
      name: "vehicle_number",
      label: "Vehicle Number",
      type: "text",
      placeholder: "Enter vehicle number",
      value: "",
    },
    {
      name: "service_brand",
      label: "Vehicle Make and Model",
      type: "text",
      placeholder: "Enter vehicle model & brand",
      value: "",
    },
    {
      name: "number",
      label: "Number",
      type: "text",
      placeholder: "Enter Number",
      value: "",
    },

    // service details 
       {
      name: "service_name",
      label: "Service Name",
      type: "text",
      placeholder: "Enter service name",
      value: "",
    },
    {
      name: "service_warranty",
      label: "Service Warranty",
      type: "text",
      placeholder: "Enter warranty in months",
      value: "",
    },
    {
      name: "worker_name",
      label: "Worker Name",
      type: "text",
      placeholder: "Enter worker name",
      value: "",
    },
    {
      name: "service_description",
      label: "Service Description",
      type: "text",
      placeholder: "Enter service details",
      value: "",
    },

    // price details 
  {
    name: "service_amount",
    label: "Service amount",
    type: "text",
    placeholder: "Enter Service amount",
    value: "",
  },
  {
    name: "tax_amount",
    label: "Tax",
    type: "text",
    placeholder: "Enter Tax amount",
    value: "",
  },
  {
    name: "additional_charge",
    label: "Additional Charge",
    type: "text",
    placeholder: "Enter Additional charge",
    value: "",
  },
  {
    name: "additional_charge_for",
    label: "Additional Charge for",
    type: "text",
    placeholder: "Additional charge for :",
    value: "",
  },
  {
    name: "discount_amount",
    label: "Discount",
    type: "text",
    placeholder: "Enter Discount amount",
    value: "",
  },
  {
    name: "final_amount",
    label: "Final amount have to pay",
    type: "text",
    placeholder: "Final amount",
    value: "",
  }
  ]);

 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Customer Data:", fields);
   
    // TODO: Send to API or backend
  };

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newFields = [...fields];
    newFields[index].value = event.target.value;
    setFields(newFields);
  };

  return {
    fields,
    
    handleSubmit,
    handleInputChange,
  };
};

export default useBill;
