// import { useState, useEffect } from "react";
// import Card, { CardHeader, CardBody } from "../../components/ui/Card";
// import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../components/ui/Table";
// import { downloadPayslip } from "../../services/payrollService";

// export default function PayrollList() {
//   const [payrolls, setPayrolls] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadPayrolls();
//   }, []);

//   const loadPayrolls = async () => {
//     try {
//       // TODO: Replace with actual API call when backend endpoint is available
//       setPayrolls([]);
//     } catch (error) {
//       console.error("Error loading payrolls:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDownload = async (payrollId) => {
//     try {
//       const response = await downloadPayslip(payrollId);
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", `payslip-${payrollId}.pdf`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (error) {
//       console.error("Error downloading payslip:", error);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
//           Payslips
//         </h1>
//         <p className="text-gray-500 dark:text-gray-400 mt-1">
//           View and download your payslips
//         </p>
//       </div>

//       <Card>
//         <CardHeader title="Payslip History" />
//         <CardBody>
//           {loading ? (
//             <div className="text-center py-8 text-gray-500">Loading...</div>
//           ) : payrolls.length === 0 ? (
//             <div className="text-center py-8 text-gray-500">
//               No payslips found
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <Table>
//                 <TableHeader className="border-b border-gray-100 dark:border-gray-800">
//                   <TableRow>
//                     <TableCell
//                       isHeader
//                       className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//                     >
//                       Month/Year
//                     </TableCell>
//                     <TableCell
//                       isHeader
//                       className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//                     >
//                       Net Salary
//                     </TableCell>
//                     <TableCell
//                       isHeader
//                       className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//                     >
//                       Actions
//                     </TableCell>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
//                   {payrolls.map((payroll, index) => (
//                     <TableRow key={index}>
//                       <TableCell className="px-5 py-3 text-theme-sm text-gray-800 dark:text-white">
//                         {payroll.month}/{payroll.year}
//                       </TableCell>
//                       <TableCell className="px-5 py-3 text-theme-sm text-gray-800 dark:text-white">
//                         ${payroll.netSalary?.toLocaleString() || "0"}
//                       </TableCell>
//                       <TableCell className="px-5 py-3">
//                         <button
//                           onClick={() => handleDownload(payroll._id)}
//                           className="text-brand-500 hover:text-brand-600 text-sm font-medium"
//                         >
//                           Download
//                         </button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </div>
//           )}
//         </CardBody>
//       </Card>
//     </div>
//   );
// }


import Card, { CardHeader, CardBody } from "../../components/ui/Card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "../../components/ui/Table";

export default function PayrollList() {
  // 🔹 Hardcoded payslip data (for interview demo)
  const payrolls = [
    {
      _id: "1",
      month: 1,
      year: 2026,
      netSalary: 42000,
    },
    {
      _id: "2",
      month: 12,
      year: 2025,
      netSalary: 40500,
    },
    {
      _id: "3",
      month: 11,
      year: 2025,
      netSalary: 39800,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Payslips
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          View and download your monthly payslips
        </p>
      </div>

      {/* Payslip Card */}
      <Card>
        <CardHeader title="Payslip History" />
        <CardBody>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-gray-800">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Month / Year
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Net Salary
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                {payrolls.map((payroll) => (
                  <TableRow key={payroll._id}>
                    <TableCell className="px-5 py-3 text-theme-sm text-gray-800 dark:text-white">
                      {payroll.month}/{payroll.year}
                    </TableCell>

                    <TableCell className="px-5 py-3 text-theme-sm text-gray-800 dark:text-white">
                      ₹ {payroll.netSalary.toLocaleString()}
                    </TableCell>

                    <TableCell className="px-5 py-3">
                      <button
                        className="text-brand-500 hover:text-brand-600 text-sm font-medium"
                        onClick={() => alert("Payslip downloaded (demo)")}
                      >
                        Download
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
