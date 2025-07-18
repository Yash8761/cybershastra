// src/components/ServiceResponseRenderer.tsx
import React from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import allServices from "@/config/services";
import Image from "next/image";
// import {
//   showPrintableReport,
//   showEmailPrintableReport,
// } from "@/utils/reportGenerator";
// Type definitions for response formats
interface ScanParams {
  endpoint: string;
  fieldname: string;
  title: string;
}

// Component for rendering dynamic service responses
export default function ServiceResponseRenderer() {
  const [results, setResults] = React.useState<Record<string, any> | null>(
    null
  );
  const [loading, setLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [scanParams, setScanParams] = React.useState<ScanParams | null>(null);
  const router = useRouter();

  // Extract parameters from hash fragment
  React.useEffect(() => {
    const parseHashParams = () => {
      try {
        if (typeof window === "undefined") return;

        const hash = window.location.hash.substring(1);
        if (!hash) {
          toast.error("Missing scan parameters");
          router.push("/services");
          return;
        }

        const decodedParams = JSON.parse(atob(hash)) as ScanParams;
        setScanParams(decodedParams);

        if (history.replaceState) {
          history.replaceState(null, document.title, window.location.pathname);
        }
      } catch (error) {
        console.error("Error parsing parameters:", error);
        toast.error("Invalid scan parameters");
        router.push("/services");
      }
    };

    parseHashParams();
    window.addEventListener("hashchange", parseHashParams);

    return () => {
      window.removeEventListener("hashchange", parseHashParams);
    };
  }, [router]);

  const handleSearch = async (term: string) => {
    if (!term.trim() || !scanParams) return;

    try {
      setLoading(true);
      const BASE_URL = "https://api.cybershastra.io/api";
      // const BASE_URL = "http://127.0.0.1:5000/api";
      const url = `${BASE_URL}${scanParams.endpoint}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [scanParams.fieldname]: term }),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (error) {
        console.log(error);
        toast.error("Invalid response format.");
        return;
      }

      if (data.error) {
        toast.error(data.error);
        return;
      }

      setResults(data);
      toast.success("Data fetched successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(searchTerm);
    }
  };

  // Function to find service title from services.ts
  const getServiceTitle = () => {
    if (!scanParams) return "";

    const serviceId = router.query.id as string;
    if (!serviceId) return scanParams.title;

    // Search through all service categories
    for (const category of Object.values(allServices)) {
      const service = category.services.find((s) => s.id === serviceId);
      if (service) return service.title;
    }

    return scanParams.title;
  };

  // New rendering functions based on response types
  const renderMobileUPI = (data: any) => {
    const { mobileNumber, upiDetails } = data;
    return (
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium">Mobile Number</h3>
          <p>{mobileNumber}</p>
        </div>

        <h3 className="font-medium text-lg">UPI Details</h3>
        {upiDetails.map((detail: any, index: number) => (
          <div key={index} className="p-4 border rounded-lg">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <strong>UPI ID:</strong> {detail.upiId}
              </div>
              <div>
                <strong>Name:</strong> {detail.name}
              </div>
              <div>
                <strong>PSP:</strong> {detail.pspName}
              </div>
              <div>
                <strong>Type:</strong> {detail.payeeType}
              </div>
              <div>
                <strong>Bank IFSC:</strong> {detail.bankIfsc}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderTelecoLookup = (data: any) => {
    return (
      <div className="space-y-2">
        {Object.entries(data).map(([key, value]: [string, any]) => (
          <div key={key} className="p-3 bg-gray-50 rounded-lg flex">
            <div className="w-1/3 font-medium">{formatKey(key)}</div>
            <div className="w-2/3">{String(value)}</div>
          </div>
        ))}
      </div>
    );
  };

  const renderBreachLookup = (data: any) => {
    const lookupKey = data.mobileNumber ? "mobileNumber" : "email";
    const lookupValue = data[lookupKey] || "";
    const breaches = data.breaches || {};

    return (
      <div className="space-y-4">
        <div className="bg-blue-100 text-blue-800 p-4 rounded-lg text-lg font-medium">
          {formatKey(lookupKey)}: {lookupValue}
        </div>

        <h3 className="font-medium text-lg">Breach Information</h3>
        {Object.keys(breaches).length === 0 ? (
          <p className="text-green-600">No breaches found!</p>
        ) : (
          Object.entries(breaches).map(
            ([source, details]: [string, any], index: number) => (
              <div
                key={index}
                className="p-4 border border-red-200 rounded-lg overflow-hidden"
              >
                <div className="bg-red-50 px-4 py-2 flex justify-between items-center">
                  <h3 className="font-medium text-red-800">{source}</h3>
                  {details.numOfResults && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                      {details.numOfResults}{" "}
                      {details.numOfResults === 1 ? "record" : "records"} found
                    </span>
                  )}
                </div>

                {details.infoLeak && (
                  <div className="px-4 py-3 bg-red-50 border-b border-red-100">
                    <p className="text-sm text-red-800">{details.infoLeak}</p>
                  </div>
                )}

                {details.records && details.records.length > 0 && (
                  <div className="p-4">
                    {details.records.map((record: any, idx: number) => (
                      <div
                        key={idx}
                        className="pl-3 border-l-2 border-red-300 mb-3 last:mb-0"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {Object.entries(record).map(
                            ([key, value]: [string, any]) => (
                              <div key={key} className="py-1">
                                <span className="font-medium text-gray-700">
                                  {formatKey(key)}:
                                </span>{" "}
                                {typeof value === "string" &&
                                value.startsWith("http") ? (
                                  <a
                                    href={value}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                  >
                                    {value}
                                  </a>
                                ) : (
                                  String(value)
                                )}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          )
        )}
      </div>
    );
  };

  const formatKey = (key: string) => {
    return key
      .split(/(?=[A-Z])/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const MobileOSINT = ({
    data,
    mobileNumber,
  }: {
    data: any;
    mobileNumber: string;
  }) => {
    if (!data) return null;

    // Extract main sections
    const {
      mobile_number,
      upi_details,
      identity_data,
      telecom_data,
      uan_number,
      employment_history,
      breach_details,
      caller_data,
      fb_data,
    } = data;

    // Section card component
    const SectionCard = ({
      title,
      children,
      className = "",
    }: {
      title: string;
      children: React.ReactNode;
      className?: string;
    }) => (
      <div
        className={`mb-6 border rounded-lg overflow-hidden shadow-sm ${className}`}
      >
        <div className="bg-blue-600 text-white font-medium px-4 py-2">
          {title}
        </div>
        <div className="p-4">{children}</div>
      </div>
    );

    // Key-value pair component
    const KeyValuePair = ({ label, value }: { label: string; value: any }) => (
      <div className="flex py-1 border-b border-gray-100 last:border-0">
        <div className="w-1/3 font-medium text-gray-700">{label}</div>
        <div className="w-2/3">
          {value !== undefined ? String(value) : "N/A"}
        </div>
      </div>
    );

    // Render card table
    const CardTable = ({
      data,
      excludeKeys = [],
    }: {
      data: any;
      excludeKeys?: string[];
    }) => {
      if (!data) return null;
      const keys = Object.keys(data).filter(
        (key) => !excludeKeys.includes(key)
      );
      return (
        <div className="space-y-1">
          {keys.map((key) => (
            <KeyValuePair
              key={key}
              label={formatKey(key)}
              value={
                typeof data[key] === "object"
                  ? JSON.stringify(data[key])
                  : data[key]
              }
            />
          ))}
        </div>
      );
    };

    // Render object as table
    const ObjectTable = ({ data }: { data: Record<string, any> }) => {
      if (!data) return <div>No data available</div>;

      return (
        <table className="min-w-full border">
          <tbody>
            {Object.entries(data).map(([key, value]) => {
              // Skip rendering empty arrays
              if (Array.isArray(value) && value.length === 0) return null;

              return (
                <tr key={key} className="border-b">
                  <td className="px-4 py-2 bg-gray-50 font-medium w-1/3">
                    {formatKey(key)}
                  </td>
                  <td className="px-4 py-2">
                    {Array.isArray(value) ? (
                      <div className="space-y-2">
                        {value.map((item, i) => (
                          <div
                            key={i}
                            className="pl-2 border-l-2 border-gray-300"
                          >
                            {typeof item === "object" ? (
                              <ObjectTable data={item} />
                            ) : (
                              String(item)
                            )}
                          </div>
                        ))}
                      </div>
                    ) : typeof value === "object" && value !== null ? (
                      <ObjectTable data={value} />
                    ) : (
                      String(value)
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    };

    // Render breaches
    const renderBreaches = (breachData: any) => {
      if (!breachData?.breaches) return <div>No breach data found</div>;

      return (
        <div className="space-y-4">
          {Object.entries(breachData.breaches).map(
            ([source, details]: [string, any]) => (
              <div key={source} className="border rounded-lg overflow-hidden">
                <div className="bg-red-600 text-white px-4 py-2 flex justify-between items-center">
                  <span className="font-medium">{source}</span>
                  {details.numOfResults && (
                    <span className="bg-red-800 text-white text-sm px-2 py-1 rounded-full">
                      {details.numOfResults}{" "}
                      {details.numOfResults === 1 ? "record" : "records"}
                    </span>
                  )}
                </div>
                <div className="p-3">
                  {details.infoLeak && (
                    <div className="mb-2 text-sm bg-red-50 p-2 rounded">
                      <span className="font-semibold">Leaked data:</span>{" "}
                      {details.infoLeak}
                    </div>
                  )}
                  {details.records && details.records.length > 0 && (
                    <div className="space-y-2">
                      {details.records.map((record: any, idx: number) => (
                        <div
                          key={idx}
                          className="ml-2 pl-2 border-l-2 border-red-300"
                        >
                          {Object.entries(record).map(
                            ([key, value]: [string, any]) => (
                              <div key={key}>
                                <span className="font-medium">
                                  {formatKey(key)}:
                                </span>{" "}
                                {String(value)}
                              </div>
                            )
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      );
    };

    return (
      <div className="space-y-6">
        <div className="bg-blue-100 text-blue-800 p-4 rounded-lg text-lg font-medium">
          Mobile Number: {mobile_number || mobileNumber}
        </div>
        <button
          // onClick={() => showPrintableReport(data, mobileNumber)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <i className="fa-solid fa-download"></i>
          Download Report
        </button>

        {upi_details && upi_details.length > 0 && (
          <SectionCard title="UPI & Banking Details">
            <div className="space-y-4">
              {upi_details.map((detail: any, index: number) => {
                const isUpiDetail = detail.upiId !== undefined;
                const isBankDetail = detail.bankName !== undefined;

                if (isUpiDetail) {
                  return (
                    <div key={index} className="border p-3 rounded bg-gray-50">
                      <div className="font-medium text-blue-700 mb-2">
                        UPI Information
                      </div>
                      <CardTable data={detail} />
                    </div>
                  );
                }

                if (isBankDetail) {
                  return (
                    <div key={index} className="border p-3 rounded bg-gray-50">
                      <div className="font-medium text-green-700 mb-2">
                        Bank Details
                      </div>
                      <CardTable data={detail} />
                    </div>
                  );
                }

                return (
                  <div key={index} className="border p-3 rounded">
                    <ObjectTable data={detail} />
                  </div>
                );
              })}
            </div>
          </SectionCard>
        )}

        {identity_data && (
          <SectionCard title="Identity Information">
            {identity_data.personalInfo && (
              <div className="mb-4">
                <div className="font-medium mb-2 border-b pb-1">
                  Personal Information
                </div>
                <CardTable data={identity_data.personalInfo} />
              </div>
            )}

            {identity_data.phoneInfo && identity_data.phoneInfo.length > 0 && (
              <div className="mb-4">
                <div className="font-medium mb-2 border-b pb-1">
                  Phone Information
                </div>
                <table className="w-full border">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm">Number</th>
                      <th className="px-4 py-2 text-left text-sm">Type</th>
                      <th className="px-4 py-2 text-left text-sm">
                        Reported Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {identity_data.phoneInfo.map((phone: any, idx: number) => (
                      <tr key={idx} className="border-t">
                        <td className="px-4 py-2">{phone.number}</td>
                        <td className="px-4 py-2">
                          {phone.type_code === "M"
                            ? "Mobile"
                            : phone.type_code === "H"
                            ? "Home"
                            : phone.type_code}
                        </td>
                        <td className="px-4 py-2">{phone.reported_date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {identity_data.addressInfo &&
              identity_data.addressInfo.length > 0 && (
                <div className="mb-4">
                  <div className="font-medium mb-2 border-b pb-1">
                    Address Information
                  </div>
                  {identity_data.addressInfo.map((addr: any, idx: number) => (
                    <div
                      key={idx}
                      className={idx > 0 ? "mt-3 pt-3 border-t" : ""}
                    >
                      <div className="font-medium text-sm text-gray-500">
                        Address {idx + 1}
                      </div>
                      <div className="p-2 bg-gray-50 rounded mt-1">
                        <div>{addr.address}</div>
                        <div className="text-sm text-gray-600">
                          {[addr.state, addr.postal].filter(Boolean).join(", ")}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Reported: {addr.reported_date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            {identity_data.emailInfo && identity_data.emailInfo.length > 0 && (
              <div className="mb-4">
                <div className="font-medium mb-2 border-b pb-1">
                  Email Information
                </div>
                <table className="w-full border">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm">Email</th>
                      <th className="px-4 py-2 text-left text-sm">
                        Reported Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {identity_data.emailInfo.map((email: any, idx: number) => (
                      <tr key={idx} className="border-t">
                        <td className="px-4 py-2">{email.email_address}</td>
                        <td className="px-4 py-2">{email.reported_date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {identity_data.identityInfo && (
              <div>
                <div className="font-medium mb-2 border-b pb-1">
                  ID Documents
                </div>
                {Object.entries(identity_data.identityInfo).map(
                  ([idType, idList]: [string, any]) => {
                    if (!idList || idList.length === 0) return null;

                    return (
                      <div key={idType} className="mb-2">
                        <div className="font-medium text-sm text-gray-600">
                          {formatKey(idType)}
                        </div>
                        {idList.map((id: any, idx: number) => (
                          <div
                            key={idx}
                            className="pl-4 border-l-2 border-gray-200 my-1"
                          >
                            {Object.entries(id).map(
                              ([key, value]: [string, any]) => (
                                <div key={key} className="text-sm">
                                  <span className="font-medium">
                                    {formatKey(key)}:
                                  </span>{" "}
                                  {String(value)}
                                </div>
                              )
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  }
                )}
              </div>
            )}
          </SectionCard>
        )}

        {telecom_data && (
          <SectionCard title="Telecom Data">
            <CardTable data={telecom_data} excludeKeys={["mobileNumber"]} />
          </SectionCard>
        )}

        {uan_number && (
          <SectionCard title="UAN Details" className="bg-purple-50">
            <div className="font-medium">UAN Number</div>
            <div className="text-lg">{uan_number}</div>
          </SectionCard>
        )}

        {employment_history && employment_history.length > 0 && (
          <SectionCard title="Employment History">
            {employment_history.map((job: any, idx: number) => (
              <div key={idx} className={idx > 0 ? "pt-4 border-t mt-4" : ""}>
                <div className="font-medium text-green-800">
                  {job.establishment_name}
                </div>
                <CardTable data={job} excludeKeys={["establishment_name"]} />
              </div>
            ))}
          </SectionCard>
        )}

        {breach_details && (
          <SectionCard title="Data Breach Information" className="bg-red-50">
            {renderBreaches(breach_details)}
          </SectionCard>
        )}

        {caller_data && caller_data.length > 0 && (
          <SectionCard title="Caller Information">
            {caller_data.map((caller: any, idx: number) => (
              <div key={idx} className="border rounded-lg p-3 bg-gray-50">
                <div className="font-medium text-lg">{caller.name}</div>
                <CardTable data={caller} excludeKeys={["name"]} />
              </div>
            ))}
          </SectionCard>
        )}

        {fb_data && (
          <SectionCard title="Facebook Information">
            <CardTable data={fb_data} />
          </SectionCard>
        )}
      </div>
    );
  };
  const EmailOSINT = ({ data, email }: { data: any; email: string }) => {
    if (!data) return null;

    // Extract data sections
    const { breach_details, osint_data } = data || {};

    // Handle report generation
    const handleGenerateReport = () => {
      // This function would be implemented in your reportGenerator utility
      // showEmailPrintableReport(data, email);
      console.log("Generate report for", email);
    };

    // Section card component
    const SectionCard = ({
      title,
      children,
      className = "",
    }: {
      title: string;
      children: React.ReactNode;
      className?: string;
    }) => (
      <div
        className={`mb-6 border rounded-lg overflow-hidden shadow-sm ${className}`}
      >
        <div className="bg-blue-600 text-white font-medium px-4 py-2">
          {title}
        </div>
        <div className="p-4">{children}</div>
      </div>
    );

    // Format key names for display
    const formatKey = (key: string): string => {
      return key
        .split(/(?=[A-Z])|_/)
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    };

    // Get profile information if available
    const profile = osint_data?.PROFILE_CONTAINER?.profile || {};

    // Extract profile details
    const names = profile.names || {};
    const profileName = names.PROFILE || {};
    const contactName = names.CONTACT || {};
    const fullName = profileName.fullname || contactName.fullname || "";
    const firstName = profileName.firstName || contactName.firstName || "";
    const lastName = profileName.lastName || contactName.lastName || "";
    const displayName =
      fullName || `${firstName} ${lastName}`.trim() || email.split("@")[0];

    // Get profile photos
    const profilePhoto = profile.profilePhotos?.PROFILE?.url || "";

    // Get emails
    const emails = profile.emails || {};
    const profileEmail = emails.PROFILE?.value || "";
    const contactEmail = emails.CONTACT?.value || "";
    // const allEmails = [profileEmail, contactEmail].filter(
    //   (e) => e && e !== email
    // );

    // Get apps
    const apps = profile.inAppReachability?.PROFILE?.apps || [];

    // Get maps data
    const mapsData = osint_data?.PROFILE_CONTAINER?.maps || {};
    const mapsStats = mapsData.stats || {};

    // Format breaches
    interface BreachInfo {
      source: string;
      details: {
        numOfResults?: number;
        records?: any[];
        infoLeak?: string;
        [key: string]: any;
      };
    }

    const breaches: BreachInfo[] = [];
    if (breach_details && breach_details.breaches) {
      Object.entries(breach_details.breaches).forEach(
        ([source, details]: [string, any]) => {
          breaches.push({
            source,
            details,
          });
        }
      );
    }

    return (
      <div className="space-y-6">
        <div className="bg-blue-100 text-blue-800 p-4 rounded-lg flex justify-between items-center">
          <div className="text-lg font-medium">Email: {email}</div>
          <button
            onClick={handleGenerateReport}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <i className="fa-solid fa-file-pdf"></i>
            Generate Report
          </button>
        </div>

        {/* Profile Information */}
        {Object.keys(profile).length > 0 && (
          <SectionCard title="Profile Information">
            <div className="flex items-start">
              {profilePhoto && (
                <div className="mr-4">
                  <Image
                    src={profilePhoto}
                    alt="Profile"
                    className="w-24 h-24 rounded-lg object-cover"
                    width={96}
                    height={96}
                  />
                </div>
              )}
              <div className="flex-1">
                {displayName && (
                  <h3 className="text-xl font-medium mb-2">{displayName}</h3>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {profileEmail && profileEmail !== email && (
                    <div>
                      <p className="text-gray-500 text-sm">Profile Email</p>
                      <p className="font-medium">{profileEmail}</p>
                    </div>
                  )}

                  {contactEmail &&
                    contactEmail !== email &&
                    contactEmail !== profileEmail && (
                      <div>
                        <p className="text-gray-500 text-sm">Contact Email</p>
                        <p className="font-medium">{contactEmail}</p>
                      </div>
                    )}
                </div>

                {apps && apps.length > 0 && (
                  <div className="mt-3">
                    <p className="text-gray-500 text-sm mb-1">
                      Used Applications
                    </p>
                    <div className="flex flex-wrap">
                      {apps.map((app: string, index: number) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-800 px-2 py-1 rounded mr-2 mb-2 text-sm"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </SectionCard>
        )}

        {/* Maps Activity */}
        {mapsStats && Object.keys(mapsStats).length > 0 && (
          <SectionCard title="Maps Activity">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {Object.entries(mapsStats).map(([key, value]: [string, any]) => (
                <div key={key} className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-gray-500 text-sm">{key}</div>
                  <div className="font-medium text-lg">{String(value)}</div>
                </div>
              ))}
            </div>
          </SectionCard>
        )}

        {/* User Maps Review Link */}
        {osint_data?.user_google_maps_review && (
          <SectionCard title="Google Maps User Reviews">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="mb-2">
                Google Maps user review history is available for this email.
              </p>
              <a
                href={osint_data.user_google_maps_review}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline flex items-center"
              >
                <i className="fa-solid fa-external-link mr-1"></i>
                View Google Maps Reviews
              </a>
            </div>
          </SectionCard>
        )}

        {/* Data Breaches */}
        {breaches.length > 0 && (
          <SectionCard title="Data Breaches">
            <div className="mb-4">
              <p>
                The email address <strong>{email}</strong> was found in{" "}
                {breaches.length} data breach{breaches.length !== 1 ? "es" : ""}
                :
              </p>
            </div>

            <div className="space-y-4">
              {breaches.map((breach, index) => {
                const numRecords =
                  breach.details.numOfResults ||
                  breach.details.records?.length ||
                  0;
                const records = breach.details.records || [];

                return (
                  <div
                    key={index}
                    className="border border-red-200 rounded-lg overflow-hidden"
                  >
                    <div className="bg-red-50 px-4 py-2 flex justify-between items-center">
                      <h3 className="font-medium text-red-800">
                        {breach.source}
                      </h3>
                      {numRecords > 0 && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                          {numRecords} {numRecords === 1 ? "record" : "records"}{" "}
                          found
                        </span>
                      )}
                    </div>

                    {records.length > 0 && (
                      <div className="p-4">
                        {records.map((record, recordIndex) => (
                          <div
                            key={recordIndex}
                            className="pl-3 border-l-2 border-red-300 mb-3 last:mb-0"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {Object.entries(record)
                                .filter(
                                  ([key, value]) =>
                                    key !== "Email" || value !== email
                                )
                                .map(([key, value]) => (
                                  <div key={key} className="py-1">
                                    <span className="font-medium text-gray-700">
                                      {formatKey(key)}:
                                    </span>{" "}
                                    {typeof value === "string" &&
                                    value.startsWith("http") ? (
                                      <a
                                        href={value}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                      >
                                        {value}
                                      </a>
                                    ) : (
                                      String(value)
                                    )}
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </SectionCard>
        )}

        {/* No Results */}
        {(!breaches || breaches.length === 0) &&
          (!profile || Object.keys(profile).length === 0) &&
          (!mapsStats || Object.keys(mapsStats).length === 0) && (
            <div className="p-8 text-center bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-gray-500 mb-2">
                <i className="fa-solid fa-search fa-2x"></i>
              </div>
              <h3 className="text-xl font-medium mb-2">No Data Found</h3>
              <p className="text-gray-600">
                We couldn`&apos;`t find any OSINT data associated with this
                email address.
              </p>
            </div>
          )}
      </div>
    );
  };

  // Debug function to help diagnose API response issues
  // const debugData = (data: any): React.ReactNode => {
  //   return (
  //     <div className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96 mb-4">
  //       <pre className="text-xs">{JSON.stringify(data, null, 2)}</pre>
  //     </div>
  //   );
  // };

  // Main renderer that selects the appropriate visualization based on endpoint
  const renderResponse = (data: any) => {
    if (!scanParams) return null;

    // Handle the mobile OSINT special case
    if (scanParams.endpoint === "/mobile_osint") {
      return <MobileOSINT data={data} mobileNumber={searchTerm} />;
    }
    if (scanParams.endpoint === "/email_osint") {
      return <EmailOSINT data={data} email={searchTerm} />;
    }

    // Check if response is a simple single key-value pair (like aadhar_to_pan)
    if (
      Object.keys(data).length === 1 &&
      typeof data[Object.keys(data)[0]] !== "object"
    ) {
      return (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="text-lg font-medium text-green-800 flex justify-between items-center">
            <span>{formatKey(Object.keys(data)[0])}</span>
            <span className="text-xl font-semibold">
              {data[Object.keys(data)[0]]}
            </span>
          </div>
        </div>
      );
    }

    // Handle cases where the response has a wrapper key (e.g. fastag_details)
    const keys = Object.keys(data);
    if (keys.length === 1 && typeof data[keys[0]] === "object") {
      // Extract the inner object for rendering
      const innerKey = keys[0];
      const innerData = data[innerKey];

      // Create a specialized renderer for these common wrapped response types
      return (
        <div className="space-y-2">
          {Object.entries(innerData).map(([key, value]: [string, any]) => (
            <div key={key} className="p-3 bg-gray-50 rounded-lg flex">
              <div className="w-1/3 font-medium">{key}</div>
              <div className="w-2/3">
                {Array.isArray(value)
                  ? value.map((item, i) => <div key={i}>{item}</div>)
                  : String(value)}
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Identify response type based on endpoint for special formatting
    const endpoint = scanParams.endpoint;

    switch (endpoint) {
      case "/mobile_upi":
        return renderMobileUPI(data);
      case "/teleco_lookup":
        return renderTelecoLookup(data);
      case "/breach_lookup":
      case "/breach_lookup_by_email":
        return renderBreachLookup(data);
      default:
        // Fallback to generic renderer for any unhandled formats
        return renderGenericResponse(data);
    }
  };

  // Generic fallback renderer for unknown formats
  const renderGenericResponse = (data: any) => {
    const renderValue = (value: any) => {
      if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
      ) {
        return String(value);
      }

      if (Array.isArray(value)) {
        return (
          <div className="space-y-2">
            {value.map((item, i) => (
              <div key={i} className="pl-3 border-l-2 border-gray-300">
                {typeof item === "object" ? renderObject(item) : String(item)}
              </div>
            ))}
          </div>
        );
      }

      if (typeof value === "object" && value !== null) {
        return renderObject(value);
      }

      return "N/A";
    };

    const renderObject = (obj: Record<string, any>) => (
      <div className="p-2 border border-gray-200 rounded-lg space-y-1">
        {Object.entries(obj).map(([subKey, subValue]) => (
          <div key={subKey}>
            <strong>{formatKey(subKey)}:</strong> {renderValue(subValue)}
          </div>
        ))}
      </div>
    );

    return (
      <div className="space-y-4">
        {Object.entries(data).map(([key, value]: [string, any]) => (
          <div key={key} className="p-3 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">{formatKey(key)}</h3>
            <div>{renderValue(value)}</div>
          </div>
        ))}
      </div>
    );
  };

  // Loading state or no parameters
  if (!scanParams) {
    return <div className="p-6">Loading scan parameters...</div>;
  }

  // Get service description from services.ts
  const getServiceDescription = () => {
    if (!scanParams) return "";

    const serviceId = router.query.id as string;
    if (!serviceId) return "";

    // Search through all service categories
    for (const category of Object.values(allServices)) {
      const service = category.services.find((s) => s.id === serviceId);
      if (service) return service.desc;
    }

    return "";
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">{getServiceTitle()} Scan</h1>
      </div>

      <div className="search-section mb-8">
        <div className="mt-2 text-sm text-gray-600">
          {getServiceDescription()}
        </div>
        <br></br>
        <div className="flex w-full">
          <input
            type="text"
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            onKeyPress={handleKeyPress}
            placeholder={`Enter ${scanParams.fieldname}`}
            className="w-full p-3 border rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={() => handleSearch(searchTerm)}
            className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>

        {loading && <div className="mt-2">Loading...</div>}
      </div>

      {results && (
        <div className="results-section">
          <h2 className="text-xl mb-4">Results</h2>
          {/* Uncomment the next line for debugging responses */}
          {/* {debugData(results)} */}
          {renderResponse(results)}
        </div>
      )}
    </div>
  );
}
