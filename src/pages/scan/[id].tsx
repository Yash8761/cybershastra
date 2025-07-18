// // src/pages/scan/[id].tsx
// import { useState, ChangeEvent, useEffect } from "react";
// import { useRouter } from "next/router";
// import { toast } from "react-toastify";

// interface ScanParams {
//   endpoint: string;
//   fieldname: string;
//   title: string;
// }

// export default function ScanPage() {
//   const [results, setResults] = useState<Record<string, any> | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [scanParams, setScanParams] = useState<ScanParams | null>(null);
//   const router = useRouter();

//   // Extract parameters from hash fragment
//   useEffect(() => {
//     // Function to parse hash fragment parameters
//     const parseHashParams = () => {
//       try {
//         // Skip if we're in SSR
//         if (typeof window === "undefined") return;

//         // Get the hash without the # character
//         const hash = window.location.hash.substring(1);

//         if (!hash) {
//           toast.error("Missing scan parameters");
//           router.push("/services");
//           return;
//         }

//         // Decode the base64 string and parse the JSON
//         const decodedParams = JSON.parse(atob(hash)) as ScanParams;
//         setScanParams(decodedParams);

//         // Optional: Clean the URL by removing the hash
//         // This prevents users from seeing or sharing the parameters
//         if (history.replaceState) {
//           history.replaceState(null, document.title, window.location.pathname);
//         }
//       } catch (error) {
//         console.error("Error parsing parameters:", error);
//         toast.error("Invalid scan parameters");
//         router.push("/services");
//       }
//     };

//     // Parse parameters when the component mounts
//     parseHashParams();

//     // Also listen for hash changes (though we don't expect any in this use case)
//     window.addEventListener("hashchange", parseHashParams);

//     return () => {
//       window.removeEventListener("hashchange", parseHashParams);
//     };
//   }, [router]);

//   const handleSearch = async (term: string) => {
//     if (!term.trim() || !scanParams) return;

//     try {
//       setLoading(true);
//       const BASE_URL = "https://api.cybershastra.io/api";
//       const url = `${BASE_URL}${scanParams.endpoint}`;

//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           Authorization: `Token ${localStorage.getItem("token")}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ [scanParams.fieldname]: term }),
//       });

//       const text = await response.text();
//       let data;
//       try {
//         data = JSON.parse(text);
//       } catch (error) {
//         console.log(error);
//         toast.error("Invalid response format.");
//         return;
//       }

//       if (data.error) {
//         toast.error(data.error);
//         return;
//       }

//       setResults(data);
//       toast.success("Data fetched successfully!");
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to connect to the server.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       handleSearch(searchTerm);
//     }
//   };

//   // Render functions remain the same
//   const renderValue = (value: any) => {
//     if (typeof value === "string" || typeof value === "number") {
//       return value;
//     }

//     if (Array.isArray(value)) {
//       return value.map((item, i) => (
//         <div key={i} className="mb-2">
//           {typeof item === "object" ? renderObject(item) : item}
//         </div>
//       ));
//     }

//     if (typeof value === "object" && value !== null) {
//       return renderObject(value);
//     }

//     return "N/A";
//   };

//   const renderObject = (obj: Record<string, any>) => (
//     <div className="p-2 border border-gray-200 rounded-lg">
//       {Object.entries(obj).map(([subKey, subValue]) => (
//         <div key={subKey} className="mb-1">
//           <strong>{subKey}:</strong> {renderValue(subValue)}
//         </div>
//       ))}
//     </div>
//   );

//   // Loading state or no parameters
//   if (!scanParams) {
//     return <div className="p-6">Loading scan parameters...</div>;
//   }

//   return (
//     <div className="p-6">
//       <div className="mb-6">
//         <h1 className="text-2xl font-semibold">{scanParams.title} Scan</h1>
//       </div>

//       <div className="search-section mb-8">
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e: ChangeEvent<HTMLInputElement>) =>
//             setSearchTerm(e.target.value)
//           }
//           onKeyPress={handleKeyPress}
//           placeholder={`Enter ${scanParams.fieldname}`}
//           className="w-full p-3 border rounded-lg"
//         />
//         {loading && <div className="mt-2">Loading...</div>}
//       </div>

//       {results && (
//         <div className="results-section">
//           <h2 className="text-xl mb-4">Results</h2>
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white rounded-lg shadow">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Key
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Value
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {Object.entries(results).map(([key, value], index) => (
//                   <tr key={index}>
//                     <td className="px-6 py-3 whitespace-pre-wrap font-semibold">
//                       {key}
//                     </td>
//                     <td className="px-6 py-3 whitespace-pre-wrap">
//                       {renderValue(value)}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// src/pages/scan/[id].tsx
import ServiceResponseRenderer from "@/components/ServiceResponseRenderer";

export default function ScanPage() {
  return <ServiceResponseRenderer />;
}
