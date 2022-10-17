import efficiency from "../../../img/efficiency.png";
import impact from "../../../img/impact.png";
import innovation from "../../../img/innovation.png";
import passion from "../../../img/passion.png";
import evcharge from "../../../img/evcharge.jpg";
import evcharge1 from "../../../img/evcharge1.jpg";


export default function AboutUs() {
  return (
    <div className="aboutUsContainer ">
      <div className=" backgroundContainer">
        <h1>About Us</h1>
      </div>
      <div className=" logosContainer">
        <div className="logoBox">
          <img src={innovation} alt="innovation-icon" />
          <p>Innovation</p>
        </div>
        <div className="logoBox">
          <img src={passion} alt="innovation-icon" />
          <p>Passion</p>
        </div>
        <div className="logoBox">
          <img src={efficiency} alt="innovation-icon" />
          <p>Efficiency</p>
        </div>
        <div className="logoBox">
          <img src={impact} alt="innovation-icon" />
          <p>Impact</p>
        </div>
      </div>

      <div className="whoWeAreContainer">
        <h3>Who we are</h3>
        <p>
          EV-CONNECTION is a platform that facilitates the connection between EV
          drivers & owners of wall-boxes.
          <br />
          <br />
          EV drivers can charge their electrical vehicles on the way just by
          connecting to wall-box owners in their surroundings.
        </p>
      </div>
      <div className="imgsContainer">
        <div className="wallBoxImg">
          <img src={evcharge} alt="ev-charger" />
        </div>
        <div className="carChargerImg">
          <img src={evcharge1} alt="ev-charger" />
        </div>
      </div>

      <section className="features">
          <p>
            Easy to chat, search on the map & safely pay on the spot. Join the
            community for a more sustainable future & effortless EVcharging.
          </p>
      </section>

      <section className="joinUs ">
        <h3>
          Join our community today!
        </h3>
        <p>
          Are you always on the go? Easy find and charge your EV on the way!
          Connect with wall box owners everywhere.
        </p>
      </section>
    </div>
  );
}
