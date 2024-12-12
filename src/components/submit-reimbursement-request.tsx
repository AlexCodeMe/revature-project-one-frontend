import { zodResolver } from "@hookform/resolvers/zod";
import { reimbursementSchema, ReimbursementSchema } from "../lib/zod";
import { useForm } from "react-hook-form";
import { DollarSign, FileText } from "lucide-react";

interface SubmitReimbursementRequestProps {
  onSubmit: (data: ReimbursementSchema) => void;
}

export default function SubmitReimbursementRequest({
  onSubmit,
}: SubmitReimbursementRequestProps) {
  const form = useForm<ReimbursementSchema>({
    resolver: zodResolver(reimbursementSchema),
    defaultValues: {
      amount: 0,
      description: "",
    },
  });

  const onSubmitForm = (data: ReimbursementSchema) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <DollarSign className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="number"
            step="0.01"
            {...form.register("amount", { valueAsNumber: true })}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="0.00"
          />
        </div>
        {form.formState.errors.amount && (
          <p className="mt-1 text-sm text-red-600">
            {form.formState.errors.amount.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FileText className="h-5 w-5 text-gray-400" />
          </div>
          <textarea
            {...form.register("description")}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            placeholder="Describe your expense..."
          />
        </div>
        {form.formState.errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {form.formState.errors.description.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Submit Reimbursement
      </button>
    </form>
  );
}
