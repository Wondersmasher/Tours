import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tours-project";
function App() {
  //STATES
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noTour, setNoTour] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const dataContext = React.createContext();
  //GETTING INFO FROM API
  const getData = async function () {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const datas = await response.json();
      setIsLoading(false);
      setData(datas);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  //USEeFFECTS
  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 3000);
  }, []);
  //HANDLECLICKS
  const handleClick = function (idx) {
    setData((prevState) => {
      if (prevState.length - 1 === 0) setNoTour(true);

      return prevState.filter((tour) => tour.id !== idx);
    });
  };
  const handleRefresh = function () {
    setIsLoading(true);
    setTimeout(() => {
      getData();
    }, 3000);
  };
  //CREATING ELEMENTS (TOUR) FOR DISPLAY
  const element = data.map((val) => {
    return (
      <article key={val.id} className="single-tour">
        <img src={val.image} alt={val.name} />
        <footer>
          <div className="tour-info">
            <h4>name: {val.name}</h4>
            <h4 className="tour-price">price:{val.price}</h4>
          </div>
          <p>{readMore ? val.info : `${val.info.substring(0, 200)}`}</p>
          <button onClick={() => setReadMore((prev) => !prev)}>
            {readMore ? "show less" : "read more"}
          </button>
          <button onClick={() => handleClick(val.id)} className="delete-btn">
            Not interested
          </button>
        </footer>
      </article>
    );
  });
  // getData()
  return data[0] ? (
    <section className="section">
      <Tours />
      {element}
    </section>
  ) : isLoading ? (
    <section>
      <Loading />
    </section>
  ) : (
    <main>
      {noTour && (
        <div className="title">
          <h2>No tour</h2>
          <div className="underline"></div>
          <button className="btn" onClick={handleRefresh}>
            refresh
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
