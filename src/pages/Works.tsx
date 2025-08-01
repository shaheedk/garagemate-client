import UserActions from "../components/layout/headers/UserActions"
import Sidebar from "../components/layout/Sidebar"


const Works = () => {
  return (
    <div className="flex">
      <Sidebar/>
   <div className="flex-1 flex flex-col w-full md:w-auto p-4 sm:px-6 lg:px-10 py-2">
        <div className="flex  justify-between items-start sm:items-center  pb-4 gap-4">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            Create Work Order
          </h1>
          <UserActions />
        </div>
      </div>
    </div>
  )
}

export default Works
