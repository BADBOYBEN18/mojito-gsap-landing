'use client';
import { useRef, useState } from 'react';
import { allCocktails } from '../../constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Menu = () => {
  const [currentindex, setcurrentindex] = useState(0);
  const totalCocktails = allCocktails.length;
  const contentRef = useRef();

  useGSAP(() => {
    gsap.fromTo('#title', { opacity: 0 }, { opacity: 1, duration: 1 });
    gsap.fromTo(
      '.cocktail img',
      { opacity: 0, xPercent: -100 },
      { opacity: 1, duration: 1, xPercent: 0, ease: 'power1.inOut' },
    );
    gsap.fromTo(
      '.details h2',
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 100, ease: 'power1.inOut' },
    );
    gsap.fromTo(
      '.details p',
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 100, ease: 'power1.inOut', delay: 0.1 },
    );
  }, [currentindex]);

  const gotoSlide = (index) => {
    const newindex = (index + totalCocktails) % totalCocktails;
    setcurrentindex(newindex);
  };

  const getCocktailAt = (indexofset) => {
    return allCocktails[
      (currentindex + indexofset + totalCocktails) % totalCocktails
    ];
  };

  const currentcocktail = getCocktailAt(0);
  const prevCocktail = getCocktailAt(-1);
  const nextcocktail = getCocktailAt(1);

  return (
    <section id="menu" aria-labelledby="menu-heading">
      <img src="/images/slider-left-leaf.png" id="m-left-leaf" alt="" />
      <img src="/images/slider-right-leaf.png" id="m-right-leaf" alt="" />

      <h2 id="menu-heading" className="sr-only">
        Cocktail Menu
      </h2>

      <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
        {allCocktails.map((cocktail, index) => {
          const isActive = index === currentindex;

          return (
            <button
              key={cocktail.id}
              className={`${isActive ? 'text-white border-white' : 'text-white/50 border-white/50'}`}
              onClick={() => gotoSlide(index)}
            >
              {cocktail.name}
            </button>
          );
        })}
      </nav>
      <div className="content">
        <div className="arrows">
          <button
            className="text-left"
            onClick={() => gotoSlide(currentindex - 1)}
          >
            <span>{prevCocktail.name}</span>
            <img src="/images/right-arrow.png" alt="" aria-hidden="true" />
          </button>

          <button
            className="text-left"
            onClick={() => gotoSlide(currentindex + 1)}
          >
            <span>{nextcocktail.name}</span>
            <img src="/images/left-arrow.png" alt="" aria-hidden="true" />
          </button>
        </div>

        <div className="cocktail">
          <img src={currentcocktail.image} alt="" />
        </div>

        <div className="recipe">
          <div ref={contentRef} className="info">
            <p>Recipe for:</p>
            <p id="title">{currentcocktail.name}</p>
          </div>

          <div className="details">
            <h2>{currentcocktail.title}</h2>
            <p>{currentcocktail.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
