import { useNavigate } from "react-router-dom";
import { useGetEmployeeDetailsQuery } from "../../data/employee-detailApi";
import { EmployeeDetailTable } from "../components/EmployeeDetailTable";
import type { Employee } from "../../domain/employee-detail.types";

export function EmployeeDetailPage() {
  const {
    data: employees = [],
    isLoading,
    isError,
  } = useGetEmployeeDetailsQuery();
  const navigate = useNavigate();

  const handleSelect = (employee: Employee) => {
    navigate(`/employee-detail/${employee.id}`);
  };

  if (isLoading) {
    return <p className="p-8 text-gray-500">Loading employees...</p>;
  }

  if (isError) {
    return <p className="p-8 text-red-600">Failed to load employees.</p>;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        Employee Detail
      </h1>
      <EmployeeDetailTable employees={employees} onSelect={handleSelect} />
    </div>
  );
}
