const ErrorMessage = ({ errors }) => {
  return (
    <div>
      {Object.values(errors).length > 0 &&
        Object.values(errors).map((error, index) => (
          <p
            key={index}
            className="text-red-600 bg-red-100 px-2 py-1 rounded text-sm mt-2"
          >
            {error}
          </p>
        ))}
    </div>
  );
};

export default ErrorMessage;
