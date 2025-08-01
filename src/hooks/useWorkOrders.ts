import { useState } from "react";

interface Service {
  serviceName: string;
  price: string; // e.g., "12999 ₹"
}

interface Product {
  productName: string;
  price: number;
}

export const useWorkOrders = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [charges, setCharges] = useState<{ amount: number; label: string }[]>(
    []
  );
  const [chargeAmount, setChargeAmount] = useState("");
  const [chargeLabel, setChargeLabel] = useState("");

  const [productsInfo, setProductsInfo] = useState<  { product: Product; qty: number }[] >([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productQty, setProductQty] = useState(1);

  const addCharge = () => {
    if (chargeAmount && chargeLabel) {
      setCharges([
        ...charges,
        { amount: parseInt(chargeAmount), label: chargeLabel },
      ]);
      setChargeAmount("");
      setChargeLabel("");
    }
  };

  const removeCharge = (index: number) => {
    setCharges(charges.filter((_, i) => i !== index));
  };

  const addProduct = () => {
    if (selectedProduct) {
      setProductsInfo([
        ...productsInfo,
        { product: selectedProduct, qty: productQty },
      ]);
      setSelectedProduct(null);
      setProductQty(1);
    }
  };

  const removeProduct = (index: number) => {
    setProductsInfo(productsInfo.filter((_, i) => i !== index));
  };

  const totalServiceCharge = () => {
    const base = selectedService
      ? parseInt(selectedService.price.replace(" ₹", ""))
      : 0;
    const extras = charges.reduce((sum, c) => sum + c.amount, 0);
    return base + extras;
  };

  const totalProductCost = () => {
    return productsInfo.reduce(
      (total, p) => total + p.product.price * p.qty,
      0
    );
  };

  return {
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
  };
};
