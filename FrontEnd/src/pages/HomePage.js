import Dentist from "../components/Dentist/DentistCard";
import Footer from "../components/Footer/footer";
import Hair from "../components/HairImplant/HairImplant";
import Tourism from "../components/Tourism/Tourism";
import '../components/Home.css';
import Intro from "../components/Intro/intro";
import About from "../components/About Us/About us";
import jwtDecode from 'jwt-decode';
import ChatBotHelper from "../components/Chatbot/Chatbot";

function Home() {
  return (

    <div className="container-fluid" id="Home">
      <Intro />
      <About />
      {(localStorage.getItem("token") == null|| jwtDecode(localStorage.getItem('token')).role === "Patient" || jwtDecode(localStorage.getItem('token')).role === "Tourist") &&
<>             
<Dentist />
              <Hair />
              <Tourism />
          
              </>
            
              
              
              
            }
            <ChatBotHelper />



    </div>

  );
}

export default Home;