import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function VideoOverlay({ isVisible, onClose, vimeoUrl }) {
  const overlayRef = useRef();
  const contentRef = useRef();

  useGSAP(() => {
    if (isVisible) {
      // Animate overlay sliding in from the right
      gsap.fromTo(overlayRef.current, 
        { x: '100%' }, 
        { x: 0, duration: 0.5, ease: "power2.out" }
      );
      // Fade in content
      gsap.fromTo(contentRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, delay: 0.2 }
      );
    }
  }, [isVisible]);

  const handleClose = () => {
    // Animate overlay sliding out to the right
    gsap.to(overlayRef.current, {
      x: '100%',
      duration: 0.4,
      ease: "power2.in",
      onComplete: onClose
    });
  };

  const handleOverlayClick = (e) => {
    // Close when clicking the overlay background, but not the content
    if (e.target === overlayRef.current) {
      handleClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className="video-overlay" 
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <div className="video-content" ref={contentRef}>
        <button className="close-button" onClick={handleClose}>
          ×
        </button>
        <div className="video-wrapper">
          {vimeoUrl && (
            <iframe
              src={vimeoUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Promo Video"
            />
          )}
        </div>
      </div>
    </div>
  );
}
