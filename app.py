from flask import Flask, jsonify, request
import random
import faker
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
fake = faker.Faker()


def randomize_data(mobile_number):
    data = {
        "mobile_number": mobile_number,
        "upi_details": [
            {
                "upiId": f"{fake.user_name()}@upi",
                "name": fake.name(),
                "pspName": random.choice(["PhonePe", "Google Pay", "Paytm"]),
                "payeeType": random.choice(["Individual", "Merchant"]),
                "bankIfsc": fake.bban(),
            },
            {
                "bankName": fake.company(),
                "branch": fake.city(),
                "address": fake.address(),
                "city": fake.city(),
                "district": fake.city(),
                "state": fake.state(),
                "contact": fake.phone_number(),
                "micr": fake.ean(length=13),
                "rtgs": random.choice([True, False]),
                "neft": random.choice([True, False]),
                "imps": random.choice([True, False]),
                "upi": random.choice([True, False]),
            },
        ],
        "identity_data": {
            "mobileNumber": fake.phone_number(),
            "personalInfo": {
                "full_name": fake.name(),
                "dob": fake.date(),
                "gender": random.choice(["Male", "Female", "Other"]),
                "total_income": fake.random_int(min=100000, max=1000000),
                "occupation": random.choice(["SALARIED", "SELF-EMPLOYED"]),
                "age": fake.random_int(min=20, max=60),
            },
        },
        "telecom_data": {
            "mobileNumber": fake.phone_number(),
            "subscriberStatus": random.choice(["CONNECTED", "DISCONNECTED"]),
            "connectionStatus": random.choice(["DELIVERED", "FAILED"]),
            "connectionType": random.choice(["prepaid", "postpaid"]),
            "serviceProvider": random.choice(["Airtel", "Jio", "Vi", "BSNL"]),
            "region": fake.city(),
            "country": "India",
            "msisdn": f"+91{fake.random_number(digits=10)}",
            "imsi": fake.random_number(digits=15),
            "isRoaming": random.choice([True, False]),
            "isPorted": random.choice([True, False]),
        },
        "breach_details": {
            "mobileNumber": fake.phone_number(),
            "breaches": {
                "LinkedIn": {
                    "infoLeak": "Email, Password",
                    "numOfResults": 2,
                    "records": [
                        {"email": fake.email(), "password": fake.password()}
                        for _ in range(2)
                    ],
                }
            },
        },
        "callerData": [
            {
                "name": fake.name(),
                "country_code": "91",
                "phone_number": mobile_number,
                "is_spam": False,
                "spam_counter": 0,
                "alternate_names": [fake.name() for _ in range(5)],
            }
        ],
    }

    # if random.random() < 0.2:
    #     return {}
    # if random.random() < 0.2:
    #     del data["upi_details"]
    # if random.random() < 0.2:
    #     del data["identity_data"]
    # if random.random() < 0.2:
    #     del data["telecom_data"]
    # if random.random() < 0.2:
    #     del data["breach_details"]

    return data


@app.route("/api/mobile_osint", methods=["POST"])
def get_data():
    mobile_number = request.json.get("mobileNumber")
    if not mobile_number:
        return jsonify({"error": "Mobile number not provided"}), 400
    return jsonify(
        {
            "mobile_number": "9999002426",
            "upi_details": [
                {
                    "upiId": "9999002426@ptsbi",
                    "name": "SUMIT  SHARMA",
                    "pspName": "Paytm",
                    "payeeType": "PERSON",
                    "bankIfsc": "UTIB0000102",
                },
                {
                    "bankName": "Axis Bank",
                    "branch": "BANASHANKARI (BAN)",
                    "address": "NO 369,13TH CROSS, 30TH MAIN RD, C.T BED EXTN  BANASHANKARI II STAGE",
                    "city": "BANGALORE",
                    "district": "BANGALORE URBAN",
                    "state": "KARNATAKA",
                    "contact": "",
                    "micr": "560211005",
                    "rtgs": True,
                    "neft": True,
                    "imps": True,
                    "upi": True,
                },
            ],
            "identity_data": {
                "mobileNumber": "9999002426",
                "personalInfo": {
                    "full_name": "SHARMA SUMIT ",
                    "dob": "1988-01-15",
                    "gender": "Male",
                    "total_income": "150000000",
                    "occupation": "SALARIED",
                    "age": "37",
                },
                "phoneInfo": [
                    {
                        "reported_date": "2025-01-31",
                        "type_code": "H",
                        "number": "04350182",
                    },
                    {
                        "reported_date": "2025-02-15",
                        "type_code": "H",
                        "number": "981103441",
                    },
                    {
                        "reported_date": "2025-01-31",
                        "type_code": "M",
                        "number": "9999002426",
                    },
                    {
                        "reported_date": "2024-06-30",
                        "type_code": "M",
                        "number": "9582244446",
                    },
                    {
                        "reported_date": "2025-01-31",
                        "type_code": "T",
                        "number": "06756000",
                    },
                    {
                        "reported_date": "2025-01-28",
                        "type_code": "T",
                        "number": "01246756748",
                    },
                ],
                "addressInfo": [
                    {
                        "address": "15 SECOND FLOOR  BIRBAL ROAD  POST OFFICE JANGPURA EXTENSION JUNGPURA S O SOUTH DELHI DELHI",
                        "state": "DL",
                        "type": "Primary",
                        "postal": "110014",
                        "reported_date": "2025-01-15",
                    },
                    {
                        "address": "15-2ND-FLOOR BIRBAL ROAD  JANG PURA EXTENTION NEW DELHI",
                        "state": "DL",
                        "type": "Owns,Primary",
                        "postal": "110014",
                        "reported_date": "2024-12-22",
                    },
                    {
                        "address": "TATA CONSULTANCY SERVICES BUILDING  NO-6 3RD FLOOR  TOWER-C CYBER CITY  GURGAON",
                        "state": "HR",
                        "type": "Office",
                        "postal": "122002",
                        "reported_date": "2024-09-30",
                    },
                    {
                        "address": "HNO-15 SECOND FLOOR  BIRBAL ROAD  POST OFFICE JANGPURA EXTN  NEW DELHI",
                        "state": "DL",
                        "type": "Primary",
                        "postal": "110014",
                        "reported_date": "2024-09-30",
                    },
                    {
                        "address": "15 BIRBAL ROAD  2ND FLOOR  JANGPURA EXTN  NEW DELHI DELHI",
                        "state": "DL",
                        "type": "Permanent",
                        "postal": "110014",
                        "reported_date": "2024-09-02",
                    },
                ],
                "emailInfo": [
                    {
                        "reported_date": "2024-10-15",
                        "email_address": "SUMIT_MERC@YAHOO.CO.IN",
                    }
                ],
                "identityInfo": {
                    "pan_number": [{"id_number": "BLDPS7788C"}],
                    "passport_number": [{"id_number": "J5267419"}],
                    "driving_license": [{"id_number": "320100177064"}],
                    "voter_id": [{"id_number": "UJE0807321"}],
                    "aadhaar_number": [],
                    "ration_card": [],
                    "other_id": [],
                },
            },
            "telecom_data": {
                "mobileNumber": "9999002426",
                "subscriberStatus": "CONNECTED",
                "connectionStatus": "DELIVERED",
                "connectionType": "prepaid",
                "serviceProvider": "Airtel",
                "region": "Delhi",
                "country": "India",
                "msisdn": "+919999002426",
                "imsi": "404109999002426",
                "isRoaming": False,
                "isPorted": True,
            },
            "uan_number": "100369157325",
            "employment_history": [
                {
                    "name": "SUMIT SHARMA",
                    "guardian_name": "",
                    "establishment_name": "TATA CONSULTANCY SERVICES LIMITED",
                    "member_id": "MHBAN00484750000231896",
                    "date_of_joining": None,
                    "date_of_exit": None,
                    "last_pf_submitted": None,
                    "wage_month": "",
                }
            ],
            "breach_details": {
                "mobileNumber": "9999002426",
                "info": "No results found.",
                "details": "<em>No results were found for your search. Either there are none, or all the words in your query are too common to be checked. Try changing your query.</em>",
            },
            "caller_data": [
                {
                    "name": "Sumit Sir",
                    "country_code": "91",
                    "phone_number": "9999002426",
                    "is_spam": False,
                    "spam_counter": 0,
                    "alternate_names": ["Sumit Oxford", "Sumit Sharma"],
                }
            ],
            "fb_data": {},
        }
    )


@app.route("/api/breach_lookup", methods=["POST"])
def breach_lookup():
    if request.method == "POST":
        mobile_number = request.json.get("mobile_number")
        data = jsonify(
            {
                "mobileNumber": "+1234567890",
                "breaches": [
                    {
                        "company": "ExampleCorp",
                        "records": [
                            {
                                "email": "user@example.com",
                                "password": "hashed_password",
                                "date": "2022-01-01",
                            }
                        ],
                    }
                ],
            }
        )
        return data


@app.route("/api/lookup_rc", methods=["POST"])
def vechicle_details_rc():
    if request.method == "POST":
        rc_number = request.json.get("rc_number")
        data = {
            "Owner": "KUSH KUMAR",
            "Manufacturer": "MARUTI SUZUKI INDIA LTD",
            "Model": "ASTAR VXI",
            "Colour": "P.M.A.WHITE",
            "Engine No": "K10BN1046862",
            "Chassis No": "MA3EPDE1S00146692",
            "RC Expiry Date": "25-Oct-2029",
            "Registration Authority": "ALIGARH RTO",
            "Registration Date": "26-Oct-2009",
            "Present Address": "NAVMAAN COLONY JALALPUR NADA PULL BY PASS KHAIR ROAD ALIGARH Aligarh Uttar Pradesh 202001",
            "Permanent Address": "NAVMAAN COLONY JALALPUR NADA PULL BY PASS KHAIR ROAD ALIGARH Aligarh Uttar Pradesh 202001",
            "Insurance Company": "Tata AIG General Insurance Co. Ltd.",
            "Insurance Upto": "14-Nov-2025",
            "Blacklist Status": "False",
            "Vehicle Type": "Motor Car",
        }
        return jsonify(data)


# @app.route("/api/<path:endpoint>", methods=["POST"])
# def mock_api(endpoint):
#     if not request.is_json:
#         return jsonify({"error": "Invalid request format"}), 400
#     json_data = {
#         "mobileNumber": "+1234567890",
#         "breaches": [
#             {
#                 "company": "ExampleCorp",
#                 "records": [
#                     {
#                         "email": "user@example.com",
#                         "password": "hashed_password",
#                         "date": "2022-01-01",
#                     }
#                 ],
#             }
#         ],
#     }
#     return jsonify(json_data)


@app.route("/api/lookup_aadhar_to_pan", methods=["POST"])
def pan_data():
    if request.method == "POST":
        aadhaar = request.json.get("aadhaar")
        data = {"PAN Number": "FGBPD8768N"}
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)
