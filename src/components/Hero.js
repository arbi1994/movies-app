import React, { useEffect, useState } from 'react';
import anime from 'animejs';

const Hero = ({ children }) => {
  const [active, setActive] = useState(false)

  const animateHeroContainer = () => {

    let tl = anime.timeline({
      easing: 'spring(.5, 60, 10, 0)',
      duration: 1000
    })
  
    tl
    .add({
      targets: '.from-left',
      left: 0
    }, "-=200")
    .add({
      targets: '.from-top',
      top: 0,
      // easing: "easeInOutQuint"
    }, "-=600")
    .add({
      targets: '.from-right',
      right: 0,
    }, "-=600")
  }

  useEffect(() => {
    animateHeroContainer()
    setActive(true)
  }, [])

  return (
    <section className="hero">
      <div className="hero__wrapper">
        <h2>
          <span className="from-left">Discover</span>
          <span className="from-top">the</span>
          <span className="from-right">latest</span>
        </h2>
        <h1 className={active ? 'active' : ''}>Movies</h1>
      </div>
      {children}
    </section>
  )
}

export default Hero
