const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ title, desc, children, className = "" }) => {
  return (
    <div className={`px-6 py-5 ${className}`}>
      {title && (
        <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
          {title}
        </h3>
      )}
      {desc && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{desc}</p>
      )}
      {children}
    </div>
  );
};

export const CardBody = ({ children, className = "" }) => {
  return (
    <div className={`p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
