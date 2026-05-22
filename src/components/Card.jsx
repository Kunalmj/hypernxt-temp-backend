import { useNavigate } from "react-router-dom";

const Card = ({ title, desc, path }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 hover:shadow-lg transition transform hover:-translate-y-1 min-h-65 flex flex-col justify-between">
      
      <div>
        <h3 className="text-xl font-semibold text-blue-600 mb-4">
          {title}
        </h3>
        <p className="text-gray-600">{desc}</p>
      </div>

      <button
        onClick={() => navigate(path)}
        className="mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Apply Now
      </button>
    </div>
  );
};

export default Card;