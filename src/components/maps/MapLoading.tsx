
import React from "react";

const MapLoading = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-sahara-sand/20">
      <div className="flex flex-col items-center gap-2 text-sahara-brown">
        <div className="h-8 w-8 animate-pulse bg-sahara-sand/50 rounded-full"></div>
        <p>Loading map...</p>
      </div>
    </div>
  );
};

export default MapLoading;
