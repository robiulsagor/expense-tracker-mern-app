import { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash2 } from "react-icons/lu";

const PhotoSelector = ({ image, setImage }) => {
  const imgRef = useRef(null);
  const [previewLink, setPreviewLink] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const link = URL.createObjectURL(file);
    setPreviewLink(link);
  };

  const handleClick = () => {
    imgRef.current.click();
  };

  const handleDelete = () => {
    setPreviewLink(null);
    setImage(null);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <input
        type="file"
        accept="image/*"
        ref={imgRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {/* Image container */}
      <div className="bg-purple-100 w-20 h-20  rounded-full flex items-center justify-center relative">
        {image ? (
          <>
            <img
              src={previewLink}
              alt="profile"
              className="w-full h-full object-cover rounded-full"
            />

            <LuTrash2
              onClick={handleDelete}
              className="bg-red-400 text-white p-1.5 rounded-full absolute -bottom-1.5 -right-1 hover:bg-red-700 transition-all cursor-pointer"
              size={32}
            />
          </>
        ) : (
          <>
            <LuUser className="text-purple-600" size={32} />
            <LuUpload
              onClick={handleClick}
              className="bg-purple-500 text-white p-1.5 rounded-full absolute -bottom-1.5 -right-1 hover:bg-purple-700 transition-all cursor-pointer"
              size={32}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PhotoSelector;
