export const startupSchemes = [
  {
    id: 1,
    title: "Startup India Seed Fund",
    provider: "DPIIT",
    amount: "Up to ₹50 Lakhs",
    minFunding: 0,
    maxFunding: 50,
    deadline: "Dec 2026",
    type: "Seed Fund",
    stage: ["Idea", "Prototype / MVP"],
    sector: ["AI / ML", "HealthTech", "SaaS"],
    location: "PAN India",
    eligibility: "DPIIT startups",
    description: "Financial assistance to startups for proof of concept, prototype development, and product trials.",
    tags: ["Student startup", "DeepTech"],
    website: "https://seedfund.startupindia.gov.in",
    applicationMode: "Online via Startup India Portal",
    selectionProcess: "Initial Screening → Incubator Evaluation → Pitch Session → Final Approval by Incubator Seed Management Committee",
    renewalPolicy: "Fund disbursed in milestone-based tranches. Continuation depends on meeting milestone goals.",
    benefits: [
      "Up to ₹20 Lakhs as grant for validation of Proof of Concept",
      "Up to ₹50 Lakhs of investment for market entry, commercialization, or scaling",
      "Access to incubator ecosystem and mentor network",
      "No equity dilution for the grant component"
    ],
    documentsRequired: [
      "DPIIT Recognition Certificate",
      "Pitch Deck / Business Plan",
      "Incorporation Certificate",
      "Founders' KYC (Aadhaar/PAN)",
      "Financial projections for 3 years"
    ],
    importantDates: {
      applicationStart: "Ongoing",
      applicationEnd: "31 Dec 2026",
      shortlistAnnouncement: "Within 45 days of application",
      disbursement: "Milestone based"
    },
    contact: {
      email: "dipp-startups@nic.in",
      helpline: "1800-115-565"
    }
  },
  {
    id: 2,
    title: "Women in Tech Grant",
    provider: "Ministry of Women & Child Development",
    amount: "₹10 Lakhs - ₹20 Lakhs",
    minFunding: 10,
    maxFunding: 20,
    deadline: "Oct 2026",
    type: "Grant",
    stage: ["Prototype / MVP", "Early Revenue"],
    sector: ["AI / ML", "EdTech", "FinTech"],
    location: "Karnataka",
    eligibility: "Women-led startups only (min 51% equity)",
    description: "Empowering women entrepreneurs in the technology sector.",
    tags: ["Women-led"],
    website: "https://wcd.nic.in",
    applicationMode: "Online submission of pitch deck and financials",
    selectionProcess: "Technical Review → Financial Feasibility Check → Interview with Expert Panel → Grant Approval",
    benefits: [
      "₹10 Lakhs to ₹20 Lakhs non-dilutive grant",
      "Dedicated 6-month accelerator program",
      "1-on-1 mentorship from industry leaders",
      "Networking opportunities with global VCs"
    ],
    documentsRequired: [
      "Company Registration documents showing shareholding",
      "Product Demo / Video",
      "CA Certified Financial Statements",
      "Aadhaar Card of founders",
      "Market Research Report"
    ],
    importantDates: {
      applicationStart: "1 Jun 2026",
      applicationEnd: "15 Oct 2026",
      shortlistAnnouncement: "Nov 2026",
      disbursement: "Jan 2027"
    },
    contact: {
      email: "womentech@wcd.nic.in",
      helpline: "011-2338-6227"
    }
  },
  {
    id: 3,
    title: "Agri-Tech Innovation Challenge",
    provider: "Ministry of Agriculture",
    amount: "₹20 Lakhs - ₹1Cr",
    minFunding: 20,
    maxFunding: 100,
    deadline: "Nov 2026",
    type: "Challenge",
    stage: ["Early Revenue", "Growth"],
    sector: ["AgriTech", "CleanTech"],
    location: "Maharashtra",
    eligibility: "Registered Pvt Ltd or LLP",
    description: "Innovation challenge for agricultural technologies and sustainable farming.",
    tags: ["Rural startup", "Sustainability / Climate"],
    website: "https://agricoop.nic.in",
    applicationMode: "Online via Agri-India Hackathon portal",
    selectionProcess: "Idea Pitch → Prototype Demonstration → Field Trial Validation → Final Jury Selection",
    benefits: [
      "Funding up to ₹1 Crore",
      "Access to ICAR research facilities",
      "Pilot deployment with farmer producer organizations (FPOs)",
      "Regulatory fast-tracking for agritech products"
    ],
    documentsRequired: [
      "Detailed Project Report (DPR)",
      "Patent / IP documents (if any)",
      "Previous pilot testing results",
      "Company Registration Certificate",
      "Audited Financials"
    ],
    importantDates: {
      applicationStart: "1 Aug 2026",
      applicationEnd: "30 Nov 2026",
      shortlistAnnouncement: "Jan 2027",
      disbursement: "Mar 2027"
    },
    contact: {
      email: "agritech-challenge@gov.in",
      helpline: "011-2338-3370"
    }
  },
  {
    id: 4,
    title: "HealthTech Scale-Up Fund",
    provider: "Ministry of Health",
    amount: "Above ₹1Cr",
    minFunding: 100,
    maxFunding: 9999,
    deadline: "Jan 2027",
    type: "Scale-up Fund",
    stage: ["Early Revenue", "Growth"],
    sector: ["HealthTech"],
    location: "PAN India",
    eligibility: "Minimum ₹10L ARR",
    description: "Scale-up capital for health technology startups with proven clinical outcomes.",
    tags: ["DeepTech"],
    website: "https://mohfw.gov.in",
    applicationMode: "Application with Clinical Trial Data",
    selectionProcess: "Clinical Validation Review → Commercial Diligence → Medical Board Interview → Funding Approval",
    benefits: [
      "Scale-up capital above ₹1 Crore (Equity/Debt hybrid)",
      "Fast-track CDSCO approvals",
      "Access to public health networks for deployment",
      "International market expansion support"
    ],
    documentsRequired: [
      "Clinical Trial / Validation Reports",
      "Audited Financials showing ₹10L+ ARR",
      "ISO/CE Certifications (if applicable)",
      "Detailed Scale-up Plan",
      "Founders' Background"
    ],
    importantDates: {
      applicationStart: "1 Oct 2026",
      applicationEnd: "15 Jan 2027",
      shortlistAnnouncement: "Mar 2027",
      disbursement: "May 2027"
    },
    contact: {
      email: "healthtechfund@mohfw.gov.in",
      helpline: "011-2306-1561"
    }
  },
  {
    id: 5,
    title: "Student Startup Fellowship",
    provider: "Ministry of Education",
    amount: "Up to ₹5 Lakhs",
    minFunding: 0,
    maxFunding: 5,
    deadline: "Sep 2026",
    type: "Fellowship",
    stage: ["Idea", "Prototype / MVP"],
    sector: ["EdTech", "AI / ML", "SaaS", "FinTech"],
    location: "Delhi",
    eligibility: "College students",
    description: "Fellowship to encourage entrepreneurship among students.",
    tags: ["Student startup"],
    website: "https://mic.gov.in",
    applicationMode: "Institute-level nomination",
    selectionProcess: "University Screening → Regional Pitch → National Level Interview",
    benefits: [
      "Monthly fellowship of ₹25,000 for 1 year",
      "Up to ₹2 Lakhs prototype development grant",
      "Academic credits for startup work",
      "Mentorship from alumni network"
    ],
    documentsRequired: [
      "Valid College ID Card",
      "Letter of Recommendation from College HOD",
      "Business Idea Presentation",
      "Student Aadhaar/PAN"
    ],
    importantDates: {
      applicationStart: "1 Jul 2026",
      applicationEnd: "30 Sep 2026",
      shortlistAnnouncement: "Nov 2026",
      disbursement: "Jan 2027"
    },
    contact: {
      email: "fellowship@mic.gov.in",
      helpline: "011-2958-1000"
    }
  },
  {
    id: 6,
    title: "Clean Energy Grant",
    provider: "Ministry of New and Renewable Energy",
    amount: "₹50 Lakhs - ₹2Cr",
    minFunding: 50,
    maxFunding: 200,
    deadline: "Mar 2027",
    type: "Grant",
    stage: ["Prototype / MVP", "Early Revenue", "Growth"],
    sector: ["CleanTech"],
    location: "Gujarat",
    eligibility: "Sustainability focus",
    description: "Grants for clean energy and climate tech innovations.",
    tags: ["Sustainability / Climate"],
    website: "https://mnre.gov.in",
    applicationMode: "Detailed Project Report (DPR) Submission",
    selectionProcess: "Technical Feasibility Study → Environmental Impact Assessment → Financial Review → Approval",
    benefits: [
      "Grant funding up to ₹2 Crores",
      "Subsidized land in Green Energy Parks",
      "Waiver of specific state taxes for 3 years",
      "Carbon credit consultation"
    ],
    documentsRequired: [
      "Environmental Impact Assessment Report",
      "DPR with technical schematics",
      "Company Registration",
      "Financial Projections"
    ],
    importantDates: {
      applicationStart: "1 Dec 2026",
      applicationEnd: "31 Mar 2027",
      shortlistAnnouncement: "May 2027",
      disbursement: "Jul 2027"
    },
    contact: {
      email: "cleantech@mnre.gov.in",
      helpline: "1800-233-4455"
    }
  },
  {
    id: 7,
    title: "FinTech Innovation Award",
    provider: "RBI Innovation Hub",
    amount: "₹5 Lakhs - ₹20 Lakhs",
    minFunding: 5,
    maxFunding: 20,
    deadline: "Aug 2026",
    type: "Award",
    stage: ["Idea", "Prototype / MVP", "Early Revenue"],
    sector: ["FinTech"],
    location: "Maharashtra",
    eligibility: "Not Registered / Pvt Ltd",
    description: "Awards for innovative financial technologies promoting financial inclusion.",
    tags: [],
    website: "https://rbihub.in",
    applicationMode: "Online Form with Demo Video",
    selectionProcess: "Initial Screening → Demo Day Pitch → Final Selection by RBI Panel",
    benefits: [
      "Cash award up to ₹20 Lakhs",
      "Fast-track to RBI Regulatory Sandbox",
      "Mentorship from banking executives",
      "Cloud credits worth $10,000"
    ],
    documentsRequired: [
      "Product Demo Link",
      "Compliance/Security Architecture Document",
      "Founder Profiles",
      "Incorporation Docs (if registered)"
    ],
    importantDates: {
      applicationStart: "1 May 2026",
      applicationEnd: "15 Aug 2026",
      shortlistAnnouncement: "Sep 2026",
      disbursement: "Oct 2026"
    },
    contact: {
      email: "awards@rbihub.in",
      helpline: "080-4615-5555"
    }
  },
  {
    id: 8,
    title: "National AI Research Grant",
    provider: "MeitY",
    amount: "₹20 Lakhs - ₹50 Lakhs",
    minFunding: 20,
    maxFunding: 50,
    deadline: "Feb 2027",
    type: "Grant",
    stage: ["Idea", "Prototype / MVP", "Early Revenue", "Growth"],
    sector: ["AI / ML", "DeepTech"],
    location: "PAN India",
    eligibility: "DPIIT or MSME",
    description: "Research grants for artificial intelligence and machine learning applications in governance.",
    tags: ["DeepTech", "Student startup"],
    website: "https://indiaai.gov.in",
    applicationMode: "Online Proposal Submission",
    selectionProcess: "Peer Review → Technical Evaluation → Committee Approval",
    benefits: [
      "Grant up to ₹50 Lakhs",
      "Access to National AI Computing Grid",
      "Collaboration with government ministries for pilot",
      "IP filing assistance"
    ],
    documentsRequired: [
      "AI Architecture & Data Privacy Plan",
      "DPIIT/MSME Registration",
      "Previous Research Papers/Patents (if any)",
      "Project Timeline and Budget"
    ],
    importantDates: {
      applicationStart: "1 Nov 2026",
      applicationEnd: "28 Feb 2027",
      shortlistAnnouncement: "Apr 2027",
      disbursement: "Jun 2027"
    },
    contact: {
      email: "aigrant@meity.gov.in",
      helpline: "011-2430-1948"
    }
  }
];
