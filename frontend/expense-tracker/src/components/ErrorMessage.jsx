const ErrorMessage = ({ errors }) => {
  return (
    <div>
      {Object.values(errors).length > 0 &&
        Object.values(errors).map((error, index) => (
          <p key={index} className="text-red-600 text-sm mt-2">
            {error}
          </p>
        ))}
    </div>
  );
};

export default ErrorMessage;
