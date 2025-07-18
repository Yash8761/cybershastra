// import { useState, useEffect } from "react";
// import { getUserProfile } from "@/lib/api-client";

// export default function ProfilePage() {
//   const [user, setUser] = useState({
//     first_name: "",
//     last_name: "",
//     username: "",
//     email: "",
//     dob: "",
//     phone: "",
//     address: "",
//     pin_code: "",
//     city: "",
//     state: "",
//     credits: 0,
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const data = await getUserProfile();
//         setUser(data);
//       } catch (err) {
//         console.log("Error fetching profile:", err);
//         setError("Failed to load profile");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (loading)
//     return <div className="p-6 text-center text-lg ">Loading...</div>;
//   if (error)
//     return <div className="p-6 text-center text-red-500 ">{error}</div>;

//   return (
//     <div className="flex items-top justify-center top-0 min-h-screen w-full  rounded">
//       <div className="w-full backdrop-blur-lg shadow-lg rounded-xl p-8">
//         <h1 className="text-4xl font-bold text-center  mb-6">Profile</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {Object.entries(user).map(([key, value]) => (
//             <div key={key} className="">
//               <label className="block text-sm font-semibold uppercase opacity-70">
//                 {key.replace(/_/g, " ")}
//               </label>
//               <input
//                 type="text"
//                 value={value}
//                 className="mt-1 block w-full border-indigo-600  opacity-70 p-3 rounded-md border-2"
//                 disabled
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { getUserProfile } from "@/lib/api-client";
import ChangePasswordForm from "@/components/ChangePasswordForm";

export default function ProfilePage() {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    dob: "",
    phone: "",
    address: "",
    pin_code: "",
    city: "",
    state: "",
    credits: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("profile"); // "profile" or "security"

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setUser(data);
      } catch (err) {
        console.log("Error fetching profile:", err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="p-6 text-center text-lg">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full p-4">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold text-center mb-6">
          Account Settings
        </h1>

        {/* Tab Navigation */}
        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "profile"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile Information
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "security"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("security")}
          >
            Security
          </button>
        </div>

        {/* Profile Information Tab */}
        {activeTab === "profile" && (
          <div className="backdrop-blur-lg shadow-lg rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(user).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-semibold uppercase opacity-70">
                    {key.replace(/_/g, " ")}
                  </label>
                  <input
                    type="text"
                    value={value}
                    className="mt-1 block w-full border-indigo-600 opacity-70 p-3 rounded-md border-2"
                    disabled
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && <ChangePasswordForm />}
      </div>
    </div>
  );
}
