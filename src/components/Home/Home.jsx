import Movies from "./../Movies/Movies";
import Tvshows from "./../Tvshows/Tvshows";
import People from "./../People/people";


function Home() {
  return (
    <>
      <div className="container ">
        <div className="row ">
          <Movies />
          <Tvshows />
          <People />
        </div>
      </div>
    </>
  );
}

export default Home;
