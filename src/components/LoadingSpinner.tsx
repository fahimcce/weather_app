interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
}

export default function LoadingSpinner({
  size = "medium",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    small: "h-4 w-4 border-2",
    medium: "h-8 w-8 border-3",
    large: "h-12 w-12 border-4",
  };

  return (
    <div className="flex justify-center items-center my-8">
      <div
        className={`${sizeClasses[size]} rounded-full border-t-blue-500 border-r-transparent border-gray-200 animate-spin`}
      ></div>
    </div>
  );
}
