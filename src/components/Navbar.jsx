import { navLinks } from '../../constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Navbar = () => {
  useGSAP(() => {
    const navtween = gsap.timeline({
      scrollTrigger: {
        trigger: 'nav',
        // markers: true,
        start: 'bottom top',
      },
    });

    navtween.fromTo(
      'nav',
      {
        backgroundColor: 'transparent',
      },
      {
        backgroundColor: '#00000050',
        backdropFilter: 'blur(10px)',
        duration: 1,
        ease: 'power1.inOut',
      },
    );
  }, []);
  return (
    <nav>
      <div>
        <a href="/" className="flex items-center gap-2">
          <img src="/images/logo.png" alt="logo" />
          <p>velvet pour</p>
        </a>

        <ul>
          {navLinks.map((links) => (
            <li key={links.id}>
              <a href={`#${links.id}`}>{links.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
