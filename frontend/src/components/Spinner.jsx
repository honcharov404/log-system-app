const Spinner = () => (
  <div role="status" className="flex justify-center py-8">
    <svg className="animate-spin h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle
        r="10"
        cx="12"
        cy="12"
        strokeWidth="4"
        stroke="currentColor"
        className="opacity-25"
      ></circle>
      <path
        fill="currentColor"
        className="opacity-75"
        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
      ></path>
    </svg>
  </div>
);

export default Spinner;