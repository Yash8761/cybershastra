// src/pages/email/index.tsx
import { useState } from 'react';
import SearchBar from '@/components/common/SearchBar';
import ServiceCard from '@/components/common/ServiceCard';
import { personalServices } from '@/config/services';


export default function EmailPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Personal Intelligence</h1>
      <SearchBar onSearch={setSearchQuery} placeholder="Search personal services..." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {personalServices
          .filter(service => 
            service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map(service => (
            <ServiceCard key={service.id} {...service} />
          ))}
      </div>
    </div>
  );
}