const KEY = "form_ease_applications";

const mockApplications = [
  {
    id: "APP-AGR-8832",
    applicantName: "Harpreet Singh",
    phone: "+91 98765 43210",
    state: "Punjab",
    schemeName: "PM Kisan Samman Nidhi",
    schemeType: "Agriculture",
    date: "2026-05-20",
    status: "pending",
    details: {
      farmerName: "Harpreet Singh",
      aadhaar: "1234 5678 9012",
      phone: "+91 98765 43210",
      state: "Punjab",
      district: "Ludhiana",
      tehsil: "Samrala",
      village: "Machhiwara",
      landSize: "2.5",
      khasraNo: "342/1",
      irrigationType: "Tube Well",
      cropType: "Wheat/Rice",
      bankName: "Punjab National Bank",
      accountNo: "309281039281",
      ifsc: "PUNB0039200"
    }
  },
  {
    id: "APP-SCH-9921",
    applicantName: "Meera Joshi",
    phone: "+91 88998 89988",
    state: "Maharashtra",
    schemeName: "Post Matric Scholarship Scheme",
    schemeType: "Scholarship",
    date: "2026-05-22",
    status: "resolved",
    details: {
      fullName: "Meera Joshi",
      email: "meera.joshi@gmail.com",
      phone: "+91 88998 89988",
      dob: "2004-06-15",
      gender: "Female",
      aadhaar: "8765 4321 0987",
      address: "12, Shanti Kunj",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      institution: "VJTI Mumbai",
      course: "B.Tech Electrical",
      yearOfStudy: "2nd Year",
      cgpa: "9.2",
      class12Percent: "94.8%",
      familyIncome: "₹1 - ₹3 LPA",
      bankName: "State Bank of India",
      accountNo: "100293029382",
      ifsc: "SBIN0000001",
      essay: "I aspire to build innovative renewable energy systems for rural electrification. This scholarship will cover my tuition and books, enabling me to focus on my projects."
    }
  },
  {
    id: "APP-STP-1287",
    applicantName: "Rohan Varma",
    phone: "+91 97766 55443",
    state: "Delhi",
    schemeName: "Startup India Seed Fund",
    schemeType: "Startup",
    date: "2026-05-18",
    status: "rejected",
    details: {
      founderName: "Rohan Varma",
      email: "rohan@nextgenai.co",
      phone: "+91 97766 55443",
      startupName: "NextGen AI Solutions",
      registrationNumber: "U72900DL2024PTC392810",
      dpiitNumber: "DIPP99810",
      address: "B-4, Okhla Phase 3",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110020",
      sector: "AI / ML",
      stage: "Prototype / MVP",
      incorporationDate: "2024-02-12",
      teamSize: "6-15",
      arr: "Below ₹10 Lakhs",
      fundingRaised: "Bootstrapped",
      bankName: "HDFC Bank",
      accountNo: "50200088192831",
      ifsc: "HDFC0000088",
      pitch: "NextGen AI Solutions builds conversational agents for local Indian languages, enabling small businesses to automate support."
    }
  },
  {
    id: "APP-WMN-3301",
    applicantName: "Anita Desai",
    phone: "+91 91223 34455",
    state: "Maharashtra",
    schemeName: "Mahila Co-operative Scheme",
    schemeType: "Women Programs",
    date: "2026-05-21",
    status: "pending",
    details: {
      fullName: "Anita Desai",
      aadhaar: "4532 9988 1234",
      phone: "+91 91223 34455",
      email: "anita.desai@gmail.com",
      dob: "1990-08-24",
      maritalStatus: "Married",
      education: "12th Pass",
      address: "Plot 42, Shiv Nagar",
      city: "Nagpur",
      state: "Maharashtra",
      bankName: "Bank of India",
      accountNo: "4829102930219",
      ifsc: "BKID0004820",
      briefNeed: "Looking to establish a small food packaging and catering unit to support single mother entrepreneurs in our neighborhood."
    }
  },
  {
    id: "APP-TND-7743",
    applicantName: "Apex Solar Solutions",
    phone: "+91 22883 99201",
    state: "Gujarat",
    schemeName: "Rural Solar Microgrid Installation Tender",
    schemeType: "Tenders",
    date: "2026-05-19",
    status: "resolved",
    details: {
      companyName: "Apex Solar Solutions Pvt. Ltd.",
      registrationNo: "U74999GJ2015PTC123456",
      gst: "24AAPCS1234A1ZC",
      pan: "AAPCS1234A",
      contactPerson: "Rahul Mehta",
      designation: "Director",
      phone: "+91 22883 99201",
      email: "tender@apexsolar.com",
      address: "102, GIDC Electronic Estate",
      city: "Gandhinagar",
      stateField: "Gujarat",
      annualTurnover: "₹1,50,00,000",
      yearsExperience: "8",
      similarWorks: "1. Installed 50kW solar system at Kutch Panchayat, 2023\n2. 100kW rooftop installation at Gujarat University, 2024",
      bankName: "ICICI Bank",
      accountNo: "001205001293",
      ifsc: "ICIC0000012"
    }
  },
  {
    id: "APP-RES-5582",
    applicantName: "Dr. Ananya Rao",
    phone: "+91 94481 22391",
    state: "Karnataka",
    schemeName: "DST Core Research Grant",
    schemeType: "Research Grants",
    date: "2026-05-17",
    status: "pending",
    details: {
      investigatorName: "Dr. Ananya Rao",
      designation: "Associate Professor",
      department: "Dept. of Nanotechnology",
      institution: "IISc Bangalore",
      email: "ananya.rao@iisc.ac.in",
      phone: "+91 94481 22391",
      projectTitle: "Graphene-based Membrane Filters for Heavy Metal Extraction in Rural Water Systems",
      researchArea: "Engineering",
      duration: "3 Years",
      budget: "35,00,000",
      summary: "This project aims to develop high-throughput, low-cost water purification filters utilising graphene oxide membranes. The research will target fluoride and arsenic mitigation in rural Karnataka.",
      bankName: "Canara Bank",
      accountNo: "0684101092813",
      ifsc: "CNRB0000684",
      state: "Karnataka"
    }
  },
  {
    id: "APP-AGR-2291",
    applicantName: "Baldev Singh",
    phone: "+91 98112 23344",
    state: "Punjab",
    schemeName: "Agricultural Machinery Subsidy Scheme",
    schemeType: "Agriculture",
    date: "2026-05-23",
    status: "pending",
    details: {
      farmerName: "Baldev Singh",
      aadhaar: "9876 5432 1098",
      phone: "+91 98112 23344",
      state: "Punjab",
      district: "Amritsar",
      tehsil: "Ajnala",
      village: "Chogawan",
      landSize: "4.2",
      khasraNo: "125/4",
      irrigationType: "Canal",
      cropType: "Wheat/Rice",
      bankName: "State Bank of India",
      accountNo: "338829103982",
      ifsc: "SBIN0001092"
    }
  },
  {
    id: "APP-SCH-7722",
    applicantName: "Rajesh Kumar",
    phone: "+91 99001 12233",
    state: "Delhi",
    schemeName: "Pragati Scholarship for Girls & Differently Abled",
    schemeType: "Scholarship",
    date: "2026-05-15",
    status: "pending",
    details: {
      fullName: "Rajesh Kumar",
      email: "rajesh.k@gmail.com",
      phone: "+91 99001 12233",
      dob: "2005-11-02",
      gender: "Male",
      aadhaar: "6655 4433 2211",
      address: "H-42, Sector 15",
      city: "Rohini",
      state: "Delhi",
      pincode: "110089",
      institution: "Delhi Technological University",
      course: "B.Tech Mechanical",
      yearOfStudy: "1st Year",
      cgpa: "8.8",
      class12Percent: "91.2%",
      familyIncome: "₹3 - ₹6 LPA",
      bankName: "Punjab National Bank",
      accountNo: "4029102930129",
      ifsc: "PUNB0040200",
      essay: "I am passionate about robotics and electric vehicles. Coming from a modest family background, this scholarship will significantly reduce my father's financial burden."
    }
  }
];

export const getApplications = () => {
  const data = localStorage.getItem(KEY);
  if (!data) {
    localStorage.setItem(KEY, JSON.stringify(mockApplications));
    return mockApplications;
  }
  return JSON.parse(data);
};

export const getApplicationsByLocation = (location) => {
  const list = getApplications();
  if (!location || location === "All India") {
    return list;
  }
  return list.filter(app => {
    const stateVal = app.state || app.details?.state || app.details?.stateField || "";
    return stateVal.toLowerCase() === location.toLowerCase();
  });
};

export const submitApplication = (app) => {
  const list = getApplications();
  const stateVal = app.state || app.details?.state || app.details?.stateField || "Delhi";
  const newApp = {
    ...app,
    state: stateVal,
    date: app.date || new Date().toISOString().split("T")[0]
  };
  list.unshift(newApp);
  localStorage.setItem(KEY, JSON.stringify(list));
  return newApp;
};

export const updateApplicationStatus = (appId, newStatus) => {
  const list = getApplications();
  const index = list.findIndex(app => app.id === appId);
  if (index !== -1) {
    list[index].status = newStatus;
    localStorage.setItem(KEY, JSON.stringify(list));
    return list[index];
  }
  return null;
};
