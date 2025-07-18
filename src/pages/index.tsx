import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext"; 
import { allServices } from "@/config/services";
import ServiceCard from "@/components/common/ServiceCard";
import type { Service } from "@/types";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  useEffect(() => {
    console.log("Checking auth state in Home:", { isAuthenticated });
    if (!isAuthenticated) {
      console.log("Redirecting to login...");
      router.push("/auth/login");
    } else {
      console.log("User is authenticated, staying on dashboard.");
    }
  }, [isAuthenticated, router]);
  useEffect(() => {
    if (!isAuthenticated) {
      console.log("User is not authenticated. Redirecting to login page...");
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // Prevent rendering before redirect
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(allServices).flatMap(({ services }) =>
          services.map((service: Service) => (
            <ServiceCard key={service.id} {...service} />
          ))
        )}
      </div>
    </div>
  );
}
