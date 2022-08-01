import { useState, useEffect } from "react";
import { allHotels } from "../actions/hotel";
import SmallCard from "../components/cards/SmallCard";
const Home = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    loadAllHotels();
  }, []);
  const loadAllHotels = async () => {
    let res = await allHotels();
    setHotels(res.data);
  };
  return (
    <>
      <div className="container-fluid bg-secondary h1 p-5 text-center">
        Home
      </div>
      <div>
        {hotels.map((h) => (
          <>
            <br />
            <SmallCard h={h} key={h._id} />
          </>
        ))}
      </div>
    </>
  );
};

export default Home;
