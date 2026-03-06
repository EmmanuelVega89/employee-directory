import { useState } from "react";
import { useGetEmployeesQuery, useGetDepartmentsQuery } from "../../data/employeesApi";
import { EmployeesTable } from "../components/EmployeesTable";
import { EmployeeCreateForm } from "../components/EmployeeCreateForm";

export function EmployeesPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { data: employees = [], isLoading, isError } = useGetEmployeesQuery();
  const { data: departments = [] } = useGetDepartmentsQuery();

  if (isLoading) {
    return <p className="p-8 text-gray-500">Loading employees...</p>;
  }

  if (isError) {
    return <p className="p-8 text-red-600">Failed to load employees.</p>;
  }

  const filteredEmployees = employees
    .filter((e) => !selectedDepartment || e.department === selectedDepartment)
    .filter((e) => {
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return (
        e.firstName.toLowerCase().includes(term) ||
        e.lastName.toLowerCase().includes(term)
      );
    });

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

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name..."
            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none sm:w-64"
            aria-label="Search employees by name"
          />
        </div>
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          aria-label="Filter by department"
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.name}>
              {dept.name}
            </option>
          ))}
        </select>
      </div>

      {filteredEmployees.length > 0 ? (
        <EmployeesTable employees={filteredEmployees} />
      ) : (
        <p className="py-12 text-center text-sm text-gray-500">
          No employees found matching your search.
        </p>
      )}
    </div>
  );
}
