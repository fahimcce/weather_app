import React from "react";
import { AlertTriangle, X } from "lucide-react";

import { clearWeatherError } from "../store/weatherSlice";
import { useAppDispatch } from "@/hooks/hooks";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="w-full max-w-md mx-auto mb-8 bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-200 p-4 rounded shadow-md">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={() => dispatch(clearWeatherError())}
          className="ml-auto flex-shrink-0 text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-100 focus:outline-none"
          aria-label="Dismiss error"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
