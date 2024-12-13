import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-zinc-50 mt-auto py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
        <p className="text-sm text-gray-500">Employee Reimbursement System</p>
        <div className="flex gap-4">
          <span className="text-sm text-gray-500">
            <Link to="#">Privacy Policy</Link>
          </span>
          <span className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} ERS All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
