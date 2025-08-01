import { useEffect } from "react";
import InfoCard from "../components/common/infocard/InfoCard";
import { useWorkOrders } from "../hooks/useWorkOrders";
import useService from "../hooks/useServices";
import useProduct from "../hooks/useProduct";
import Sidebar from "../components/layout/Sidebar";

const WorkOrderPage = () => {
  const {
    selectedService,
    setSelectedService,
    charges,
    chargeAmount,
    setChargeAmount,
    chargeLabel,
    setChargeLabel,
    addCharge,
    removeCharge,
    productsInfo,
    selectedProduct,
    setSelectedProduct,
    productQty,
    setProductQty,
    addProduct,
    removeProduct,
    totalServiceCharge,
    totalProductCost,
  } = useWorkOrders();

const{
  services,
fetchServices
}=useService()

const{
  fetchProducts,
  products
}=useProduct()

// const{fetchProducts,products}=useProduct()
  // Fake API response
  

  useEffect(() => {
   
  fetchServices()
    fetchProducts()
  }, []);

  return (
    <div className="flex ">
      <Sidebar/>
      <div className="p-6 space-y-6  ">
      {/* SERVICES */}
      <div >
        <div>
        <h2 className="text-lg font-bold mb-2">Service</h2>
        {selectedService && (
          <InfoCard
            title={`Name: ${selectedService.serviceName}`}
            data={[{ label: "Base Price", value: selectedService.price }]}
            onRemove={() => setSelectedService(null)}
          />
        )}
        <select
          className="border p-2 rounded"
          onChange={(e) =>
            setSelectedService(
              services.find((s) => s.serviceName === e.target.value) || null
            )
          }
        >
          <option value="">Select Service</option>
          {services.map((service) => (
            <option key={service.serviceName} value={service.serviceName}>
              {service.serviceName}
            </option>
          ))}
        </select>

        
      </div>

      {/* CHARGES */}
      <div>
        <h2 className="text-lg font-bold mb-2">Additional Charges</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {charges.map((c, index) => (
            <InfoCard
              key={index}
              title={`Charge: ${c.amount} ₹`}
              data={[{ label: "For", value: c.label }]}
              onRemove={() => removeCharge(index)}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="number"
            placeholder="Enter Charge"
            className="border p-2 rounded"
            value={chargeAmount}
            onChange={(e) => setChargeAmount(e.target.value)}
          />
          <input
            type="text"
            placeholder="Charge For"
            className="border p-2 rounded"
            value={chargeLabel}
            onChange={(e) => setChargeLabel(e.target.value)}
          />
          <button onClick={addCharge} className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Charge
          </button>
        </div>
        
        <p className="font-bold mt-2">Total Service Charge: {totalServiceCharge()} ₹</p>
      </div></div>

      {/* PRODUCTS */}
      <div>
        <h2 className="text-lg font-bold mb-2">Products</h2>
        <div className="flex items-center gap-2 mb-2">
          <select
            className="border p-2 rounded"
            onChange={(e) =>
              setSelectedProduct(
                products.find((p) => p.productName === e.target.value) || null
              )
            }
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p.productName} value={p.productName}>
                {p.productName}
              </option>
            ))}
          </select>
          <input
            type="number"
            min={1}
            className="border p-2 rounded w-24"
            value={productQty}
            onChange={(e) => setProductQty(Number(e.target.value))}
          />
          <button onClick={addProduct} className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Product
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {productsInfo.map((p, index) => (
            <InfoCard
              key={index}
              title={`Product: ${p.product.productName}`}
              data={[
                { label: "Qty", value: `${p.qty}` },
                { label: "Price", value: `${p.product.price} ₹` },
              ]}
              onRemove={() => removeProduct(index)}
            />
          ))}
        </div>
        <p className="font-bold mt-2">Total Product Cost: {totalProductCost()} ₹</p>
      </div>
    </div>
    </div>
  );
};

export default WorkOrderPage;
