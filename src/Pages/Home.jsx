import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import Header from "../components/Header";

const Home = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 1200);
  }, []);

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <div className="container">
          <section className="hero-section">
            <h1 className={`hero-title ${fadeIn ? "fade-in" : ""}`}>
              Simplify task management
              <br />
              and prioritize work
            </h1>
            <p className="hero-description">
              Tenx helps you stay organized and focused, bringing everything you
              need into one place. Prioritize tasks, collaborate effortlessly,
              and achieve more with ease.
            </p>
            <div className="cta-buttons">
              <button className="get-started-btn hero-cta" onClick={() => navigate("/login")}>
                <span className="text">Get started</span>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;