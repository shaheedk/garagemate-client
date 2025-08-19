import { useEffect, useState } from "react";
import instance from "../axios/axios"; // 👈 your axios instance
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // 👈 plugin

const WorkOrderTable = () => {
  const [workOrders, setWorkOrders] = useState<any[]>([]);

  // ✅ Fetch work orders
  const fetchWorkOrders = async () => {
    try {
      const res = await instance.get("/work-order"); // 👈 your API
      setWorkOrders(res.data.data); // response: { success, data }
    } catch (err) {
      console.error("Error fetching work orders", err);
    }
  };

  useEffect(() => {
    fetchWorkOrders();
  }, []);

  // ✅ Generate PDF Bill (Professional UI)
  const generateBill = (order: any) => {
    const doc = new jsPDF();

    // ---------- HEADER ----------
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("🔧 Garage Service Center", 14, 20);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("123 Main Street, City, State", 14, 28);
    doc.text("Phone: +91 9876543210 | Email: info@garage.com", 14, 34);

    // Line
    doc.setLineWidth(0.5);
    doc.line(14, 38, 195, 38);

    // ---------- CUSTOMER INFO ----------
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text("Customer Information", 14, 48);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${order.costumerId?.name}`, 14, 55);
    doc.text(`Phone: ${order.costumerId?.phone}`, 14, 62);
    doc.text(`Email: ${order.costumerId?.email}`, 14, 69);

    // ---------- VEHICLE INFO ----------
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text("Vehicle Information", 105, 48);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Vehicle: ${order.vehicleId?.brand} ${order.vehicleId?.model} (${order.vehicleId?.year})`,
      105,
      55
    );
    doc.text(`Reg No: ${order.vehicleId?.registration_number}`, 105, 62);

    // ---------- PRODUCTS TABLE ----------
    const productRows = order.productId.map((p: any) => [
      p.productName,
      p.brand,
      `₹${p.price}`,
    ]);

    autoTable(doc, {
      head: [["Product", "Brand", "Price"]],
      body: productRows,
      startY: 80,
      styles: { fontSize: 11 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 }, // blue header
    });

    // Get last Y
    const finalY = (doc as any).lastAutoTable?.finalY || 90;

    // ---------- SERVICE INFO ----------
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text("Service Details", 14, finalY + 10);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Service: ${order.serviceId?.serviceName}`, 14, finalY + 18);
    doc.text(`Service Charge: ₹${order.serviceId?.price}`, 14, finalY + 26);

    // ---------- TOTALS ----------
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text("Payment Summary", 14, finalY + 40);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Total Product Cost: ₹${order.totalProductCost}`, 14, finalY + 48);
    doc.text(`Total Service Charge: ₹${order.totalServiceCharge}`, 14, finalY + 56);

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`Grand Total: ₹${order.totalAmount}`, 14, finalY + 70);

    // Line before footer
    doc.setLineWidth(0.2);
    doc.line(14, 285, 195, 285);

    // ---------- FOOTER ----------
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text("Thank you for choosing Garage Service Center!", 14, 292);

    // ✅ Save PDF
    doc.save(`Bill_${order._id}.pdf`);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Work Orders</h2>
      <table className="min-w-full bg-white border rounded-lg shadow">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border">Customer</th>
            <th className="p-2 border">Vehicle</th>
            <th className="p-2 border">Service</th>
            <th className="p-2 border">Total Amount</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {workOrders.map((order) => (
            <tr key={order._id} className="hover:bg-gray-100">
              <td className="p-2 border">{order.costumerId?.name}</td>
              <td className="p-2 border">{order.vehicleId?.model}</td>
              <td className="p-2 border">{order.serviceId?.serviceName}</td>
              <td className="p-2 border">₹{order.totalAmount}</td>
              <td className="p-2 border">
                <button
                  onClick={() => generateBill(order)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Download Bill
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkOrderTable;
