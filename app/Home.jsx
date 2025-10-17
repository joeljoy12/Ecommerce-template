import React from 'react'
import Navbar from '../Home/Navbar'
import Benifits from '../Home/Benifits'
import FeaturedProducts from '../Home/FeaturedProduct'
import Testimonials from '../Home/Testimonials'
import About from '../Home/About'
import Faq from '../Home/Faq'
import Footer from '../Home/Footer'


const Home = () => {
  return (
    <div>
            
       <Benifits />
        <FeaturedProducts />
        <Testimonials />
        <About />
        <Faq />
     
    </div>
  )
}

export default Home