import useBill from "../hooks/useBill";
import BillInput from "../components/common/input/BillInput";
import Sidebar from "../components/layout/Sidebar";
import BillTable from "../components/ui/BillTable";
import SearchBar from "../components/common/search/SearchBar";

const Billing = () => {
  const { fields, handleSubmit, handleInputChange } = useBill();

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-10">
        {/* Header */}
        <div className="mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold">Billing</h1>
          <p className="text-gray-600 text-lg">
            Create and manage bills for your detailing services.
          </p>
        </div>

        {/* Create New Bill Section */}
        <div className="bg-white  rounded-xl p-8 max-w-5xl">
          <h2 className="text-2xl font-semibold mb-6">Create New Bill</h2>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Section: Vehicle & Customer details */}
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Vehicle & Customer details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.slice(0, 4).map((field, index) => (
                  <BillInput
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    value={field.value}
                    placeholder={field.placeholder}
                    onChange={(e) => handleInputChange(index, e)}
                    className="w-full"
                  />
                ))}
              </div>
            </div>

            {/* Section: Service details */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Service details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.slice(4, 6).map((field, index) => (
                  <BillInput
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    value={field.value}
                    placeholder={field.placeholder}
                    onChange={(e) => handleInputChange(index + 4, e)}
                    className="w-full"
                  />
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {fields.slice(6, 8).map((field, index) => (
                  <BillInput
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    value={field.value}
                    placeholder={field.placeholder}
                    onChange={(e) => handleInputChange(index + 6, e)}
                    className="w-full"
                  />
                ))}
              </div>
            </div>

            {/* Section: Price details */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Price details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.slice(8).map((field, index) => (
                  <BillInput
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    value={field.value}
                    placeholder={field.placeholder}
                    onChange={(e) => handleInputChange(index + 8, e)}
                    className="w-full"
                  />
                ))}
              </div>
            </div>

            
            <div className="flex items-center justify-between gap-4 py-4">
  {/* Payment Method Section */}
  <div>
    <h3 className="text-xl font-semibold mb-2">Payment Method</h3>
    <div className="flex gap-2">
      <button
        type="button"
        className="px-4 py-2 border rounded-md hover:bg-gray-100 transition"
      >
        CASH
      </button>
      <button
        type="button"
        className="px-4 py-2 border rounded-md hover:bg-gray-100 transition"
      >
        UPI
      </button>
    </div>
  </div>

  {/* Print Bill Button */}
  <div>
    <button
      type="submit"
      className="px-8 py-3 bg-gray-300 text-black font-medium rounded-md hover:bg-gray-400 transition mt-8"
    >
      Print Bill
    </button>
  </div>
</div>

          </form>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm mt-8">
          {/* Section Title */}
          <h3 className="text-lg font-semibold mb-4">Past Bills</h3>
          <SearchBar />
          <BillTable />
        </div>
      </div>
    </div>
  );
};

export default Billing;
