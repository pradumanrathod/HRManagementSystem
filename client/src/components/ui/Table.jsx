export const Table = ({ children, className = "" }) => {
  return <table className={`min-w-full ${className}`}>{children}</table>;
};

export const TableHeader = ({ children, className = "" }) => {
  return <thead className={className}>{children}</thead>;
};

export const TableBody = ({ children, className = "" }) => {
  return <tbody className={className}>{children}</tbody>;
};

export const TableRow = ({ children, className = "" }) => {
  return <tr className={className}>{children}</tr>;
};

export const TableCell = ({ children, isHeader = false, className = "" }) => {
  const Component = isHeader ? "th" : "td";
  return <Component className={className}>{children}</Component>;
};
