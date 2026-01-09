import PDFDocument from "pdfkit";

const generatePayslip = (res, payroll, employee) => {
  const doc = new PDFDocument();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=payslip-${employee.employeeId}.pdf`
  );

  doc.pipe(res);

  doc.fontSize(18).text("Salary Slip", { align: "center" });
  doc.moveDown();

  doc.fontSize(12).text(`Employee ID: ${employee.employeeId}`);
  doc.text(`Month: ${payroll.month}/${payroll.year}`);
  doc.moveDown();

  doc.text("Earnings:");
  doc.text(`Basic: ${payroll.earnings.basic}`);
  doc.text(`HRA: ${payroll.earnings.hra}`);
  doc.text(`Allowances: ${payroll.earnings.allowances}`);
  doc.moveDown();

  doc.text("Deductions:");
  doc.text(`PF: ${payroll.deductions.pf}`);
  doc.text(`ESI: ${payroll.deductions.esi}`);
  doc.text(`TDS: ${payroll.deductions.tds}`);
  doc.moveDown();

  doc.fontSize(14).text(`Net Salary: ${payroll.netSalary}`, {
    align: "right",
  });

  doc.end();
};

export default generatePayslip;
