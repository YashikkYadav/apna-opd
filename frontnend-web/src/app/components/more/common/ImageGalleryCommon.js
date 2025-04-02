import { useState } from "react";
import Image from "next/image";

const ImageGalleryCommon = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  
  // If no images provided, use placeholders
  const galleryImages = images.length > 0 
    ? images 
    : Array(6).fill("/images/image_placeholder.svg");

  return (
    <div className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto pb-[60px] sm:pb-[70px]">
      <h1 className="title-48 mb-[42px]">Image Gallery</h1>
      
      {/* Main selected image */}
      <div className="mb-6">
        <Image
          src={galleryImages[selectedImage]}
          width={1000}
          height={600}
          alt="Gallery image"
          className="w-full h-[400px] object-cover rounded-lg shadow-md"
        />
      </div>
      
      {/* Thumbnail grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {galleryImages.map((image, index) => (
          <div 
            key={index}
            className={`cursor-pointer ${selectedImage === index ? 'ring-4 ring-[#3DB8F5]' : ''} rounded-md overflow-hidden`}
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src={image}
              width={200}
              height={200}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-[100px] object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGalleryCommon;
