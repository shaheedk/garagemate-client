import { useState } from "react";
import type { ServiceData } from "../types/ServiceType";
import { extractData } from "../utils/helper";
import instance from "../axios/axios";
import { toast } from "react-toastify";

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
    const response = await instance.get('/service')
    console.log("service response", response.data);
    setServices(response.data);
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
      name: "serviceName",
      label: "Service Name",
      type: "text",
      placeholder: "Enter Service name",
      value: "",
    },
    {
      name: "price",
      label: "Service Price",
      type: "number",
      placeholder: "Enter Service price",
      value: "",
    },
    {
      name: "description",
      label: "Service Description",
      type: "text",
      placeholder: "Enter Service Details",
      value: "",
    },
    {
      name: "warranty",
      label: "Service Warranty ",
      type: "text",
      placeholder: "Enter Service Warranty in months",
      value: "",
    },
  ]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = extractData(fields);

    try {
      const res = await instance.post('/service', payload);
      toast.success('Service created successfully!');
      console.log("Form Submitted:", res.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create service');
      console.error("Error submitting form:", error);
    }
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
