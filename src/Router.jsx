import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Services from "./pages/Services";
import BrowseAllServices from "./pages/BrowseAllServices";
import AIHelper from "./pages/AIHelper";
import ContactSupport from "./pages/ContactSupport";
import StatusTracking from "./pages/help/StatusTracking";
import CorrectionServices from "./pages/help/CorrectionServices";
import ExpertSupport from "./pages/help/ExpertSupport";
import ScholarshipPortal from "./pages/ScholarshipPortal";
import ScholarshipResults from "./pages/ScholarshipResults";
import ScholarshipApplyForm from "./pages/ScholarshipApplyForm";
import StartupMSMEPortal from "./pages/StartupMSMEPortal";
import StartupGrantResults from "./pages/StartupGrantResults";
import StartupApplyForm from "./pages/StartupApplyForm";
import AgriculturePortal from "./pages/AgriculturePortal";
import AgricultureResults from "./pages/AgricultureResults";
import AgriApplyForm from "./pages/AgriApplyForm";
import WomenPortal from "./pages/WomenPortal";
import WomenResults from "./pages/WomenResults";
import WomenApplyForm from "./pages/WomenApplyForm";
import ResearchPortal from "./pages/ResearchPortal";
import ResearchResults from "./pages/ResearchResults";
import ResearchApplyForm from "./pages/ResearchApplyForm";
import TenderPortal from "./pages/TenderPortal";
import TenderResults from "./pages/TenderResults";
import TenderApplyForm from "./pages/TenderApplyForm";
import CitizenSchemesPortal from "./pages/CitizenSchemesPortal";
import BankingSchemes from "./pages/BankingSchemes";
import HealthSchemes from "./pages/HealthSchemes";
import HousingSchemes from "./pages/HousingSchemes";
import SafetySchemes from "./pages/SafetySchemes";
import ScienceSchemes from "./pages/ScienceSchemes";
import SkillsSchemes from "./pages/SkillsSchemes";
import SocialSchemes from "./pages/SocialSchemes";
import SportsSchemes from "./pages/SportsSchemes";
import TransportSchemes from "./pages/TransportSchemes";
import TravelSchemes from "./pages/TravelSchemes";
import UtilitySchemes from "./pages/UtilitySchemes";
import WomenChildSchemes from "./pages/WomenChildSchemes";
import SchemeDetails from "./pages/SchemeDetails";
import PricingPage from "./pages/PricingPage";
import FAQPage from "./pages/faqPage";
import AdminDashboard from "./pages/AdminDashboard";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "services", element: <Services /> },
      { path: "browse-all", element: <BrowseAllServices /> },
      { path: "ai-helper", element: <AIHelper /> },
      { path: "contact", element: <ContactSupport /> },
      { path: "help/status", element: <StatusTracking /> },
      { path: "help/correction", element: <CorrectionServices /> },
      { path: "help/expert", element: <ExpertSupport /> },
      { path: "scholarships", element: <ScholarshipPortal /> },
      { path: "scholarship-results", element: <ScholarshipResults /> },
      { path: "scholarship-apply", element: <ScholarshipApplyForm /> },
      { path: "startup-msme", element: <StartupMSMEPortal /> },
      { path: "startup-grant-results", element: <StartupGrantResults /> },
      { path: "startup-apply", element: <StartupApplyForm /> },
      { path: "agriculture", element: <AgriculturePortal /> },
      { path: "agri-results", element: <AgricultureResults /> },
      { path: "agri-apply", element: <AgriApplyForm /> },
      { path: "women-programs", element: <WomenPortal /> },
      { path: "women-results", element: <WomenResults /> },
      { path: "women-apply", element: <WomenApplyForm /> },
      { path: "research-grants", element: <ResearchPortal /> },
      { path: "research-results", element: <ResearchResults /> },
      { path: "research-apply", element: <ResearchApplyForm /> },
      { path: "tenders", element: <TenderPortal /> },
      { path: "tender-results", element: <TenderResults /> },
      { path: "tender-apply", element: <TenderApplyForm /> },
      { path: "citizen-schemes", element: <CitizenSchemesPortal /> },
      { path: "citizen-schemes/banking", element: <BankingSchemes /> },
      { path: "citizen-schemes/health", element: <HealthSchemes /> },
      { path: "citizen-schemes/housing", element: <HousingSchemes /> },
      { path: "citizen-schemes/safety", element: <SafetySchemes /> },
      { path: "citizen-schemes/science", element: <ScienceSchemes /> },
      { path: "citizen-schemes/skills", element: <SkillsSchemes /> },
      { path: "citizen-schemes/social", element: <SocialSchemes /> },
      { path: "citizen-schemes/sports", element: <SportsSchemes /> },
      { path: "citizen-schemes/transport", element: <TransportSchemes /> },
      { path: "citizen-schemes/travel", element: <TravelSchemes /> },
      { path: "citizen-schemes/utility", element: <UtilitySchemes /> },
      { path: "citizen-schemes/women", element: <WomenChildSchemes /> },
      { path: "scheme-details", element: <SchemeDetails /> },
      { path: "price", element: <PricingPage /> },
      { path: "faq", element: <FAQPage /> },
      { path: "admin/dashboard", element: <AdminDashboard /> },
    ],
  },
]);

export default router;