import { Link } from 'react-router';
import { Button } from '../components/Button';

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <p className="text-xs text-culte-orange tracking-[0.4em] mb-6">404 ERROR</p>
        <h1
          className="font-cormorant text-culte-navy leading-none mb-6"
          style={{ fontSize: 'clamp(4rem, 15vw, 12rem)' }}
        >
          LOST.
        </h1>
        <p className="text-culte-black/60 leading-relaxed mb-10 max-w-sm mx-auto">
          The page you're looking for has moved, or never existed.
          Let's get you back on track.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/"><Button size="lg">RETURN HOME</Button></Link>
          <Link to="/shop"><Button variant="ghost" size="lg">SHOP THE COLLECTION</Button></Link>
        </div>
      </div>
    </div>
  );
};