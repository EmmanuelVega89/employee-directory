import { useState } from "react";
import { useGetEmployeesQuery } from "../../data/employeesApi";
import { EmployeesTable } from "../components/EmployeesTable";
import { EmployeeCreateForm } from "../components/EmployeeCreateForm";

export function EmployeesPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { data: employees = [], isLoading, isError } = useGetEmployeesQuery();

  if (isLoading) {
    return <p className="p-8 text-gray-500">Loading employees...</p>;
  }

  if (isError) {
    return <p className="p-8 text-red-600">Failed to load employees.</p>;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Employee Directory
        </h1>
        {!showCreateForm && (
          <button
            onClick={() => setShowCreateForm(true)}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
          >
            New Employee
          </button>
        )}
      </div>

      {showCreateForm && (
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Create Employee
          </h2>
          <EmployeeCreateForm
            onSuccess={() => setShowCreateForm(false)}
            onCancel={() => setShowCreateForm(false)}
          />
        </div>
      )}

      <EmployeesTable employees={employees} />
    </div>
  );
}
