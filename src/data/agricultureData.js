export const agricultureSchemes = [
  {
    id: 1,
    title: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    provider: "Ministry of Agriculture & Farmers Welfare",
    amount: "₹6,000 per year",
    deadline: "Open All Year",
    type: "Financial Support",
    farmerType: "Small & Marginal",
    landSize: "1-2 hectares",
    state: "General",
    eligibility: "Landholding farmer families with cultivable land up to 2 hectares.",
    description: "Direct income support of ₹6,000 per annum to all landholding farmer families in three equal installments.",
    tags: ["Income Support", "Govt Scheme", "Direct Benefit"],
    website: "https://pmkisan.gov.in",
    applicationMode: "Online via PM-KISAN portal or CSCs",
    selectionProcess: "Aadhaar e-KYC → Land Record Verification by Patwari → State Govt Approval → Direct Bank Transfer",
    renewalPolicy: "Automatic renewal subject to active Aadhaar-seeded bank account and unchanged land records.",
    benefits: [
      "₹6,000 annual income support",
      "Paid in 3 equal installments of ₹2,000 each",
      "Direct transfer to Aadhaar-seeded bank account",
      "Financial buffer for procurement of seeds/fertilizers"
    ],
    documentsRequired: [
      "Aadhaar Card",
      "Land Ownership Document (Khatauni)",
      "Bank Account details (Aadhaar linked)",
      "Passport Size Photograph",
      "Active Mobile Number"
    ],
    importantDates: {
      applicationStart: "Ongoing",
      applicationEnd: "No deadline",
      shortlistAnnouncement: "Rolling basis",
      disbursement: "Tri-annual (Apr-Jul, Aug-Nov, Dec-Mar)"
    },
    contact: {
      email: "pmkisan-ict@gov.in",
      helpline: "155261 / 011-24300606"
    }
  },
  {
    id: 2,
    title: "PMFBY (Pradhan Mantri Fasal Bima Yojana)",
    provider: "Ministry of Agriculture",
    amount: "Insurance Coverage",
    deadline: "Major Sowing Seasons",
    type: "Crop Insurance",
    farmerType: "General",
    landSize: "Any",
    state: "Maharashtra",
    eligibility: "Farmers including sharecroppers and tenant farmers growing notified crops.",
    description: "Crop insurance scheme to provide financial support to farmers suffering crop loss/damage arising out of unforeseen events.",
    tags: ["Crop Insurance", "Risk Mitigation", "Farmers"],
    website: "https://pmfby.gov.in",
    applicationMode: "Online portal / Banks / CSCs",
    selectionProcess: "Premium Payment → Crop Sowing Declaration → Yield Assessment via Crop Cutting Experiments (CCE) → Claim Settlement",
    renewalPolicy: "Must be renewed every crop season (Kharif/Rabi) prior to sowing.",
    benefits: [
      "Comprehensive risk cover from pre-sowing to post-harvest",
      "Low premium: 2% for Kharif, 1.5% for Rabi, 5% for Horticulture",
      "Use of technology (drones/satellite) for quick yield estimation",
      "Direct claim settlement into bank accounts"
    ],
    documentsRequired: [
      "Sowing Certificate from Patwari",
      "Aadhaar Card",
      "Bank Passbook",
      "Land Records / Tenancy Agreement"
    ],
    importantDates: {
      applicationStart: "Pre-sowing season",
      applicationEnd: "Varies by State/Crop (typically July for Kharif)",
      shortlistAnnouncement: "N/A",
      disbursement: "Post-harvest yield assessment"
    },
    contact: {
      email: "help.agri-insurance@gov.in",
      helpline: "14447"
    }
  },
  {
    id: 3,
    title: "PM-KUSUM (Solar Pump Scheme)",
    provider: "Ministry of New and Renewable Energy",
    amount: "60% Subsidy",
    deadline: "Rolling Basis",
    type: "Solar/Energy",
    farmerType: "Medium Farmer",
    landSize: "2-5 hectares",
    state: "Punjab",
    eligibility: "Farmers requiring grid-connected or off-grid solar agriculture pumps.",
    description: "Provides subsidies for setting up standalone solar pumps and solarizing existing grid-connected agriculture pumps.",
    tags: ["Solar", "Energy", "Subsidy"],
    website: "https://pmkusum.mnre.gov.in",
    applicationMode: "Online via State Nodal Agency portals",
    selectionProcess: "Application Submission → Feasibility Check by DISCOM → Beneficiary Contribution Payment → Installation → Inspection",
    renewalPolicy: "One-time installation subsidy. Maintenance typically covered for 5 years by the vendor.",
    benefits: [
      "60% government subsidy (30% Central + 30% State)",
      "30% bank loan available; only 10% upfront cost to farmer",
      "Day-time reliable power for irrigation",
      "Additional income by selling surplus power to the grid (Component C)"
    ],
    documentsRequired: [
      "Aadhaar Card",
      "Land Ownership Documents",
      "Bank Passbook",
      "Recent Electricity Bill (if applicable)",
      "Passport Size Photograph"
    ],
    importantDates: {
      applicationStart: "Ongoing",
      applicationEnd: "Rolling",
      shortlistAnnouncement: "Within 30 days of application",
      disbursement: "Direct subsidy to empaneled vendors"
    },
    contact: {
      email: "kusum.mnre@gov.in",
      helpline: "1800-180-3333"
    }
  },
  {
    id: 4,
    title: "Paramparagat Krishi Vikas Yojana (PKVY)",
    provider: "Govt of India",
    amount: "₹50,000 per hectare",
    deadline: "Seasonal Selection",
    type: "Organic Farming",
    farmerType: "General",
    landSize: "1-2 hectares",
    state: "General",
    eligibility: "Farmers willing to adopt organic farming practices.",
    description: "Supports organic farming through a cluster approach and PGS certification.",
    tags: ["Organic", "Sustainability", "Cluster Support"],
    website: "https://pgsindia-ncof.gov.in",
    applicationMode: "Through local Gram Panchayat/Cluster",
    selectionProcess: "Formation of 20ha Cluster → Registration on PGS Portal → Adoption of Organic Practices → Certification → DBT Transfer",
    renewalPolicy: "Support provided for 3 years to ensure transition to fully organic certification.",
    benefits: [
      "Financial assistance of ₹50,000/ha over 3 years",
      "₹31,000/ha specifically for organic inputs (seeds, bio-fertilizers)",
      "Free Participatory Guarantee System (PGS) Certification",
      "Marketing and value addition support"
    ],
    documentsRequired: [
      "Aadhaar Card",
      "Land Records",
      "Bank Account details",
      "Pledge to adopt organic farming"
    ],
    importantDates: {
      applicationStart: "Cluster formation phase",
      applicationEnd: "Ongoing",
      shortlistAnnouncement: "Post cluster registration",
      disbursement: "Annually for 3 years"
    },
    contact: {
      email: "pkvy-agri@gov.in",
      helpline: "1800-180-1551"
    }
  },
  {
    id: 5,
    title: "Kisan Credit Card (KCC)",
    provider: "State Bank of India",
    amount: "Up to ₹3,00,000 Loan",
    deadline: "Open All Year",
    type: "Credit/Loan",
    farmerType: "Large Farmer",
    landSize: "Above 20 hectares",
    state: "General",
    eligibility: "Farmers, Individuals/Joint borrowers, Tenant Farmers.",
    description: "Provision of adequate and timely credit support from the banking system under a single window.",
    tags: ["Credit", "Loan", "Banking"],
    website: "https://sbi.co.in",
    applicationMode: "Online or at nearest Bank Branch",
    selectionProcess: "Application → Land/Crop verification → Credit Limit Sanction → Card Issuance",
    renewalPolicy: "Limit reviewed/renewed annually based on cropping pattern and repayment history.",
    benefits: [
      "Short term credit up to ₹3 Lakhs at subsidized interest (4% with prompt repayment)",
      "Flexible repayment aligned with harvest season",
      "Includes coverage under personal accident insurance",
      "Single card for all agricultural expenses (seeds, fertilizers, machinery)"
    ],
    documentsRequired: [
      "Aadhaar / PAN Card",
      "Land holding documents (Khatauni/Pattadar passbook)",
      "Passport Size Photograph",
      "Crop details / Sowing plan"
    ],
    importantDates: {
      applicationStart: "Ongoing",
      applicationEnd: "No deadline",
      shortlistAnnouncement: "Usually 14 days processing",
      disbursement: "On demand via ATM/Branch"
    },
    contact: {
      email: "contactcentre@sbi.co.in",
      helpline: "1800-11-2211"
    }
  },
  {
    id: 6,
    title: "Per Drop More Crop (Irrigation Scheme)",
    provider: "Dept. of Agriculture",
    amount: "55% Subsidy on Equipment",
    deadline: "Continuous",
    type: "Irrigation",
    farmerType: "Small & Marginal",
    landSize: "Less than 1 hectare",
    state: "Uttar Pradesh",
    eligibility: "Farmers adopting micro-irrigation systems (drip and sprinkler).",
    description: "Focuses on enhancing water use efficiency at farm level through micro-irrigation technologies.",
    tags: ["Water Management", "Irrigation", "Subsidy"],
    website: "https://pmksy.gov.in",
    applicationMode: "Online via State Horticulture/Agriculture portal",
    selectionProcess: "Application → Field Inspection by Horticulture Officer → Vendor Quotation → Approval → Installation → Post-installation Verification → Subsidy Release",
    renewalPolicy: "One-time equipment subsidy. Beneficiary cannot claim again for the same land within 7 years.",
    benefits: [
      "Up to 55% subsidy for small/marginal farmers (45% for others)",
      "Significant water and fertilizer savings (fertigation)",
      "Higher crop yield and quality",
      "Technical guidance from empaneled micro-irrigation companies"
    ],
    documentsRequired: [
      "Aadhaar Card",
      "Land Records (Khatauni)",
      "Soil & Water Testing Report",
      "Quotation from empaneled vendor",
      "Bank Account details"
    ],
    importantDates: {
      applicationStart: "Ongoing",
      applicationEnd: "Varies by State budget availability",
      shortlistAnnouncement: "Within 45 days",
      disbursement: "Post-installation verification"
    },
    contact: {
      email: "pdmc-agri@gov.in",
      helpline: "1800-180-1551"
    }
  }
];
