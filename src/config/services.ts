export const emailServices = [
  {
    id: "email_osint",
    title: "Email Intelligence",
    subtitle: "Email Address",
    desc: "This feature allows you to leverage OSINT against the provided email address, check its breached data and Google account details.",
    credits: 4,
    fieldname: "email",
    endpoint: "/email_osint",
    thumbnail:
      "https://storagevcl.blob.core.windows.net/images/Breach%20Data.png",
  },
  // {
  //   id: "breach_lookup",
  //   title: "Data Breach Lookup",
  //   subtitle: "Email Address",
  //   desc: "This will help you to identify any possible data leaks of the provided email address from a repository of 1000%20 data leaks and their databases. It can help to create a strong identity profile of the user",
  //   credits: 0,
  //   fieldname: "email",
  //   endpoint: "/breach_lookup_by_email",
  //   thumbnail:
  //     "https://storagevcl.blob.core.windows.net/images/Breach%20Data.png",
  // },
];

export const phoneServices = [
  {
    id: "mobile_osint",
    title: "Mobile Intelligence",
    subtitle: "Phone Number",
    desc: "The most comprehensive reporting feature, an all in one solution with a complete detailed mobile report. From social accounts if found, to identity including linked PAN Details, bank details, alternative names and many other relevant data.",
    credits: 50,
    fieldname: "mobileNumber",
    endpoint: "/mobile_osint",
    thumbnail:
      "https://storagevcl.blob.core.windows.net/images/cybershastra%20images.png",
  },
  {
    id: "teleco_lookup",
    title: "Telecom Details",
    subtitle: "Phone Number",
    desc: "This feature will allow you to fetch IMSI details, MCC, MNC, porting information and other relevant details of the provided mobile number.",
    credits: 8,
    fieldname: "mobileNumber",
    endpoint: "/teleco_lookup",
    thumbnail:
      "https://storagevcl.blob.core.windows.net/images/Operator%20Details.png",
  },
  {
    id: "mobile_upi",
    title: "UPI/VPA Accounts",
    subtitle: "Phone Number",
    desc: "This feature will help you to provide the associated UPI accounts of a phone number along with the bank IFSC Code and it’s details, helping you to gather financial intel.",
    credits: 4,
    fieldname: "mobileNumber",
    endpoint: "/mobile_upi",
    thumbnail:
      "https://storagevcl.blob.core.windows.net/images/UPI_VPA%20Accounts.png",
  },
  {
    id: "breach_lookup",
    title: "Breach Lookup",
    subtitle: "Phone Number",
    desc: "This will help you to identify any possible data leaks of the provided mobile number from a repository of 1000%20 data leaks and their databases. It can help to create a strong identity profile of the user.",
    credits: 2,
    fieldname: "mobileNumber",
    endpoint: "/breach_lookup",
    thumbnail:
      "https://storagevcl.blob.core.windows.net/images/Breach%20Data.png",
  },
  {
    id: "mobile_identity",
    title: "Identity Lookup",
    subtitle: "Phone Number",
    desc: "Use this function to identify DOB, gender, PAN Number, email account, identity cards, full names and other relevant details if found.",
    credits: 10,
    fieldname: "mobileNumber",
    endpoint: "/mobile_identity",
    thumbnail:
      "https://storagevcl.blob.core.windows.net/images/Identity%20Lookup.png",
  },
  {
    id: "lookup_imei",
    title: "IMEI Second Number",
    subtitle: "IMEI Number",
    desc: "This feature allows you to identify the second IMEI Number from the first IMEI number using Luhn’s algorithm.",
    credits: 0,
    fieldname: "imeiNumber",
    endpoint: "/lookup_imei",
    thumbnail:
      "https://storagevcl.blob.core.windows.net/images/IMEI%20Number.png",
  },
];

export const vehicleServices = [
  {
    id: "vehicle_details",
    title: "Vehicle Details by RC",
    subtitle: "RC Number",
    desc: "This feature will help to identify the owner details, address, identity, and insurance number accordingly.",
    credits: 4,
    fieldname: "rcNumber",
    endpoint: "/lookup_rc",
    thumbnail:
      "https://storagevcl.blob.core.windows.net/images/Vehicle%20details%20by%20RC.png",
  },
  {
    id: "chassis_details",
    title: "RC to CHASSIS",
    subtitle: "RC Number",
    desc: "Use this feature for identifying the original Chassis number from the given vehicle number helping to establish the real identity of the vehicle.",
    credits: 3,
    fieldname: "rcNumber",
    endpoint: "/lookup_rc_to_chasis",
    thumbnail:
      "https://storagevcl.blob.core.windows.net/images/Vehicle%20chassis%20by%20rc.png",
  },
  {
    id: "fastag_details",
    title: "RC to FASTAG Details",
    subtitle: "FASTag ID",
    desc: "Use this feature if you want to check the issuer of the fastag associated with the given vehicle number. ",
    credits: 6,
    fieldname: "fastagNumber",
    endpoint: "/lookup_fastag",
    thumbnail:
      "https://storagevcl.blob.core.windows.net/images/FasTag%20details.png",
  },
  {
    id: "lookup_chassis",
    title: "Chassis Details",
    subtitle: "Chassis Number",
    desc: "Use this feature for identifying the original vehicle number from the given chassis number helping to establish the real identity of the vehicle.",
    credits: 5,
    fieldname: "chassisNumber",
    endpoint: "/lookup_chassis",
    thumbnail:
      "https://storagevcl.blob.core.windows.net/images/Chassis%20details.png",
  },
];

export const personalServices = [
  {
    id: "lookup_pan_details",
    title: "PAN Details",
    subtitle: "PAN Number",
    desc: "The function provides comprehensive information associated with a given PAN number. The output includes the individual’s name, gender, date of birth, Aadhaar number, linked Aadhaar status, Director Identification Number and associated companies. This is useful for identity verification, KYC processes, and financial applications.",
    credits: 8,
    fieldname: "panNumber",
    endpoint: "/lookup_pan_details",
    thumbnail:
      "https://storagevcl.blob.core.windows.net/images/PAN%20Details.png",
  },
  {
    id: "lookup_gst_details",
    title: "GST Details",
    subtitle: "GST Number",
    desc: "This function helps in identifying all relevant data from the GST Number.",
    credits: 10,
    fieldname: "gstNumber",
    endpoint: "/lookup_gst_details",
    thumbnail:
      "https://storagevcl.blob.core.windows.net/images/GST%20Details.png",
  },
  {
    id: "lookup_aadhar_to_pan",
    title: "Aadhar to PAN",
    subtitle: "Aadhar Number",
    desc: "This retrieves the PAN number linked to a given Aadhaar number. It is useful for KYC verification, tax compliance, and identity authentication in financial applications.",
    credits: 21,
    fieldname: "aadharNumber",
    endpoint: "/lookup_aadhar_to_pan",
    thumbnail:
      "https://storagevcl.blob.core.windows.net/images/Aadhar%20to%20Pan.png",
  },
  {
    id: "lookup_tan_number",
    title: "TAN Details",
    subtitle: "TAN Number",
    desc: "Fetch company relevant data from their TAX Deduction and collection account number.",
    credits: 5,
    fieldname: "tanNumber",
    endpoint: "/lookup_tan_number",
    thumbnail:
      "https://storagevcl.blob.core.windows.net/images/TAN%20Number%20details.png",
  },
];

export const allServices = {
  email: {
    services: emailServices
  },
  phone: {
    services: phoneServices
  },
  vehicle: {
    services: vehicleServices
  },
  personal: {
    services: personalServices
  }
};

export default allServices;
