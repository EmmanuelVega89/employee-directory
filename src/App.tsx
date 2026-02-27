import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import { EmployeesPage } from "./features/employees/presentation/pages/EmployeesPage";
import { EmployeeDetailPage } from "./features/employee-detail/presentation/pages/EmployeeDetailPage";
import { EmployeeDetailDetailPage } from "./features/employee-detail/presentation/pages/EmployeeDetailDetailPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-8 px-4 sm:px-6 lg:px-8">
          <span className="py-4 text-lg font-bold text-gray-900">
            Employee Directory
          </span>
          <div className="flex gap-4">
            <NavLink
              to="/employees"
              className={({ isActive }) =>
                `border-b-2 px-1 py-4 text-sm font-medium ${
                  isActive
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`
              }
            >
              Employees
            </NavLink>
            <NavLink
              to="/employee-detail"
              className={({ isActive }) =>
                `border-b-2 px-1 py-4 text-sm font-medium ${
                  isActive
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`
              }
            >
              Employee Detail
            </NavLink>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/employees" replace />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/employee-detail" element={<EmployeeDetailPage />} />
        <Route
          path="/employee-detail/:id"
          element={<EmployeeDetailDetailPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
