import { useEffect, useState } from "react";
import axios from "axios";
import { FadeLoader } from "react-spinners";

axios.defaults.withCredentials = true;

const Facts = () => {
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://nobilis-back.onrender.com/fetch_data"
      );
      setFacts(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <FadeLoader color="#36d7b7" />
      </div>
    );
  }
  console.log(facts);

  return (
    <div className="px-5 sm:px-10 md:px-20 py-20">
      <div className="w-full overflow-x-auto">
        <table className="table-auto border">
          <thead className="bg-blue-300">
            <tr className="text-left">
              <th className="py-2 px-4">Fact</th>
              <th className="py-2 px-4">Verified</th>
              <th className="py-2 px-4">Created On</th>
            </tr>
          </thead>
          <tbody>
            {facts.map((fact) => (
              <tr key={fact.id} className="border-b ">
                <td className="py-2 px-4">{fact.fact}</td>
                <td className="py-2 px-4">
                  {fact.verified ? "True" : "False"}
                </td>
                <td className="py-2 px-4">{fact.created_on}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Facts;
