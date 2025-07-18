// src/pages/phone/index.tsx
import { useState } from "react";
import ServiceCard from "@/components/common/ServiceCard";
import { phoneServices } from "@/config/services";
import SearchBar from "@/components/common/SearchBar";

export default function PhonePage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Phone Intelligence</h1>
      <SearchBar
        onSearch={setSearchQuery}
        placeholder="Search phone services..."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {phoneServices
          .filter(
            (service) =>
              service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              service.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
      </div>
    </div>
  );
}
