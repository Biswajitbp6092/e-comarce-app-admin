import React from "react";
import UploadBox from "../../Component/UploadBox/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoMdClose } from "react-icons/io";
import Button from "@mui/material/Button";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useState } from "react";
import { useContext } from "react";
import { myContext } from "../../App";
import { deleteImages, postData } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";

const AddHomeSlide = () => {
  const [formFields, setFormFields] = useState({
    images: [],
  });

  const [previews, setPreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(myContext);

  const setPreviewsFun = (previewsArr) => {
    setPreviews(previewsArr);
    formFields.images = previewsArr;
  };

  const removeImg = (image, index) => {
    var imageArr = [];
    imageArr = previews;
    deleteImages(`/api/homeSlides/deleteimage?img=${image}`).then((res) => {
      imageArr.splice(index, 1);

      setPreviews([]);
      setTimeout(() => {
        setPreviews(imageArr);
        formFields.images = imageArr;
      }, 100);
    });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (previews?.length === 0) {
      context.openAlartBox("Error", "Please Select Category images");
      setIsLoading(false);
      return false;
    }

    postData(`/api/homeSlides/add`, formFields).then((res) => {
      setTimeout(() => {
        setIsLoading(false);
        context.setIsOppenFullScreenPanel({
          open: false,
        });
        // context.openAlartBox("Success", "Home Slide added successfully");
      }, 2500);
    });
  };
  return (
    <section className="p-5 bg-gray-50">
      <form action="" className="form py-3 p-8" onSubmit={handelSubmit}>
        <div className="scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4">
          <div className="grid grid-cols-7 gap-4">
            {previews?.length !== 0 &&
              previews.map((image, index) => {
                return (
                  <div key={index} className="uploadBoxWrapper relative">
                    <span className="absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer">
                      <IoMdClose
                        onClick={() => removeImg(image, index)}
                        className="text-white text-[17px]"
                      />
                    </span>

                    <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                      <img src={image} alt="images" className="w-100" />
                    </div>
                  </div>
                );
              })}

            <UploadBox
              multiple={false}
              name="images"
              url="/api/homeSlides/uploadImages"
              setPreviewsFun={setPreviewsFun}
            />
          </div>
        </div>

        <br />
        <br />
        <div className="w-[250px]">
          <Button type="submit" className="btn-blue btn-lg w-full flex gap-2">
            {isLoading ? (
              <CircularProgress />
            ) : (
              <>
                <FaCloudUploadAlt className="text-[25px] text-white" />
                Publish and View
              </>
            )}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddHomeSlide;
