import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import gif from '../../assets/images/MoonGif.gif';
import Footer from './Footer';

const Home = () => {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <Header />

      {/* Main Section */}
      <main className="relative flex flex-col justify-center items-center text-center min-h-screen">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={gif}
            alt="Animated background of a moon"
            className="w-full h-full object-cover opacity-80"
          />
        </div>

        {/* Content Above the Background */}
        <section className="relative z-10 p-4 flex flex-col justify-center items-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Life is Too Short to Be Bored
          </h1>
          <Link
            to="/landingPage"
            className="text-lg md:text-xl bg-blue-500 hover:bg-blue-600 py-2 md:py-3 px-6 md:px-8 rounded-full transition-colors duration-300"
          >
            +Join Room
          </Link>
        </section>
      </main>

      {/* Site Rules Section */}
      <section className="bg-black text-white px-8 py-12 w-full">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Site Rules</h2>
        <ul className="text-left md:text-lg space-y-4 mx-auto">
          <li>
            <strong>Privacy:</strong> We value your privacy and ensure that your data will not be shared without your consent.
          </li>
          <li>
            <strong>Registration Process:</strong> Register with a valid email address and unique username. Your email will be verified before registration completes.
          </li>
          <li>
            <strong>Room Creation:</strong> You can create up to two rooms every 24 hours. Rooms expire 24 hours after creation.
          </li>
          <li>
            <strong>Message Expiry:</strong> Messages in rooms will also expire once the room expires, ensuring that your conversation is not stored indefinitely.
          </li>
        </ul>
      </section>

      {/* About Me Section */}
      <section className="bg-black text-white px-8 py-12 w-full">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">About Me</h2>
        <div className=" mx-auto text-left md:text-lg space-y-4">
          <p>
            <strong>Name:</strong> Shaik Gouse Rahiman
          </p>
          <p>
            <strong>Professional Summary:</strong> I am a dedicated Senior Software Engineer with nearly 3 years of experience in front-end technologies like ReactJS, JavaScript, HTML5, CSS3, NodeJS, ExpressJS. I specialize in building scalable, high-performance components and ensuring seamless integration with back-end systems. I have a passion for continuous learning and professional growth.
          </p>
          <p>
            <strong>Contact Email:</strong> <a href="mailto:rahiman2100@gmail.com" className="text-blue-400">rahiman2100@gmail.com</a>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
