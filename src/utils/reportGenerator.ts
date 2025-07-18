// // // src/utils/reportGenerator.ts

// // const calculateAge = (dob: string): string => {
// //   if (!dob) return "Unknown";

// //   try {
// //     const birthDate = new Date(dob);
// //     const today = new Date();
// //     let age = today.getFullYear() - birthDate.getFullYear();
// //     const monthDiff = today.getMonth() - birthDate.getMonth();

// //     if (
// //       monthDiff < 0 ||
// //       (monthDiff === 0 && today.getDate() < birthDate.getDate())
// //     ) {
// //       age--;
// //     }

// //     return `${age} years`;
// //   } catch (error) {
// //     console.error("Error calculating age:", error);
// //     return "Unknown";
// //   }
// // };

// // const findIdDocument = (documents: any[]): string => {
// //   if (!documents || documents.length === 0) return "Unknown";

// //   // Get the first document and its number or id
// //   const doc = documents[0];
// //   return doc.number || doc.id || "Unknown";
// // };

// // const formatEmploymentPeriod = (startDate: string, endDate: string): string => {
// //   const formatDate = (date: string) => {
// //     if (!date) return "Unknown";

// //     try {
// //       const d = new Date(date);
// //       return `${d.toLocaleString("default", {
// //         month: "short",
// //       })} ${d.getFullYear()}`;
// //     } catch (error) {
// //       console.error("Error formatting date:", error);
// //       return date;
// //     }
// //   };

// //   return `${formatDate(startDate)} - ${formatDate(endDate)}`;
// // };

// // // Format key names for display
// // const formatKey = (key: string): string => {
// //   return key
// //     .split(/(?=[A-Z])/)
// //     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
// //     .join(" ");
// // };

// // /**
// //  * Shows a print-friendly report in a new window
// //  */
// // const showPrintableReport = (data: any, mobileNumber: string): void => {
// //   if (!data) return;

// //   try {
// //     // Extract necessary data from the response
// //     const {
// //       //   mobile_number,
// //       identity_data,
// //       telecom_data,
// //       upi_details,
// //       employment_history,
// //       breach_details,
// //       //   uan_number,
// //       //   caller_data,
// //       fb_data,
// //     } = data || {};

// //     // Format date
// //     const currentDate = new Date();
// //     const formattedDate = `${currentDate.toLocaleDateString("en-US", {
// //       month: "long",
// //       day: "numeric",
// //       year: "numeric",
// //     })} at ${currentDate.toLocaleTimeString("en-US", {
// //       hour: "2-digit",
// //       minute: "2-digit",
// //     })}`;

// //     // Get personal info
// //     const personalInfo = identity_data?.personalInfo || {};
// //     const name = personalInfo.name || "Unknown";
// //     const age =
// //       personalInfo.age || personalInfo.dob
// //         ? calculateAge(personalInfo.dob)
// //         : "Unknown";
// //     const occupation = personalInfo.occupation || "Unknown";
// //     const email = identity_data?.emailInfo?.[0]?.email_address || "Unknown";
// //     const income = personalInfo.income || "Unknown";

// //     // Format addresses

// //     // Format addresses
// //     const addresses: Array<{ type: string; address: string; updated: string }> =
// //       [];
// //     if (identity_data?.addressInfo && identity_data.addressInfo.length > 0) {
// //       identity_data.addressInfo.forEach((addr: any, index: number) => {
// //         const addressType =
// //           index === 0 ? "Current Address" : "Previous Address";
// //         const formattedAddr = addr.address;
// //         const lastUpdated = addr.reported_date || "Unknown";

// //         addresses.push({
// //           type: addressType,
// //           address: formattedAddr,
// //           updated: lastUpdated,
// //         });
// //       });
// //     }

// //     // Format ID documents
// //     const aadhaar = findIdDocument(
// //       identity_data?.identityInfo?.aadhaarInfo || []
// //     );
// //     const pan = findIdDocument(identity_data?.identityInfo?.panInfo || []);
// //     const passport = findIdDocument(
// //       identity_data?.identityInfo?.passportInfo || []
// //     );

// //     // Format employment history
// //     interface Employment {
// //       company: string;
// //       period: string;
// //       employeeId: string;
// //       uanNumber: string;
// //       guardianName: string;
// //       lastPfDate: string;
// //     }
// //     const formattedEmployment: Employment[] = [];
// //     if (employment_history && employment_history.length > 0) {
// //       employment_history.forEach((job: any) => {
// //         formattedEmployment.push({
// //           company: job.establishment_name || "Unknown",
// //           period: formatEmploymentPeriod(job.start_date, job.end_date),
// //           employeeId: job.employee_id || "Unknown",
// //           uanNumber: job.uan_number || "Unknown",
// //           guardianName: job.guardian_name || "Unknown",
// //           lastPfDate: job.last_pf_contribution_date || "Unknown",
// //         });
// //       });
// //     }

// //     // Format digital footprint
// //     // Format digital footprint
// //     interface DigitalFootprint {
// //       platform: string;
// //       icon: string;
// //       profileInfo: string;
// //       breach: string;
// //     }
// //     const digitalFootprint: DigitalFootprint[] = [];

// //     // Handle Facebook data if available
// //     if (fb_data) {
// //       digitalFootprint.push({
// //         platform: "Facebook",
// //         icon: "fa-brands fa-facebook",
// //         profileInfo: fb_data.profile_url || "Unknown",
// //         breach: fb_data.data_breach || "None",
// //       });
// //     }

// //     // Handle LinkedIn data if email is available
// //     if (email) {
// //       digitalFootprint.push({
// //         platform: "LinkedIn",
// //         icon: "fa-brands fa-linkedin",
// //         profileInfo: `Email: ${email}`,
// //         breach: breach_details?.breaches?.LinkedIn?.infoLeak || "None",
// //       });
// //     }

// //     // Handle any other platforms from the data dynamically
// //     if (breach_details && breach_details.breaches) {
// //       Object.entries(breach_details.breaches).forEach(
// //         ([platform, details]: [string, any]) => {
// //           // Skip LinkedIn as we've already added it if email exists
// //           if (platform === "LinkedIn" && email) return;

// //           // Skip Facebook as we've already added it if fb_data exists
// //           if (platform === "Facebook" && fb_data) return;

// //           // Add other platforms dynamically
// //           digitalFootprint.push({
// //             platform: platform,
// //             icon: getIconForPlatform(platform), // A helper function to determine icon
// //             profileInfo: details.profileInfo || "Unknown",
// //             breach: details.infoLeak || "None",
// //           });
// //         }
// //       );
// //     }
// //     // Format UPI details
// //     interface UpiDetail {
// //       type: string;
// //       id?: string;
// //       name: string;
// //       psp?: string;
// //       payeeType?: string;
// //       bankIfsc?: string;
// //       ifsc?: string;
// //       accountType?: string;
// //       accountNumber?: string;
// //     }
// //     const formattedUpiDetails: UpiDetail[] = [];
// //     if (upi_details && upi_details.length > 0) {
// //       upi_details.forEach((detail: any) => {
// //         if (detail.upiId) {
// //           formattedUpiDetails.push({
// //             type: "UPI",
// //             id: detail.upiId,
// //             name: detail.name || "Unknown",
// //             psp: detail.pspName || "Unknown",
// //             payeeType: detail.payeeType || "Unknown",
// //             bankIfsc: detail.bankIfsc || "Unknown",
// //           });
// //         } else if (detail.bankName) {
// //           formattedUpiDetails.push({
// //             type: "Bank",
// //             name: detail.bankName || "Unknown",
// //             ifsc: detail.ifsc || "Unknown",
// //             accountType: detail.accountType || "Unknown",
// //             accountNumber: detail.accountNumber || "Unknown",
// //           });
// //         }
// //       });
// //     }

// //     // Format data breaches
// //     interface Breach {
// //       source: string;
// //       numRecords: number;
// //       infoLeak: string;
// //       records: any[];
// //     }
// //     const breaches: Breach[] = [];
// //     if (breach_details && breach_details.breaches) {
// //       Object.entries(breach_details.breaches).forEach(
// //         ([source, details]: [string, any]) => {
// //           breaches.push({
// //             source,
// //             numRecords: details.numOfResults || details.records?.length || 0,
// //             infoLeak: details.infoLeak || "Unknown",
// //             records: details.records || [],
// //           });
// //         }
// //       );
// //     }

// //     // Create a new window for the report
// //     const reportWindow = window.open("", "_blank");

// //     if (!reportWindow) {
// //       alert("Please allow pop-ups to view the printable report");
// //       return;
// //     }

// //     // Print-friendly HTML content
// //     const htmlContent = `
// //       <!DOCTYPE html>
// //       <html>
// //       <head>
// //         <meta charset="UTF-8">
// //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
// //         <style>
// //           /* Base styles */
// //           body {
// //             font-family: Arial, sans-serif;
// //             line-height: 1.6;
// //             color: #333;
// //             margin: 0;
// //             padding: 0;
// //             background-color: white;
// //           }

// //           .container {
// //             max-width: 800px;
// //             margin: 0 auto;
// //             padding: 20px;
// //           }

// //           /* Report header */
// //           .report-header {
// //             display: flex;
// //             align-items: center;
// //             border-bottom: 2px solid #3b82f6;
// //             padding-bottom: 15px;
// //             margin-bottom: 20px;
// //           }

// //           .logo {
// //             font-size: 3rem;
// //             color: #3b82f6;
// //             margin-right: 15px;
// //           }

// //           .report-title {
// //             margin: 0;
// //             font-size: 1.8rem;
// //             color: #1e3a8a;
// //           }

// //           .report-date {
// //             color: #6b7280;
// //             margin: 0;
// //           }

// //           /* Section styling */
// //           .section {
// //             margin-bottom: 30px;
// //             break-inside: avoid;
// //           }

// //           .section-header {
// //             background-color: #3b82f6;
// //             color: white;
// //             padding: 10px 15px;
// //             border-radius: 5px 5px 0 0;
// //             font-weight: bold;
// //             display: flex;
// //             align-items: center;
// //           }

// //           .section-header i {
// //             margin-right: 10px;
// //           }

// //           .section-body {
// //             border: 1px solid #e5e7eb;
// //             border-top: none;
// //             padding: 15px;
// //             border-radius: 0 0 5px 5px;
// //           }

// //           /* Profile section */
// //           .profile {
// //             display: flex;
// //             align-items: flex-start;
// //           }

// //           .profile-avatar {
// //             width: 80px;
// //             height: 80px;
// //             background-color: #e5e7eb;
// //             border-radius: 50%;
// //             margin-right: 20px;
// //             display: flex;
// //             align-items: center;
// //             justify-content: center;
// //             font-size: 2rem;
// //             color: #9ca3af;
// //           }

// //           .profile-details {
// //             flex: 1;
// //           }

// //           .profile-grid {
// //             display: grid;
// //             grid-template-columns: repeat(3, 1fr);
// //             gap: 15px;
// //           }

// //           .profile-item label {
// //             display: block;
// //             color: #6b7280;
// //             font-size: 0.85rem;
// //           }

// //           .profile-item p {
// //             margin: 0;
// //             font-weight: 600;
// //           }

// //           /* Card grid layouts */
// //           .card-grid {
// //             display: grid;
// //             grid-template-columns: repeat(3, 1fr);
// //             gap: 15px;
// //           }

// //           .card-grid-2 {
// //             display: grid;
// //             grid-template-columns: repeat(2, 1fr);
// //             gap: 15px;
// //           }

// //           .card {
// //             background-color: #f9fafb;
// //             border: 1px solid #e5e7eb;
// //             border-radius: 5px;
// //             padding: 12px;
// //           }

// //           .card-header {
// //             display: flex;
// //             justify-content: space-between;
// //             margin-bottom: 8px;
// //           }

// //           .card-label {
// //             color: #6b7280;
// //           }

// //           .card-icon {
// //             color: #3b82f6;
// //           }

// //           .card-value {
// //             font-weight: 600;
// //           }

// //           /* Detail rows */
// //           .detail-row {
// //             display: flex;
// //             border-bottom: 1px solid #e5e7eb;
// //             padding: 5px 0;
// //           }

// //           .detail-row:last-child {
// //             border-bottom: none;
// //           }

// //           .detail-label {
// //             width: 40%;
// //             color: #6b7280;
// //           }

// //           .detail-value {
// //             width: 60%;
// //             font-weight: 500;
// //           }

// //           /* Employment styles */
// //           .job-item {
// //             background-color: #f9fafb;
// //             border: 1px solid #e5e7eb;
// //             border-radius: 5px;
// //             padding: 12px;
// //             margin-bottom: 15px;
// //             break-inside: avoid;
// //           }

// //           .job-header {
// //             display: flex;
// //             justify-content: space-between;
// //             margin-bottom: 10px;
// //           }

// //           .job-company {
// //             font-weight: 600;
// //           }

// //           .job-period {
// //             color: #6b7280;
// //             font-size: 0.9rem;
// //           }

// //           .job-details {
// //             display: grid;
// //             grid-template-columns: repeat(2, 1fr);
// //             gap: 10px;
// //             font-size: 0.9rem;
// //           }

// //           .job-detail-label {
// //             color: #6b7280;
// //           }

// //           /* Breach section styling */
// //           .breach-item {
// //             background-color: #f9fafb;
// //             border: 1px solid #e5e7eb;
// //             border-radius: 5px;
// //             padding: 12px;
// //             margin-bottom: 15px;
// //             break-inside: avoid;
// //           }

// //           .breach-header {
// //             display: flex;
// //             justify-content: space-between;
// //             margin-bottom: 10px;
// //           }

// //           .breach-source {
// //             font-weight: 600;
// //           }

// //           .breach-count {
// //             background-color: #ef4444;
// //             color: white;
// //             padding: 2px 8px;
// //             border-radius: 15px;
// //             font-size: 0.8rem;
// //           }

// //           .breach-info {
// //             background-color: #fee2e2;
// //             padding: 8px;
// //             border-radius: 4px;
// //             font-size: 0.9rem;
// //             margin-bottom: 10px;
// //           }

// //           .breach-record {
// //             padding-left: 10px;
// //             border-left: 2px solid #ef4444;
// //             margin-bottom: 10px;
// //             font-size: 0.9rem;
// //           }

// //           .breach-record-item {
// //             padding: 3px 0;
// //           }

// //           .breach-record-label {
// //             font-weight: 500;
// //             color: #4b5563;
// //           }

// //           /* Print-specific styles */
// //           @media print {
// //             body {
// //               font-size: 12px;
// //               color: black;
// //             }

// //             .container {
// //               padding: 0;
// //               max-width: 100%;
// //             }

// //             .no-print {
// //               display: none !important;
// //             }

// //             .section {
// //               page-break-inside: avoid;
// //               margin-bottom: 20px;
// //             }

// //             .breach-count {
// //               background-color: #f9fafb !important;
// //               border: 1px solid #ef4444;
// //               color: #ef4444;
// //             }

// //             .section-header {
// //               background-color: #f9fafb !important;
// //               color: #1e3a8a;
// //               border: 1px solid #3b82f6;
// //             }

// //             a {
// //               text-decoration: none;
// //               color: black;
// //             }
// //           }
// //         </style>
// //       </head>
// //       <body>
// //         <div class="container">
// //           <!-- Print button (only visible on screen) -->
// //           <div class="no-print" style="text-align: right; margin-bottom: 20px;">
// //             <button onclick="window.print()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">
// //               Print Report
// //             </button>
// //           </div>

// //           <!-- Report Header -->
// //           <div class="report-header">
// //             <div class="logo">&#128737;</div>
// //             <div>
// //               <h1 class="report-title">CyberShastra Report</h1>
// //               <p class="report-date">Generated on ${formattedDate}</p>
// //             </div>
// //           </div>

// //           <!-- Profile Section -->
// //           <div class="section">
// //             <div class="profile">
// //               <div class="profile-avatar">&#128100;</div>
// //               <div class="profile-details">
// //                 <h2>Subject Profile</h2>
// //                 <div class="profile-grid">
// //                   <div class="profile-item">
// //                     <label>Full Name</label>
// //                     <p>${name}</p>
// //                   </div>
// //                   <div class="profile-item">
// //                     <label>Age</label>
// //                     <p>${age}</p>
// //                   </div>
// //                   <div class="profile-item">
// //                     <label>Occupation</label>
// //                     <p>${occupation}</p>
// //                   </div>
// //                   <div class="profile-item">
// //                     <label>Primary Mobile</label>
// //                     <p>${mobileNumber}</p>
// //                   </div>
// //                   <div class="profile-item">
// //                     <label>Email</label>
// //                     <p>${email}</p>
// //                   </div>
// //                   <div class="profile-item">
// //                     <label>Annual Income</label>
// //                     <p>${income}</p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           <!-- Identity Documents -->
// //           <div class="section">
// //             <div class="section-header">
// //               <span>&#128179;</span>&nbsp;Identity Documents
// //             </div>
// //             <div class="section-body">
// //               <div class="card-grid">
// //                 <div class="card">
// //                   <div class="card-header">
// //                     <span class="card-label">Aadhaar</span>
// //                     <span class="card-icon">&#128424;</span>
// //                   </div>
// //                   <p class="card-value">${aadhaar}</p>
// //                 </div>
// //                 <div class="card">
// //                   <div class="card-header">
// //                     <span class="card-label">PAN</span>
// //                     <span class="card-icon">&#128179;</span>
// //                   </div>
// //                   <p class="card-value">${pan}</p>
// //                 </div>
// //                 <div class="card">
// //                   <div class="card-header">
// //                     <span class="card-label">Passport</span>
// //                     <span class="card-icon">&#128220;</span>
// //                   </div>
// //                   <p class="card-value">${passport}</p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           <!-- UPI & Banking Details -->
// //           ${
// //             formattedUpiDetails.length > 0
// //               ? `
// //           <div class="section">
// //             <div class="section-header">
// //               <span>&#128184;</span>&nbsp;UPI & Banking Details
// //             </div>
// //             <div class="section-body">
// //               <div class="card-grid-2">
// //                 ${formattedUpiDetails
// //                   .map(
// //                     (detail: any) => `
// //                 <div class="card">
// //                   <div class="card-header">
// //                     <span class="card-value">${
// //                       detail.type === "UPI" ? "UPI Information" : "Bank Details"
// //                     }</span>
// //                     <span class="card-icon">${
// //                       detail.type === "UPI" ? "&#128241;" : "&#127970;"
// //                     }</span>
// //                   </div>
// //                   ${Object.entries(detail)
// //                     .filter(([key]) => key !== "type")
// //                     .map(
// //                       ([key, value]) => `
// //                     <div class="detail-row">
// //                       <div class="detail-label">${formatKey(key)}</div>
// //                       <div class="detail-value">${value}</div>
// //                     </div>
// //                   `
// //                     )
// //                     .join("")}
// //                 </div>
// //                 `
// //                   )
// //                   .join("")}
// //               </div>
// //             </div>
// //           </div>
// //           `
// //               : ""
// //           }

// //           <!-- Known Addresses -->
// //           ${
// //             addresses.length > 0
// //               ? `
// //           <div class="section">
// //             <div class="section-header">
// //               <span>&#128205;</span>&nbsp;Known Addresses
// //             </div>
// //             <div class="section-body">
// //               ${addresses
// //                 .map(
// //                   (addr: any) => `
// //               <div class="card" style="margin-bottom: 10px;">
// //                 <div class="card-header">
// //                   <span class="card-value">${addr.type}</span>
// //                   <span style="color: #6b7280; font-size: 0.85rem;">Last Updated: ${addr.updated}</span>
// //                 </div>
// //                 <p style="margin: 5px 0 0 0;">${addr.address}</p>
// //               </div>
// //               `
// //                 )
// //                 .join("")}
// //             </div>
// //           </div>
// //           `
// //               : ""
// //           }

// //           <!-- Digital Footprint -->
// //           ${
// //             digitalFootprint.length > 0
// //               ? `
// //           <div class="section">
// //             <div class="section-header">
// //               <span>&#127760;</span>&nbsp;Digital Footprint
// //             </div>
// //             <div class="section-body">
// //               <div class="card-grid-2">
// //                 ${digitalFootprint
// //                   .map(
// //                     (footprint: any) => `
// //                 <div class="card">
// //                   <div style="display: flex; align-items: center; margin-bottom: 10px;">
// //                     <span style="color: #3b82f6; margin-right: 8px; font-size: 1.25rem;">
// //                       ${
// //                         footprint.platform === "Facebook"
// //                           ? "&#xf09a;"
// //                           : "&#xf0e1;"
// //                       }
// //                     </span>
// //                     <span style="font-weight: 600;">${footprint.platform}</span>
// //                   </div>
// //                   <div style="font-size: 0.9rem; margin-bottom: 4px;">
// //                     <span style="color: #6b7280;">Profile:</span> ${
// //                       footprint.profileInfo
// //                     }
// //                   </div>
// //                   <div style="font-size: 0.9rem;">
// //                     <span style="color: #6b7280;">Data Breach:</span> ${
// //                       footprint.breach
// //                     }
// //                   </div>
// //                 </div>
// //                 `
// //                   )
// //                   .join("")}
// //               </div>
// //             </div>
// //           </div>
// //           `
// //               : ""
// //           }

// //           <!-- Employment History -->
// //           ${
// //             formattedEmployment.length > 0
// //               ? `
// //           <div class="section">
// //             <div class="section-header">
// //               <span>&#128188;</span>&nbsp;Employment History
// //             </div>
// //             <div class="section-body">
// //               ${formattedEmployment
// //                 .map(
// //                   (job: any) => `
// //               <div class="job-item">
// //                 <div class="job-header">
// //                   <span class="job-company">${job.company}</span>
// //                   <span class="job-period">${job.period}</span>
// //                 </div>
// //                 <div class="job-details">
// //                   <p><span class="job-detail-label">Employee ID:</span> ${job.employeeId}</p>
// //                   <p><span class="job-detail-label">UAN Number:</span> ${job.uanNumber}</p>
// //                   <p><span class="job-detail-label">Guardian Name:</span> ${job.guardianName}</p>
// //                   <p><span class="job-detail-label">Last PF Date:</span> ${job.lastPfDate}</p>
// //                 </div>
// //               </div>
// //               `
// //                 )
// //                 .join("")}
// //             </div>
// //           </div>
// //           `
// //               : ""
// //           }

// //           <!-- Data Breach Information -->
// //           ${
// //             breaches.length > 0
// //               ? `
// //           <div class="section">
// //             <div class="section-header">
// //               <span>&#128737;</span>&nbsp;Data Breach Information
// //             </div>
// //             <div class="section-body">
// //               ${breaches
// //                 .map(
// //                   (breach: any) => `
// //               <div class="breach-item">
// //                 <div class="breach-header">
// //                   <div class="breach-source">${breach.source}</div>
// //                   ${
// //                     breach.numRecords > 0
// //                       ? `
// //                   <div class="breach-count">
// //                     ${breach.numRecords} ${
// //                           breach.numRecords === 1 ? "record" : "records"
// //                         } found
// //                   </div>
// //                   `
// //                       : ""
// //                   }
// //                 </div>
// //                 ${
// //                   breach.infoLeak !== "Unknown"
// //                     ? `
// //                 <div class="breach-info">
// //                   <span style="font-weight: 600;">Leaked data:</span> ${breach.infoLeak}
// //                 </div>
// //                 `
// //                     : ""
// //                 }
// //                 ${
// //                   breach.records.length > 0
// //                     ? `
// //                 <div>
// //                   ${breach.records
// //                     .map(
// //                       (record: any) => `
// //                   <div class="breach-record">
// //                     ${Object.entries(record)
// //                       .map(
// //                         ([key, value]: [string, any]) => `
// //                     <div class="breach-record-item">
// //                       <span class="breach-record-label">${formatKey(
// //                         key
// //                       )}:</span>
// //                       ${value}
// //                     </div>
// //                     `
// //                       )
// //                       .join("")}
// //                   </div>
// //                   `
// //                     )
// //                     .join("")}
// //                 </div>
// //                 `
// //                     : ""
// //                 }
// //               </div>
// //               `
// //                 )
// //                 .join("")}
// //             </div>
// //           </div>
// //           `
// //               : ""
// //           }

// //           <!-- Telecom Details -->
// //           ${
// //             telecom_data && Object.keys(telecom_data).length > 0
// //               ? `
// //           <div class="section">
// //             <div class="section-header">
// //               <span>&#128241;</span>&nbsp;Telecom Details
// //             </div>
// //             <div class="section-body">
// //               <div class="card-grid">
// //                 <div class="card">
// //                   <div class="card-label">Service Provider</div>
// //                   <div class="card-value">${
// //                     telecom_data.operator || "Unknown"
// //                   }</div>
// //                 </div>
// //                 <div class="card">
// //                   <div class="card-label">Connection Type</div>
// //                   <div class="card-value">${
// //                     telecom_data.connection_type || "Unknown"
// //                   }</div>
// //                 </div>
// //                 <div class="card">
// //                   <div class="card-label">Status</div>
// //                   <div class="card-value">${
// //                     telecom_data.status || "Unknown"
// //                   }</div>
// //                 </div>
// //                 <div class="card">
// //                   <div class="card-label">MSISDN</div>
// //                   <div class="card-value">${mobileNumber}</div>
// //                 </div>
// //                 <div class="card">
// //                   <div class="card-label">Region</div>
// //                   <div class="card-value">${
// //                     telecom_data.state || telecom_data.circle || "Unknown"
// //                   }</div>
// //                 </div>
// //                 <div class="card">
// //                   <div class="card-label">IMSI</div>
// //                   <div class="card-value">${
// //                     telecom_data.imsi || "Unknown"
// //                   }</div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //           `
// //               : ""
// //           }

// //         </div>
// //       </body>
// //       </html>
// //     `;

// //     // Write the HTML content to the new window
// //     reportWindow.document.write(htmlContent);
// //     reportWindow.document.close();

// //     // Show success message
// //     if (typeof window !== "undefined" && (window as any).toast) {
// //       (window as any).toast.success(
// //         "Report generated. Use the Print button to save as PDF."
// //       );
// //     }
// //   } catch (error) {
// //     console.error("Error generating printable report:", error);

// //     // Show error toast
// //     if (typeof window !== "undefined" && (window as any).toast) {
// //       (window as any).toast.error("Failed to generate report");
// //     }
// //   }
// // };

// // export { showPrintableReport };

// // // Helper function to determine icon based on platform name
// // function getIconForPlatform(platform: string): string {
// //   const platformIcons: { [key: string]: string } = {
// //     Facebook: "fa-brands fa-facebook",
// //     LinkedIn: "fa-brands fa-linkedin",
// //     Twitter: "fa-brands fa-twitter",
// //     Instagram: "fa-brands fa-instagram",
// //     Google: "fa-brands fa-google",
// //     GitHub: "fa-brands fa-github",
// //     // Add more platform mappings as needed
// //   };

// //   return platformIcons[platform] || "fa-solid fa-globe"; // Default to globe icon if no match
// // }
// // src/utils/reportGenerator.ts

// /**
//  * Utility for generating print-friendly reports for mobile OSINT data
//  * Handles dynamic property names in the API response
//  */

// // Helper functions
// const calculateAge = (dob: string): string => {
//   if (!dob) return "Unknown";

//   try {
//     const birthDate = new Date(dob);
//     const today = new Date();
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();

//     if (
//       monthDiff < 0 ||
//       (monthDiff === 0 && today.getDate() < birthDate.getDate())
//     ) {
//       age--;
//     }

//     return `${age} years`;
//   } catch (error) {
//     console.error("Error calculating age:", error);
//     return "Unknown";
//   }
// };

// const findIdDocument = (documents: any[]): string => {
//   if (!documents || documents.length === 0) return "Unknown";

//   // Get the first document and its number or id
//   const doc = documents[0];
//   return doc.id_number || doc.number || "Unknown";
// };

// const formatEmploymentPeriod = (
//   startDate: string | null,
//   endDate: string | null
// ): string => {
//   const formatDate = (date: string | null) => {
//     if (!date) return "Unknown";

//     try {
//       const d = new Date(date);
//       return `${d.toLocaleString("default", {
//         month: "short",
//       })} ${d.getFullYear()}`;
//     } catch (error) {
//       console.error("Error formatting date:", error);
//       return date;
//     }
//   };

//   return `${formatDate(startDate)} - ${formatDate(endDate)}`;
// };

// // Format key names for display
// const formatKey = (key: string): string => {
//   return key
//     .split(/(?=[A-Z])|_/)
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//     .join(" ");
// };

// // Get value safely with fallbacks
// const getValue = (
//   obj: any,
//   paths: string[],
//   defaultValue: string = "Unknown"
// ): string => {
//   for (const path of paths) {
//     const value = path
//       .split(".")
//       .reduce((o, p) => (o && o[p] !== undefined ? o[p] : undefined), obj);
//     if (value !== undefined && value !== null && value !== "") {
//       return String(value);
//     }
//   }
//   return defaultValue;
// };

// // Interface definitions
// interface Address {
//   type: string;
//   address: string;
//   updated: string;
// }

// interface Employment {
//   company: string;
//   period: string;
//   employeeId: string;
//   uanNumber: string;
//   guardianName: string;
//   lastPfDate: string;
//   name: string;
// }

// interface DigitalFootprint {
//   platform: string;
//   icon: string;
//   profileInfo: string;
//   breach: string;
// }

// interface UpiDetail {
//   type: string;
//   id?: string;
//   name?: string;
//   psp?: string;
//   payeeType?: string;
//   bankIfsc?: string;
//   bankName?: string;
//   branch?: string;
//   address?: string;
//   city?: string;
//   district?: string;
//   state?: string;
//   contact?: string;
//   micr?: string;
//   rtgs?: boolean;
//   neft?: boolean;
//   imps?: boolean;
//   upi?: boolean;
// }

// interface Breach {
//   source: string;
//   numRecords: number;
//   infoLeak: string;
//   records: any[];
// }

// interface IdDocument {
//   type: string;
//   value: string;
//   icon: string;
// }

// /**
//  * Shows a print-friendly report in a new window
//  */
// const showPrintableReport = (data: any, mobileNumber: string): void => {
//   if (!data) return;

//   try {
//     // Extract necessary data from the response
//     const {
//       mobile_number,
//       identity_data,
//       telecom_data,
//       upi_details,
//       employment_history,
//       breach_details,
//       uan_number,
//       caller_data,
//       fb_data,
//     } = data || {};

//     // Format date
//     const currentDate = new Date();
//     const formattedDate = `${currentDate.toLocaleDateString("en-US", {
//       month: "long",
//       day: "numeric",
//       year: "numeric",
//     })} at ${currentDate.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//     })}`;

//     // Get personal info
//     const personalInfo = identity_data?.personalInfo || {};
//     const name = getValue(
//       personalInfo,
//       ["full_name", "name"],
//       getValue(caller_data, ["0.name"], mobile_number || mobileNumber)
//     );
//     const age =
//       personalInfo.age ||
//       (personalInfo.dob ? calculateAge(personalInfo.dob) : "Unknown");
//     const occupation = getValue(personalInfo, ["occupation"], "Unknown");
//     const email = getValue(
//       identity_data,
//       ["emailInfo.0.email_address"],
//       "Unknown"
//     );
//     const income = getValue(
//       personalInfo,
//       ["total_income", "income"],
//       "Unknown"
//     );

//     // Format addresses
//     const addresses: Address[] = [];
//     if (identity_data?.addressInfo && identity_data.addressInfo.length > 0) {
//       identity_data.addressInfo.forEach((addr: any, index: number) => {
//         // Get address type
//         let addressType =
//           addr.type || (index === 0 ? "Current Address" : "Previous Address");
//         if (addressType.includes(",")) {
//           addressType = addressType.split(",")[0];
//         }

//         const formattedAddr = addr.address || "Unknown";
//         const lastUpdated = addr.reported_date || "Unknown";

//         addresses.push({
//           type: addressType,
//           address: formattedAddr,
//           updated: lastUpdated,
//         });
//       });
//     }

//     // Format ID documents
//     const identityInfo = identity_data?.identityInfo || {};
//     const aadhaar = findIdDocument(identityInfo.aadhaar_number || []);
//     const pan = findIdDocument(identityInfo.pan_number || []);
//     const passport = findIdDocument(identityInfo.passport_number || []);
//     const drivingLicense = findIdDocument(identityInfo.driving_license || []);
//     const voterId = findIdDocument(identityInfo.voter_id || []);

//     // Format all available ID documents dynamically
//     const idDocuments: IdDocument[] = [];

//     if (pan !== "Unknown") {
//       idDocuments.push({ type: "PAN", value: pan, icon: "&#128179;" });
//     }

//     if (aadhaar !== "Unknown") {
//       idDocuments.push({ type: "Aadhaar", value: aadhaar, icon: "&#128424;" });
//     }

//     if (passport !== "Unknown") {
//       idDocuments.push({
//         type: "Passport",
//         value: passport,
//         icon: "&#128220;",
//       });
//     }

//     if (drivingLicense !== "Unknown") {
//       idDocuments.push({
//         type: "Driving License",
//         value: drivingLicense,
//         icon: "&#128663;",
//       });
//     }

//     if (voterId !== "Unknown") {
//       idDocuments.push({ type: "Voter ID", value: voterId, icon: "&#128196;" });
//     }

//     // If we don't have any documents, add placeholders
//     if (idDocuments.length === 0) {
//       idDocuments.push({ type: "PAN", value: "Unknown", icon: "&#128179;" });
//       idDocuments.push({
//         type: "Aadhaar",
//         value: "Unknown",
//         icon: "&#128424;",
//       });
//       idDocuments.push({
//         type: "Passport",
//         value: "Unknown",
//         icon: "&#128220;",
//       });
//     }

//     // Format employment history
//     const formattedEmployment: Employment[] = [];
//     if (employment_history && employment_history.length > 0) {
//       employment_history.forEach((job: any) => {
//         formattedEmployment.push({
//           company: job.establishment_name || "Unknown",
//           period: formatEmploymentPeriod(
//             job.date_of_joining || job.start_date,
//             job.date_of_exit || job.end_date
//           ),
//           employeeId: job.member_id || job.employee_id || "Unknown",
//           uanNumber: uan_number || job.uan_number || "Unknown",
//           guardianName: job.guardian_name || "Unknown",
//           lastPfDate:
//             job.last_pf_submitted || job.last_pf_contribution_date || "Unknown",
//           name: job.name || "Unknown",
//         });
//       });
//     }

//     // Format digital footprint
//     const digitalFootprint: DigitalFootprint[] = [];

//     // Handle caller data as part of digital footprint
//     if (caller_data && caller_data.length > 0) {
//       const caller = caller_data[0];
//       digitalFootprint.push({
//         platform: "Truecaller",
//         icon: "&#128222;",
//         profileInfo: `Name: ${caller.name || "Unknown"}${
//           caller.alternate_names
//             ? ", Aliases: " + caller.alternate_names.join(", ")
//             : ""
//         }`,
//         breach: caller.is_spam ? "Marked as spam" : "Not marked as spam",
//       });
//     }

//     // Handle Facebook data if available
//     if (fb_data && Object.keys(fb_data).length > 0) {
//       digitalFootprint.push({
//         platform: "Facebook",
//         icon: "&#127760;",
//         profileInfo: fb_data.profile_url || "Unknown",
//         breach: fb_data.data_breach || "None",
//       });
//     }

//     // Handle email-related information
//     if (email !== "Unknown") {
//       digitalFootprint.push({
//         platform: "Email",
//         icon: "&#9993;",
//         profileInfo: email,
//         breach: "Unknown",
//       });
//     }

//     // Handle breach data platforms
//     if (breach_details && breach_details.breaches) {
//       Object.entries(breach_details.breaches).forEach(
//         ([platform, details]: [string, any]) => {
//           digitalFootprint.push({
//             platform: platform,
//             icon: "&#128274;",
//             profileInfo: "Account compromised",
//             breach: details.infoLeak || "Data compromised",
//           });
//         }
//       );
//     }

//     // Format UPI details
//     const formattedUpiDetails: UpiDetail[] = [];
//     if (upi_details && upi_details.length > 0) {
//       upi_details.forEach((detail: any) => {
//         if (detail.upiId) {
//           formattedUpiDetails.push({
//             type: "UPI",
//             id: detail.upiId,
//             name: detail.name || "Unknown",
//             psp: detail.pspName || "Unknown",
//             payeeType: detail.payeeType || "Unknown",
//             bankIfsc: detail.bankIfsc || "Unknown",
//           });
//         } else if (detail.bankName) {
//           formattedUpiDetails.push({
//             type: "Bank",
//             bankName: detail.bankName || "Unknown",
//             branch: detail.branch || "Unknown",
//             address: detail.address || "Unknown",
//             city: detail.city || "Unknown",
//             district: detail.district || "Unknown",
//             state: detail.state || "Unknown",
//             contact: detail.contact || "Unknown",
//             micr: detail.micr || "Unknown",
//             rtgs: detail.rtgs || false,
//             neft: detail.neft || false,
//             imps: detail.imps || false,
//             upi: detail.upi || false,
//           });
//         }
//       });
//     }

//     // Format data breaches
//     const breaches: Breach[] = [];
//     if (breach_details && breach_details.breaches) {
//       Object.entries(breach_details.breaches).forEach(
//         ([source, details]: [string, any]) => {
//           breaches.push({
//             source,
//             numRecords: details.numOfResults || details.records?.length || 0,
//             infoLeak: details.infoLeak || "Unknown",
//             records: details.records || [],
//           });
//         }
//       );
//     }

//     // Create a new window for the report
//     const reportWindow = window.open("", "_blank");

//     if (!reportWindow) {
//       if (typeof window !== "undefined" && (window as any).toast) {
//         (window as any).toast.error("Please allow pop-ups to view the report");
//       } else {
//         alert("Please allow pop-ups to view the printable report");
//       }
//       return;
//     }

//     // Print-friendly HTML content
//     const htmlContent = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <title>CyberShastra Report - ${mobileNumber}</title>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <style>
//           /* Base styles */
//           body {
//             font-family: Arial, sans-serif;
//             line-height: 1.6;
//             color: #333;
//             margin: 0;
//             padding: 0;
//             background-color: white;
//           }

//           .container {
//             max-width: 800px;
//             margin: 0 auto;
//             padding: 20px;
//           }

//           /* Report header */
//           .report-header {
//             display: flex;
//             align-items: center;
//             border-bottom: 2px solid #3b82f6;
//             padding-bottom: 15px;
//             margin-bottom: 20px;
//           }

//           .logo {
//             font-size: 3rem;
//             color: #3b82f6;
//             margin-right: 15px;
//           }

//           .report-title {
//             margin: 0;
//             font-size: 1.8rem;
//             color: #1e3a8a;
//           }

//           .report-date {
//             color: #6b7280;
//             margin: 0;
//           }

//           /* Section styling */
//           .section {
//             margin-bottom: 30px;
//             break-inside: avoid;
//           }

//           .section-header {
//             background-color: #3b82f6;
//             color: white;
//             padding: 10px 15px;
//             border-radius: 5px 5px 0 0;
//             font-weight: bold;
//             display: flex;
//             align-items: center;
//           }

//           .section-header i {
//             margin-right: 10px;
//           }

//           .section-body {
//             border: 1px solid #e5e7eb;
//             border-top: none;
//             padding: 15px;
//             border-radius: 0 0 5px 5px;
//           }

//           /* Profile section */
//           .profile {
//             display: flex;
//             align-items: flex-start;
//           }

//           .profile-avatar {
//             width: 80px;
//             height: 80px;
//             background-color: #e5e7eb;
//             border-radius: 50%;
//             margin-right: 20px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-size: 2rem;
//             color: #9ca3af;
//           }

//           .profile-details {
//             flex: 1;
//           }

//           .profile-grid {
//             display: grid;
//             grid-template-columns: repeat(3, 1fr);
//             gap: 15px;
//           }

//           .profile-item label {
//             display: block;
//             color: #6b7280;
//             font-size: 0.85rem;
//           }

//           .profile-item p {
//             margin: 0;
//             font-weight: 600;
//           }

//           /* Card grid layouts */
//           .card-grid {
//             display: grid;
//             grid-template-columns: repeat(3, 1fr);
//             gap: 15px;
//           }

//           .card-grid-2 {
//             display: grid;
//             grid-template-columns: repeat(2, 1fr);
//             gap: 15px;
//           }

//           .card {
//             background-color: #f9fafb;
//             border: 1px solid #e5e7eb;
//             border-radius: 5px;
//             padding: 12px;
//           }

//           .card-header {
//             display: flex;
//             justify-content: space-between;
//             margin-bottom: 8px;
//           }

//           .card-label {
//             color: #6b7280;
//           }

//           .card-icon {
//             color: #3b82f6;
//           }

//           .card-value {
//             font-weight: 600;
//           }

//           /* Detail rows */
//           .detail-row {
//             display: flex;
//             border-bottom: 1px solid #e5e7eb;
//             padding: 5px 0;
//           }

//           .detail-row:last-child {
//             border-bottom: none;
//           }

//           .detail-label {
//             width: 40%;
//             color: #6b7280;
//           }

//           .detail-value {
//             width: 60%;
//             font-weight: 500;
//           }

//           /* Employment styles */
//           .job-item {
//             background-color: #f9fafb;
//             border: 1px solid #e5e7eb;
//             border-radius: 5px;
//             padding: 12px;
//             margin-bottom: 15px;
//             break-inside: avoid;
//           }

//           .job-header {
//             display: flex;
//             justify-content: space-between;
//             margin-bottom: 10px;
//           }

//           .job-company {
//             font-weight: 600;
//           }

//           .job-period {
//             color: #6b7280;
//             font-size: 0.9rem;
//           }

//           .job-details {
//             display: grid;
//             grid-template-columns: repeat(2, 1fr);
//             gap: 10px;
//             font-size: 0.9rem;
//           }

//           .job-detail-label {
//             color: #6b7280;
//           }

//           /* Breach section styling */
//           .breach-item {
//             background-color: #f9fafb;
//             border: 1px solid #e5e7eb;
//             border-radius: 5px;
//             padding: 12px;
//             margin-bottom: 15px;
//             break-inside: avoid;
//           }

//           .breach-header {
//             display: flex;
//             justify-content: space-between;
//             margin-bottom: 10px;
//           }

//           .breach-source {
//             font-weight: 600;
//           }

//           .breach-count {
//             background-color: #ef4444;
//             color: white;
//             padding: 2px 8px;
//             border-radius: 15px;
//             font-size: 0.8rem;
//           }

//           .breach-info {
//             background-color: #fee2e2;
//             padding: 8px;
//             border-radius: 4px;
//             font-size: 0.9rem;
//             margin-bottom: 10px;
//           }

//           .breach-record {
//             padding-left: 10px;
//             border-left: 2px solid #ef4444;
//             margin-bottom: 10px;
//             font-size: 0.9rem;
//           }

//           .breach-record-item {
//             padding: 3px 0;
//           }

//           .breach-record-label {
//             font-weight: 500;
//             color: #4b5563;
//           }

//           /* Print-specific styles */
//           @media print {
//             body {
//               font-size: 12px;
//               color: black;
//             }

//             .container {
//               padding: 0;
//               max-width: 100%;
//             }

//             .no-print {
//               display: none !important;
//             }

//             .section {
//               page-break-inside: avoid;
//               margin-bottom: 20px;
//             }

//             .breach-count {
//               background-color: #f9fafb !important;
//               border: 1px solid #ef4444;
//               color: #ef4444;
//             }

//             .section-header {
//               background-color: #f9fafb !important;
//               color: #1e3a8a;
//               border: 1px solid #3b82f6;
//             }

//             a {
//               text-decoration: none;
//               color: black;
//             }
//           }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <!-- Print button (only visible on screen) -->
//           <div class="no-print" style="text-align: right; margin-bottom: 20px;">
//             <button onclick="window.print()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">
//               Print Report
//             </button>
//           </div>

//           <!-- Report Header -->
//           <div class="report-header">
//             <div class="logo">&#128737;</div>
//             <div>
//               <h1 class="report-title">CyberShastra Report</h1>
//               <p class="report-date">Generated on ${formattedDate}</p>
//             </div>
//           </div>

//           <!-- Profile Section -->
//           <div class="section">
//             <div class="profile">
//               <div class="profile-avatar">&#128100;</div>
//               <div class="profile-details">
//                 <h2>Subject Profile</h2>
//                 <div class="profile-grid">
//                   <div class="profile-item">
//                     <label>Full Name</label>
//                     <p>${name}</p>
//                   </div>
//                   <div class="profile-item">
//                     <label>Age</label>
//                     <p>${age}</p>
//                   </div>
//                   <div class="profile-item">
//                     <label>Occupation</label>
//                     <p>${occupation}</p>
//                   </div>
//                   <div class="profile-item">
//                     <label>Primary Mobile</label>
//                     <p>${mobile_number || mobileNumber}</p>
//                   </div>
//                   <div class="profile-item">
//                     <label>Email</label>
//                     <p>${email}</p>
//                   </div>
//                   <div class="profile-item">
//                     <label>Annual Income</label>
//                     <p>${
//                       income === "Unknown"
//                         ? "Unknown"
//                         : "₹" + parseInt(income).toLocaleString("en-IN")
//                     }</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <!-- Identity Documents -->
//           <div class="section">
//             <div class="section-header">
//               <span>&#128179;</span>&nbsp;Identity Documents
//             </div>
//             <div class="section-body">
//               <div class="card-grid">
//                 ${idDocuments
//                   .map(
//                     (doc) => `
//                 <div class="card">
//                   <div class="card-header">
//                     <span class="card-label">${doc.type}</span>
//                     <span class="card-icon">${doc.icon}</span>
//                   </div>
//                   <p class="card-value">${doc.value}</p>
//                 </div>
//                 `
//                   )
//                   .join("")}
//               </div>
//             </div>
//           </div>

//           <!-- UPI & Banking Details -->
//           ${
//             formattedUpiDetails.length > 0
//               ? `
//           <div class="section">
//             <div class="section-header">
//               <span>&#128184;</span>&nbsp;UPI & Banking Details
//             </div>
//             <div class="section-body">
//               <div class="card-grid-2">
//                 ${formattedUpiDetails
//                   .map(
//                     (detail: any) => `
//                 <div class="card">
//                   <div class="card-header">
//                     <span class="card-value">${
//                       detail.type === "UPI" ? "UPI Information" : "Bank Details"
//                     }</span>
//                     <span class="card-icon">${
//                       detail.type === "UPI" ? "&#128241;" : "&#127970;"
//                     }</span>
//                   </div>
//                   ${Object.entries(detail)
//                     .filter(
//                       ([key]) =>
//                         key !== "type" && typeof detail[key] !== "boolean"
//                     )
//                     .map(
//                       ([key, value]) => `
//                     <div class="detail-row">
//                       <div class="detail-label">${formatKey(key)}</div>
//                       <div class="detail-value">${value}</div>
//                     </div>
//                   `
//                     )
//                     .join("")}
//                   ${
//                     detail.type === "Bank"
//                       ? `
//                   <div class="detail-row">
//                     <div class="detail-label">Supported Features</div>
//                     <div class="detail-value">
//                       ${detail.rtgs ? "RTGS, " : ""}
//                       ${detail.neft ? "NEFT, " : ""}
//                       ${detail.imps ? "IMPS, " : ""}
//                       ${detail.upi ? "UPI" : ""}
//                     </div>
//                   </div>
//                   `
//                       : ""
//                   }
//                 </div>
//                 `
//                   )
//                   .join("")}
//               </div>
//             </div>
//           </div>
//           `
//               : ""
//           }

//           <!-- Known Addresses -->
//           ${
//             addresses.length > 0
//               ? `
//           <div class="section">
//             <div class="section-header">
//               <span>&#128205;</span>&nbsp;Known Addresses
//             </div>
//             <div class="section-body">
//               ${addresses
//                 .map(
//                   (addr: any) => `
//               <div class="card" style="margin-bottom: 10px;">
//                 <div class="card-header">
//                   <span class="card-value">${addr.type}</span>
//                   <span style="color: #6b7280; font-size: 0.85rem;">Last Updated: ${addr.updated}</span>
//                 </div>
//                 <p style="margin: 5px 0 0 0;">${addr.address}</p>
//               </div>
//               `
//                 )
//                 .join("")}
//             </div>
//           </div>
//           `
//               : ""
//           }

//           <!-- Digital Footprint -->
//           ${
//             digitalFootprint.length > 0
//               ? `
//           <div class="section">
//             <div class="section-header">
//               <span>&#127760;</span>&nbsp;Digital Footprint
//             </div>
//             <div class="section-body">
//               <div class="card-grid-2">
//                 ${digitalFootprint
//                   .map(
//                     (footprint: any) => `
//                 <div class="card">
//                   <div style="display: flex; align-items: center; margin-bottom: 10px;">
//                     <span style="color: #3b82f6; margin-right: 8px; font-size: 1.25rem;">
//                       ${footprint.icon}
//                     </span>
//                     <span style="font-weight: 600;">${footprint.platform}</span>
//                   </div>
//                   <div style="font-size: 0.9rem; margin-bottom: 4px;">
//                     <span style="color: #6b7280;">Profile:</span> ${footprint.profileInfo}
//                   </div>
//                   <div style="font-size: 0.9rem;">
//                     <span style="color: #6b7280;">Data Breach:</span> ${footprint.breach}
//                   </div>
//                 </div>
//                 `
//                   )
//                   .join("")}
//               </div>
//             </div>
//           </div>
//           `
//               : ""
//           }

//           <!-- Employment History -->
//           ${
//             formattedEmployment.length > 0
//               ? `
//           <div class="section">
//             <div class="section-header">
//               <span>&#128188;</span>&nbsp;Employment History
//             </div>
//             <div class="section-body">
//               ${formattedEmployment
//                 .map(
//                   (job: any) => `
//               <div class="job-item">
//                 <div class="job-header">
//                   <span class="job-company">${job.company}</span>
//                   <span class="job-period">${job.period}</span>
//                 </div>
//                 <div class="job-details">
//                   <p><span class="job-detail-label">Employee Name:</span> ${
//                     job.name
//                   }</p>
//                   <p><span class="job-detail-label">Employee ID:</span> ${
//                     job.employeeId
//                   }</p>
//                   <p><span class="job-detail-label">UAN Number:</span> ${
//                     job.uanNumber
//                   }</p>
//                   <p><span class="job-detail-label">Guardian Name:</span> ${
//                     job.guardianName || "Not Available"
//                   }</p>
//                   <p><span class="job-detail-label">Last PF Date:</span> ${
//                     job.lastPfDate || "Not Available"
//                   }</p>
//                 </div>
//               </div>
//               `
//                 )
//                 .join("")}
//             </div>
//           </div>
//           `
//               : ""
//           }

//           <!-- Data Breach Information -->
//           ${
//             breaches.length > 0
//               ? `
//           <div class="section">
//             <div class="section-header">
//               <span>&#128737;</span>&nbsp;Data Breach Information
//             </div>
//             <div class="section-body">
//               ${breaches
//                 .map(
//                   (breach: any) => `
//               <div class="breach-item">
//                 <div class="breach-header">
//                   <div class="breach-source">${breach.source}</div>
//                   ${
//                     breach.numRecords > 0
//                       ? `
//                   <div class="breach-count">
//                     ${breach.numRecords} ${
//                           breach.numRecords === 1 ? "record" : "records"
//                         } found
//                   </div>
//                   `
//                       : ""
//                   }
//                 </div>
//                 ${
//                   breach.infoLeak !== "Unknown"
//                     ? `
//                 <div class="breach-info">
//                   <span style="font-weight: 600;">Leaked data:</span> ${breach.infoLeak}
//                 </div>
//                 `
//                     : ""
//                 }
//                 ${
//                   breach.records && breach.records.length > 0
//                     ? `
//                 <div>
//                   ${breach.records
//                     .map(
//                       (record: any) => `
//                   <div class="breach-record">
//                     ${Object.entries(record)
//                       .map(
//                         ([key, value]: [string, any]) => `
//                     <div class="breach-record-item">
//                       <span class="breach-record-label">${formatKey(
//                         key
//                       )}:</span>
//                       ${value}
//                     </div>
//                     `
//                       )
//                       .join("")}
//                   </div>
//                   `
//                     )
//                     .join("")}
//                 </div>
//                 `
//                     : ""
//                 }
//               </div>
//               `
//                 )
//                 .join("")}
//             </div>
//           </div>
//           `
//               : breach_details && breach_details.info
//               ? `
//           <div class="section">
//             <div class="section-header">
//               <span>&#128737;</span>&nbsp;Data Breach Information
//             </div>
//             <div class="section-body">
//               <div class="card">
//                 <p>${breach_details.info}</p>
//                 ${
//                   breach_details.details
//                     ? `<p>${breach_details.details.replace(/<\/?em>/g, "")}</p>`
//                     : ""
//                 }
//               </div>
//             </div>
//           </div>
//           `
//               : ""
//           }

//           <!-- Telecom Details -->
//           ${
//             telecom_data && Object.keys(telecom_data).length > 0
//               ? `
//           <div class="section">
//             <div class="section-header">
//               <span>&#128241;</span>&nbsp;Telecom Details
//             </div>
//             <div class="section-body">
//               <div class="card-grid">
//                 <div class="card">
//                   <div class="card-label">Service Provider</div>
//                   <div class="card-value">${
//                     telecom_data.serviceProvider ||
//                     telecom_data.operator ||
//                     "Unknown"
//                   }</div>
//                 </div>
//                 <div class="card">
//                   <div class="card-label">Connection Type</div>
//                   <div class="card-value">${
//                     telecom_data.connectionType ||
//                     telecom_data.connection_type ||
//                     "Unknown"
//                   }</div>
//                 </div>
//                 <div class="card">
//                   <div class="card-label">Status</div>
//                   <div class="card-value">${
//                     telecom_data.subscriberStatus ||
//                     telecom_data.status ||
//                     "Unknown"
//                   }</div>
//                 </div>
//                 <div class="card">
//                   <div class="card-label">MSISDN</div>
//                   <div class="card-value">${
//                     telecom_data.msisdn || mobileNumber
//                   }</div>
//                 </div>
//                 <div class="card">
//                   <div class="card-label">Region</div>
//                   <div class="card-value">${
//                     telecom_data.region ||
//                     telecom_data.state ||
//                     telecom_data.circle ||
//                     "Unknown"
//                   }</div>
//                 </div>
//                 <div class="card">
//                   <div class="card-label">IMSI</div>
//                   <div class="card-value">${
//                     telecom_data.imsi || "Unknown"
//                   }</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           `
//               : ""
//           }

//           <!-- Footer -->
//           <div style="text-align: center; font-size: 0.8rem; color: #6b7280; margin-top: 40px;">
//             <p>This report is confidential and for authorized use only.</p>
//             <p>Generated by CyberShastra Intelligence Platform</p>
//           </div>
//         </div>
//         <script>
//           // Auto focus the print button when the page loads
//           window.onload = function() {
//             const printButton = document.querySelector('button');
//             if (printButton) {
//               printButton.focus();
//             }
//           };
//         </script>
//       </body>
//       </html>
//     `;

//     // Write the HTML content to the new window
//     reportWindow.document.write(htmlContent);
//     reportWindow.document.close();

//     // Show success message
//     if (typeof window !== "undefined" && (window as any).toast) {
//       (window as any).toast.success(
//         "Report generated. Use the Print button to save as PDF."
//       );
//     }
//   } catch (error) {
//     console.error("Error generating printable report:", error);

//     // Show error toast
//     if (typeof window !== "undefined" && (window as any).toast) {
//       (window as any).toast.error("Failed to generate report");
//     }
//   }
// };

// const showEmailPrintableReport = (data: any, email: string): void => {
//   if (!data) return;

//   try {
//     // Extract necessary data from the response
//     const { breach_details, osint_data } = data || {};

//     // Format date
//     const currentDate = new Date();
//     const formattedDate = `${currentDate.toLocaleDateString("en-US", {
//       month: "long",
//       day: "numeric",
//       year: "numeric",
//     })} at ${currentDate.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//     })}`;

//     // Extract profile information
//     const profile = osint_data?.PROFILE_CONTAINER?.profile || {};

//     // Get name info
//     const names = profile.names || {};
//     const profileName = names.PROFILE || {};
//     const contactName = names.CONTACT || {};
//     const fullName = profileName.fullname || contactName.fullname || "";
//     const firstName = profileName.firstName || contactName.firstName || "";
//     const lastName = profileName.lastName || contactName.lastName || "";
//     const displayName =
//       fullName || `${firstName} ${lastName}`.trim() || email.split("@")[0];

//     // Get emails
//     const emails = profile.emails || {};
//     const profileEmail = emails.PROFILE?.value || "";
//     const contactEmail = emails.CONTACT?.value || "";
//     const allEmails = [profileEmail, contactEmail].filter(
//       (e) => e && e !== email
//     );

//     // Get photos
//     const profilePhoto = profile.profilePhotos?.PROFILE?.url || "";
//     const coverPhoto = profile.coverPhotos?.PROFILE?.url || "";

//     // Get used apps
//     const apps = profile.inAppReachability?.PROFILE?.apps || [];

//     // Get maps data
//     const mapsData = osint_data?.PROFILE_CONTAINER?.maps || {};
//     const mapsStats = mapsData.stats || {};

//     interface BreachInfo {
//       source: string;
//       details: {
//         numOfResults?: number;
//         records?: any[];
//         infoLeak?: string;
//         [key: string]: any; // To accommodate any other properties
//       };
//     }
//     // Format breaches
//     const breaches: BreachInfo[] = [];
//     if (breach_details && breach_details.breaches) {
//       Object.entries(breach_details.breaches).forEach(
//         ([source, details]: [string, any]) => {
//           breaches.push({
//             source,
//             details,
//           });
//         }
//       );
//     }

//     // Create a new window for the report
//     const reportWindow = window.open("", "_blank");

//     if (!reportWindow) {
//       if (typeof window !== "undefined" && (window as any).toast) {
//         (window as any).toast.error("Please allow pop-ups to view the report");
//       } else {
//         alert("Please allow pop-ups to view the printable report");
//       }
//       return;
//     }

//     // Print-friendly HTML content
//     const htmlContent = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <title>CyberShastra Email Report - ${email}</title>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <style>
//           /* Base styles */
//           body {
//             font-family: Arial, sans-serif;
//             line-height: 1.6;
//             color: #333;
//             margin: 0;
//             padding: 0;
//             background-color: white;
//           }

//           .container {
//             max-width: 800px;
//             margin: 0 auto;
//             padding: 20px;
//           }

//           /* Report header */
//           .report-header {
//             display: flex;
//             align-items: center;
//             border-bottom: 2px solid #3b82f6;
//             padding-bottom: 15px;
//             margin-bottom: 20px;
//           }

//           .logo {
//             font-size: 3rem;
//             color: #3b82f6;
//             margin-right: 15px;
//           }

//           .report-title {
//             margin: 0;
//             font-size: 1.8rem;
//             color: #1e3a8a;
//           }

//           .report-date {
//             color: #6b7280;
//             margin: 0;
//           }

//           /* Section styling */
//           .section {
//             margin-bottom: 30px;
//             break-inside: avoid;
//           }

//           .section-header {
//             background-color: #3b82f6;
//             color: white;
//             padding: 10px 15px;
//             border-radius: 5px 5px 0 0;
//             font-weight: bold;
//             display: flex;
//             align-items: center;
//           }

//           .section-header i {
//             margin-right: 10px;
//           }

//           .section-body {
//             border: 1px solid #e5e7eb;
//             border-top: none;
//             padding: 15px;
//             border-radius: 0 0 5px 5px;
//           }

//           /* Profile section */
//           .profile {
//             display: flex;
//             align-items: flex-start;
//           }

//           .profile-avatar {
//             width: 120px;
//             height: 120px;
//             border-radius: 10px;
//             margin-right: 20px;
//             overflow: hidden;
//             background-color: #e5e7eb;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-size: 2rem;
//             color: #9ca3af;
//           }

//           .profile-avatar img {
//             width: 100%;
//             height: 100%;
//             object-fit: cover;
//           }

//           .profile-details {
//             flex: 1;
//           }

//           .profile-grid {
//             display: grid;
//             grid-template-columns: repeat(2, 1fr);
//             gap: 15px;
//           }

//           .profile-item label {
//             display: block;
//             color: #6b7280;
//             font-size: 0.85rem;
//           }

//           .profile-item p {
//             margin: 0;
//             font-weight: 600;
//           }

//           /* Card grid layouts */
//           .card-grid {
//             display: grid;
//             grid-template-columns: repeat(3, 1fr);
//             gap: 15px;
//           }

//           .card-grid-2 {
//             display: grid;
//             grid-template-columns: repeat(2, 1fr);
//             gap: 15px;
//           }

//           .card {
//             background-color: #f9fafb;
//             border: 1px solid #e5e7eb;
//             border-radius: 5px;
//             padding: 12px;
//           }

//           .card-header {
//             display: flex;
//             justify-content: space-between;
//             margin-bottom: 8px;
//           }

//           .card-label {
//             color: #6b7280;
//           }

//           .card-icon {
//             color: #3b82f6;
//           }

//           .card-value {
//             font-weight: 600;
//           }

//           /* Detail rows */
//           .detail-row {
//             display: flex;
//             border-bottom: 1px solid #e5e7eb;
//             padding: 5px 0;
//           }

//           .detail-row:last-child {
//             border-bottom: none;
//           }

//           .detail-label {
//             width: 40%;
//             color: #6b7280;
//           }

//           .detail-value {
//             width: 60%;
//             font-weight: 500;
//           }

//           /* Breach section styling */
//           .breach-item {
//             background-color: #f9fafb;
//             border: 1px solid #e5e7eb;
//             border-radius: 5px;
//             padding: 12px;
//             margin-bottom: 15px;
//             break-inside: avoid;
//           }

//           .breach-header {
//             display: flex;
//             justify-content: space-between;
//             margin-bottom: 10px;
//           }

//           .breach-source {
//             font-weight: 600;
//           }

//           .breach-count {
//             background-color: #ef4444;
//             color: white;
//             padding: 2px 8px;
//             border-radius: 15px;
//             font-size: 0.8rem;
//           }

//           .breach-record {
//             padding-left: 10px;
//             border-left: 2px solid #ef4444;
//             margin-bottom: 10px;
//             font-size: 0.9rem;
//           }

//           .breach-record-item {
//             padding: 3px 0;
//           }

//           .breach-record-label {
//             font-weight: 500;
//             color: #4b5563;
//           }

//           /* Print-specific styles */
//           @media print {
//             body {
//               font-size: 12px;
//               color: black;
//             }

//             .container {
//               padding: 0;
//               max-width: 100%;
//             }

//             .no-print {
//               display: none !important;
//             }

//             .section {
//               page-break-inside: avoid;
//               margin-bottom: 20px;
//             }

//             .breach-count {
//               background-color: #f9fafb !important;
//               border: 1px solid #ef4444;
//               color: #ef4444;
//             }

//             .section-header {
//               background-color: #f9fafb !important;
//               color: #1e3a8a;
//               border: 1px solid #3b82f6;
//             }

//             a {
//               text-decoration: none;
//               color: black;
//             }
//           }

//           /* App icon styles */
//           .app-icon {
//             display: inline-block;
//             width: 40px;
//             height: 40px;
//             text-align: center;
//             line-height: 40px;
//             background-color: #e5e7eb;
//             border-radius: 8px;
//             margin-right: 8px;
//             margin-bottom: 8px;
//             font-size: 1.1rem;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <!-- Print button (only visible on screen) -->
//           <div class="no-print" style="text-align: right; margin-bottom: 20px;">
//             <button onclick="window.print()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">
//               Print Report
//             </button>
//           </div>

//           <!-- Report Header -->
//           <div class="report-header">
//             <div class="logo">&#9993;</div>
//             <div>
//               <h1 class="report-title">CyberShastra Email Report</h1>
//               <p class="report-date">Generated on ${formattedDate}</p>
//             </div>
//           </div>

//           <!-- Email Profile Section -->
//           <div class="section">
//             <div class="section-header">
//               <span>&#128100;</span>&nbsp;Email Profile
//             </div>
//             <div class="section-body">
//               <div class="profile">
//                 <div class="profile-avatar">
//                   ${
//                     profilePhoto
//                       ? `<img src="${profilePhoto}" alt="Profile Photo" />`
//                       : "&#128100;"
//                   }
//                 </div>
//                 <div class="profile-details">
//                   <h2>${displayName}</h2>
//                   <div class="profile-grid">
//                     <div class="profile-item">
//                       <label>Primary Email</label>
//                       <p>${email}</p>
//                     </div>
//                     ${
//                       allEmails.length > 0
//                         ? `
//                     <div class="profile-item">
//                       <label>Associated Emails</label>
//                       <p>${allEmails.join(", ")}</p>
//                     </div>
//                     `
//                         : ""
//                     }
//                     ${
//                       apps.length > 0
//                         ? `
//                     <div class="profile-item" style="grid-column: span 2;">
//                       <label>Used Applications</label>
//                       <p style="margin-top: 5px;">
//                         ${apps
//                           .map(
//                             (app) =>
//                               `<span class="app-icon" title="${app}">${app.charAt(
//                                 0
//                               )}</span>`
//                           )
//                           .join("")}
//                       </p>
//                     </div>
//                     `
//                         : ""
//                     }
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <!-- Maps Activity -->
//           ${
//             Object.keys(mapsStats).length > 0
//               ? `
//           <div class="section">
//             <div class="section-header">
//               <span>&#127757;</span>&nbsp;Maps Activity
//             </div>
//             <div class="section-body">
//               <div class="card-grid">
//                 ${Object.entries(mapsStats)
//                   .map(
//                     ([key, value]) => `
//                 <div class="card">
//                   <div class="card-label">${key}</div>
//                   <div class="card-value">${value}</div>
//                 </div>
//                 `
//                   )
//                   .join("")}
//               </div>
//             </div>
//           </div>
//           `
//               : ""
//           }

//           <!-- Data Breach Information -->
//           ${
//             breaches.length > 0
//               ? `
//           <div class="section">
//             <div class="section-header">
//               <span>&#128272;</span>&nbsp;Data Breach Information
//             </div>
//             <div class="section-body">
//               <p style="margin-top: 0; margin-bottom: 15px;">The email address <strong>${email}</strong> was found in ${
//                   breaches.length
//                 } data breach${breaches.length !== 1 ? "es" : ""}:</p>

//               ${breaches
//                 .map(
//                   (breach: any) => `
//               <div class="breach-item">
//                 <div class="breach-header">
//                   <div class="breach-source">${breach.source}</div>
//                   ${
//                     breach.numRecords > 0
//                       ? `
//                   <div class="breach-count">
//                     ${breach.numRecords} ${
//                           breach.numRecords === 1 ? "record" : "records"
//                         } found
//                   </div>
//                   `
//                       : ""
//                   }
//                 </div>
//                 ${
//                   breach.records && breach.records.length > 0
//                     ? `
//                 <div>
//                   ${breach.records
//                     .map(
//                       (record: any) => `
//                   <div class="breach-record">
//                     ${Object.entries(record)
//                       .filter(
//                         ([key, value]) => key !== "Email" || value !== email
//                       ) // Skip displaying the email we already know
//                       .map(
//                         ([key, value]: [string, any]) => `
//                     <div class="breach-record-item">
//                       <span class="breach-record-label">${key
//                         .split(/(?=[A-Z])/)
//                         .join(" ")}:</span>
//                       ${
//                         typeof value === "string" && value.startsWith("http")
//                           ? `<a href="${value}" target="_blank">${value}</a>`
//                           : String(value)
//                       }
//                     </div>
//                     `
//                       )
//                       .join("")}
//                   </div>
//                   `
//                     )
//                     .join("")}
//                 </div>
//                 `
//                     : ""
//                 }
//               </div>
//               `
//                 )
//                 .join("")}
//             </div>
//           </div>
//           `
//               : ""
//           }

//           <!-- Footer -->
//           <div style="text-align: center; font-size: 0.8rem; color: #6b7280; margin-top: 40px;">
//             <p>This report is confidential and for authorized use only.</p>
//             <p>Generated by CyberShastra Intelligence Platform</p>
//           </div>
//         </div>
//         <script>
//           // Auto focus the print button when the page loads
//           window.onload = function() {
//             const printButton = document.querySelector('button');
//             if (printButton) {
//               printButton.focus();
//             }
//           };
//         </script>
//       </body>
//       </html>
//     `;

//     // Write the HTML content to the new window
//     reportWindow.document.write(htmlContent);
//     reportWindow.document.close();

//     // Show success message
//     if (typeof window !== "undefined" && (window as any).toast) {
//       (window as any).toast.success(
//         "Report generated. Use the Print button to save as PDF."
//       );
//     }
//   } catch (error) {
//     console.error("Error generating email report:", error);

//     // Show error toast
//     if (typeof window !== "undefined" && (window as any).toast) {
//       (window as any).toast.error("Failed to generate email report");
//     }
//   }
// };

// // Update the export to include the new function
// export { showPrintableReport, showEmailPrintableReport };
