import { useEffect } from "react";
import { use } from "react";
import { useRef } from "react";

export default function FeaturesImage({ data }) {

  const imageRef = useRef(null);

  useEffect(() => {
    // Ensure the image is loaded before applying styles
    const handleImageLoad = () => {
      if (imageRef.current) {
        imageRef.current.style.opacity = 1;
        let h = imageRef.current.getBoundingClientRect().height;
        let w = imageRef.current.getBoundingClientRect().width;
        h >= w
          ? (imageRef.current.className = ' feature-image vertical')
          : (imageRef.current.className = ' feature-image horizontal');
        // h === w 
        //   ? (imageRef.current.className = ' feature-image square')
        //   : (imageRef.current.className = ' feature-image');
      }
    };

    const imgElement = imageRef.current;
    if (imgElement.complete) {
      handleImageLoad();
    } else {
      imgElement.addEventListener('load', handleImageLoad);
    }

    return () => {
      imgElement.removeEventListener('load', handleImageLoad);
    };
  }, []);

  console.log(data.image)

  return (
    <div className="features-image seeker-section">
      <img ref={imageRef} src={data.image} alt={`${data.title} image`} className="feature-image" />
    </div>
  );
}
// This component displays the image, title, description, and needs of a feature.