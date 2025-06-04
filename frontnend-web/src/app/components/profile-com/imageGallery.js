import Image from "next/image";

const ImageGallery = ({ doctorDetail }) => {
  const data = ["", "", "", "", "", ""];
  return (
    <div className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto pb-[60px] sm:pb-[70px]">
      <h1 className="title-48 mb-[42px]">Image Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[15px]">
        {doctorDetail?.images.map((item, index) => {
          return (
            <div key={index}>
              <Image
                src={item.url ?? "/images/image_placeholder.svg"}
                width={398}
                height={262}
                alt="Doctor Image"
                className="w-full max-h-[262px] object-cover rounded-[8px]"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageGallery;
