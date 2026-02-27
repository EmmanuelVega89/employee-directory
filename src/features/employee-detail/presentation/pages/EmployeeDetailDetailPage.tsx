import { useParams, useNavigate } from "react-router-dom";
import {
  useGetEmployeeByIdQuery,
  useUpdateEmployeeMutation,
  useGetDetailDepartmentsQuery,
} from "../../data/employee-detailApi";
import { EmployeeDetailForm } from "../components/EmployeeDetailForm";
import type { EmployeeFormData } from "../../domain/employee-detail.types";

export function EmployeeDetailDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const employeeId = Number(id);

  const {
    data: employee,
    isLoading: isLoadingEmployee,
    isError: isEmployeeError,
  } = useGetEmployeeByIdQuery(employeeId);
  const { data: departments = [], isLoading: isLoadingDepartments } =
    useGetDetailDepartmentsQuery();
  const [updateEmployee, { isLoading: isUpdating }] =
    useUpdateEmployeeMutation();

  const handleSubmit = async (data: EmployeeFormData) => {
    await updateEmployee({ id: employeeId, data });
    navigate("/employee-detail");
  };

  const handleBack = () => {
    navigate("/employee-detail");
  };

  if (isLoadingEmployee || isLoadingDepartments) {
    return <p className="p-8 text-gray-500">Loading employee details...</p>;
  }

  if (isEmployeeError || !employee) {
    return <p className="p-8 text-red-600">Failed to load employee.</p>;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <button
        onClick={handleBack}
        className="mb-6 text-sm text-blue-600 hover:text-blue-800"
      >
        &larr; Back to list
      </button>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        {employee.firstName} {employee.lastName}
      </h1>
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <EmployeeDetailForm
          employee={employee}
          departments={departments}
          onSubmit={handleSubmit}
          onCancel={handleBack}
          isSubmitting={isUpdating}
        />
      </div>
    </div>
  );
}
