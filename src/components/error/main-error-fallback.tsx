const MainErrorFallback: React.FC = () => {
  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center text-red-500"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong : </h2>
      <button
        className="mt-4 border p-4 rounded-md font-semibold font-inter underline"
        onClick={() => window.location.assign(window.location.origin)}
      >
        Refresh
      </button>
    </div>
  );
};
export default MainErrorFallback;
