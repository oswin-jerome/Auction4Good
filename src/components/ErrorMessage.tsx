import React from "react";

export default function ErrorMessage({ error }: { error?: string }) {
  if (error == null) {
    return null;
  }
  return <span className="text-red-500 text-sm">{error}</span>;
}
