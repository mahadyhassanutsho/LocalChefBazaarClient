import Loader from "../ui/shared/Loader";

const LoadingPage = ({ message = "Loading, please wait..." }) => {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center gap-6 bg-base-200 px-4 text-center"
      aria-busy="true"
      aria-live="polite"
    >
      <section className="flex flex-col items-center gap-4 transition-opacity duration-300">
        {/* Visual Spinner */}
        <Loader size="lg" />

        {/* Descriptive Text */}
        <div className="space-y-1">
          <h2 className="text-xl font-medium text-base-content/90">
            {message}
          </h2>
          <p className="text-sm text-base-content/60">
            We're getting everything ready for you.
          </p>
        </div>
      </section>
    </main>
  );
};

export default LoadingPage;
