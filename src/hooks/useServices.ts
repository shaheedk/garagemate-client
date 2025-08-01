import { useState } from "react";
import type { ServiceData } from "../types/ServiceType";

const useService = () => {
  const headers = [
    "Service Name",
    "Description",
    "Base Price",
    "Warranty",
    "Status",
    "Actions",
  ];

  const [services, setServices] = useState<ServiceData[]>([]);
  const fetchServices = async () => {
    const response = [
      {
        serviceName: "Car Polishing",
        description: "Polish car using these lorem ipsum",
        price: "12999 ₹",
        warranty: "12 M",
        status: "Active",
      },
      {
        serviceName: "Bike Wash",
        description: "Full wash service",
        price: "499 ₹",
        warranty: "6 M",
        status: "Inactive",
      },
    ];
    setServices(response);
  };
  const handleEdit = (item: ServiceData) => {
    console.log("Edit clicked for:", item);
    // You can open a modal or navigate to an edit form
  };

  const handleDelete = (item: ServiceData) => {
    console.log("Delete clicked for:", item);
    // Show confirmation, then send DELETE request to backend
  };

  // add new service

  const [fields, setFields] = useState([
    {
      name: "service_name",
      label: "Service Name",
      type: "text",
      placeholder: "Enter Service name",
      value: "",
    },
    {
      name: "service_price",
      label: "Service Price",
      type: "text",
      placeholder: "Enter Service price",
      value: "",
    },
    {
      name: "service_decription",
      label: "Service Description",
      type: "text",
      placeholder: "Enter Service Details",
      value: "",
    },
    {
      name: "service_duration",
      label: "Service Estimated Duration",
      type: "text",
      placeholder: "Enter Service Estimated duration",
      value: "",
    },
    {
      name: "service_warranty",
      label: "Service Warranty ",
      type: "text",
      placeholder: "Enter Service Warranty in months",
      value: "",
    },
  ]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", fields);
    // Here you can handle API request
  };

  const handleInputChange = (index: number, event: any) => {
    const newFields = [...fields];
    newFields[index].value = event.target.value;
    setFields(newFields);
  };

  return {
    services,
    headers,
    setServices,
   fetchServices,
    handleEdit,
    handleDelete,
    fields,
    handleInputChange,
    handleSubmit,
  };
};
export default useService;
