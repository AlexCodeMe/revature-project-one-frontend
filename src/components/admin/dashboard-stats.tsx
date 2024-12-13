import { CheckCircle, Clock, DollarSign, XCircle } from 'lucide-react';

interface DashboardStatsProps {
    stats: {
      totalReimbursements: number;
      pendingReimbursements: number;
      approvedReimbursements: number;
      deniedReimbursements: number;
      totalAmount: number;
      pendingAmount: number;
    };
  }
  
  export function DashboardStats({ stats }: DashboardStatsProps) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Amount</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${stats.totalAmount.toFixed(2)}
              </p>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Pending: ${stats.pendingAmount.toFixed(2)}
          </p>
        </div>
  
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Requests</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.pendingReimbursements}
              </p>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Out of {stats.totalReimbursements} total
          </p>
        </div>
  
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.approvedReimbursements}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Denied</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.deniedReimbursements}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }