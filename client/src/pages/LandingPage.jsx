import React, { useState } from 'react';
import "../styles/layout.css"
import TopNavbar from "../components/TopNavbar";
import Sidebar from "../components/Sidebar";
import MobileIconNav  from '../components/Mobile-Icon';

const LandingPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <TopNavbar toggleSidebar={toggleSidebar} />
      <MobileIconNav />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="category-nav">
        <button className="active">ALL</button>
        <button>GRAPHIC DESIGN</button>
        <button>COMMISSION DRAWING</button>
        <button>DIGITAL ART</button>
        <button>VIDEO EDITING</button>
        <button>PHOTO MANIPULATION</button>
      </div>

      {/* GALLERY FLEX */}
      <div className="gallery-flex">
        {/* CARD */}
        <div className="art-card">
          <img src="/images/art_sample_1.jpg" alt="Starry Night" />
          <div className="overlay">
            <div className="art-actions">
              <button className="icon-btn"><i className="fa fa-heart"></i></button>
              <button className="icon-btn"><i className="fa fa-comment"></i></button>
              <button className="icon-btn"><i className="fa fa-star"></i></button>
            </div>
            <div className="art-info">
              <h3 className="art-title">Starry Night</h3>
              <p className="artist">Vincent Van Gogh</p>
              <div className="price-and-pay">
                <p className="art-price">$200,000,000</p>
                <i className="fa-solid fa-cart-plus"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="art-card">
          <img src="/images/art_sample_2.jpg" alt="Mona Lisa" />
          <div className="overlay">
            <div className="art-actions">
              <button className="icon-btn"><i className="fa fa-heart"></i></button>
              <button className="icon-btn"><i className="fa fa-comment"></i></button>
              <button className="icon-btn"><i className="fa fa-star"></i></button>
            </div>
            <div className="art-info">
              <h3 className="art-title">Mona Lisa</h3>
              <p className="artist">Leonardo Da Vinci</p>
              <div className="price-and-pay">
                <p className="art-price">$200,000,000</p>
                <i className="fa-solid fa-cart-plus"></i>
              </div>
            </div>
          </div>
        </div>

        {/* CARD */}
        <div className="art-card">
          <img src="/images/art_sample_3.jpg" alt="San Giorgio Maggiore at Dusk" />
          <div className="overlay">
            <div className="art-actions">
              <button className="icon-btn"><i className="fa fa-heart"></i></button>
              <button className="icon-btn"><i className="fa fa-comment"></i></button>
              <button className="icon-btn"><i className="fa fa-star"></i></button>
            </div>
            <div className="art-info">
              <h3 className="art-title">San Giorgio Maggiore at Dusk</h3>
              <p className="artist">Claude Monet</p>
              <div className="price-and-pay">
                <p className="art-price">$200,000,000</p>
                <i className="fa-solid fa-cart-plus"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="art-card">
          <img src="/images/art_sample_4.jpg" alt="Le Rêve" />
          <div className="overlay">
            <div className="art-actions">
              <button className="icon-btn"><i className="fa fa-heart"></i></button>
              <button className="icon-btn"><i className="fa fa-comment"></i></button>
              <button className="icon-btn"><i className="fa fa-star"></i></button>
            </div>
            <div className="art-info">
              <h3 className="art-title">Le Rêve</h3>
              <p className="artist">Pablo Picasso</p>
              <div className="price-and-pay">
                <p className="art-price">$200,000,000</p>
                <i className="fa-solid fa-cart-plus"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="introduction-video">
        <div className="yt-video">
          <iframe 
            width="560" 
            height="315"
            src="https://www.youtube.com/embed/B3lNgtTs-eE?si=4936o24_Ga5lVR2E" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen>
          </iframe>

          <div className="yt-video-btns">
            <button className='explore-more-btn'>EXPLORE MORE</button>
            <button className='advertise-btn'>START ADVERTISING</button>
          </div>
        </div>
        
        <div className="video-summary">
          <h1 className='video-title'>Discover <span className="highlighted">Uniqueness</span><br />
          and <span className="highlighted">Enthusiasm</span></h1>
          <p className='video-description'>&nbsp; &nbsp; &nbsp;We believe that, together we can make ART more valuable if we enrich every efforts
            and popularize them here in <span className="pink-highlighted">Call Inside Art Studio</span>.
          </p>
        </div>
      </div>

    </div>
  );
};

export default LandingPage;
