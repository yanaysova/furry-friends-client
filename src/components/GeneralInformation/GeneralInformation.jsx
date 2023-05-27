import { useState, useEffect } from "react";
import { privateInstance } from "../../utilities/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import "./GeneralInformation.css";
import PawLoader from "../../ui/PawLoader/PawLoader";

const GeneralInformation = ({ handleAlert }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    try {
      const response = await privateInstance.get("/pet/stats");
      setData({
        barData: response.data.data.stats.map((item) => ({
          _id: item._id,
          avgWeight: item.avgWeight.toFixed(2),
          avgHeight: item.avgHeight.toFixed(2),
          avgAge: item.avgAgeValue.toFixed(2),
        })),
        pieDataDog: [
          {
            name: "Available",
            value: response.data.data.stats[0].availablePets,
          },
          { name: "Adopted", value: response.data.data.stats[0].adoptedPets },
          { name: "Fostered", value: response.data.data.stats[0].fosteredPets },
        ],
        pieDataCat: [
          {
            name: "Available",
            value: response.data.data.stats[1].availablePets,
          },
          { name: "Adopted", value: response.data.data.stats[1].adoptedPets },
          { name: "Fostered", value: response.data.data.stats[1].fosteredPets },
        ],
      });
    } catch (error) {
      console.log(error);
      handleAlert(error.response.data.message, "error");
    }
  };

  return (
    <div>
      <h1>Pet Stats</h1>
      {data ? (
        <div className="general-info-wrapper">
          <div className="charts-wrapper">
            <div>
              <h3>Dogs</h3>
              <PieChart width={300} height={300}>
                <Pie
                  data={data.pieDataDog}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  <Cell fill="#80D08C" />
                  <Cell fill="#FFAA78" />
                  <Cell fill="#00CFFF" />
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </div>
            <div>
              <h3>Cats</h3>
              <PieChart width={300} height={300}>
                <Pie
                  data={data.pieDataCat}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#00CFFF"
                  label
                >
                  <Cell fill="#80D08C" />
                  <Cell fill="#FFAA78" />
                  <Cell fill="#00CFFF" />
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </div>
          </div>
          <div className="charts-wrapper">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={data.barData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgWeight" fill="#80D08C" name="Average Weight" />
                <Bar dataKey="avgHeight" fill="#FFAA78" name="Average Height" />
                <Bar dataKey="avgAge" fill="#00CFFF" name="Average Age" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <PawLoader />
      )}
    </div>
  );
};

export default GeneralInformation;
