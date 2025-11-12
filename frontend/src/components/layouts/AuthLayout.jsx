const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-screen h-screen lg:w-[60vw] px-2 sm:px-10 md:px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">Expense Tracker</h2>
        {children}
      </div>

      <div className="bg-violet-50 hidden md:block w-[40vw] h-screen relative overflow-hidden p-8">
        <div className="w-48 h-48 bg-purple-600 rounded-[40px] absolute -top-7 -left-5" />
        <div className="w-48 h-48 border-20 border-fuchsia-500 rounded-[40px] absolute top-[30%] -right-10" />
        <div className="w-48 h-48 bg-purple-500 rounded-[40px] absolute -bottom-7 -left-5" />
      </div>
    </div>
  );
};

export default AuthLayout;
