export const calculateNetSalary = ({
  earnings,
  deductions,
}) => {
  const totalEarnings =
    earnings.basic +
    earnings.hra +
    earnings.allowances +
    (earnings.overtime || 0);

  const totalDeductions =
    deductions.unpaidLeave +
    deductions.pf +
    deductions.esi +
    deductions.tds;

  return totalEarnings - totalDeductions;
};
