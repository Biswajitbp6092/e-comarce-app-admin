import React, { useContext, useState } from "react";
import UploadBox from "../../Component/UploadBox/UploadBox";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoMdClose } from "react-icons/io";
import Button from "@mui/material/Button";
import { FaCloudUploadAlt } from "react-icons/fa";
import {
  deleteImages,
  editData,
  fetchDataFromApi,
  postData,
} from "../../utils/api";
import { myContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import Editor from "react-simple-wysiwyg";
import { useEffect } from "react";

const EditBlog = () => {
  const [formFields, setFormFields] = useState({
    title: "",
    description: "",
    images: [],
  });

  const [previews, setPreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [html, setHtml] = useState("");

  const context = useContext(myContext);
  const navigate = useNavigate();

  useEffect(() => {
    const id = context?.isOppenFullScreenPanel?.id;
    fetchDataFromApi(`/api/blog/${id}`).then((res) => {
      formFields.title = res?.data?.blog?.title;
      formFields.description = res?.data?.blog?.description;
      formFields.images = res?.data?.blog?.images;
      setPreviews(res?.data?.blog?.images);
      setHtml(res?.data?.blog?.description);
    });
  }, []);

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  const setPreviewsFun = (previewsArr) => {
    setPreviews(previewsArr);
    formFields.images = previewsArr;
  };

  const removeImg = (image, index) => {
    var imageArr = [];
    imageArr = previews;
    deleteImages(`/api/category/deleteimage?img=${image}`).then((res) => {
      imageArr.splice(index, 1);

      setPreviews([]);
      setTimeout(() => {
        setPreviews(imageArr);
        formFields.images = imageArr;
      }, 100);
    });
  };

  const onChangeDescription = (e) => {
    setHtml(e.target.value);
    formFields.description = e.target.value;
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    console.log(formFields);

    if (formFields.title === "") {
      context.openAlartBox("Error", "Please Enter Blog Title");
      setIsLoading(false);
      return false;
    }
    if (formFields.description === "") {
      context.openAlartBox("Error", "Please Enter Blog Description");
      setIsLoading(false);
      return false;
    }
    if (previews?.length === 0) {
      context.openAlartBox("Error", "Please Select Category images");
      setIsLoading(false);
      return false;
    }

    editData(
      `/api/blog/${context?.isOppenFullScreenPanel?.id}`,
      formFields
    ).then((res) => {
      setTimeout(() => {
        setIsLoading(false);
        context.setIsOppenFullScreenPanel({
          open: false,
        });
        context?.getCat();
        navigate("/blog/list");
      }, 2500);
    });
  };

  return (
    <section className="p-5 bg-gray-50">
      <form action="" className="form py-1 md:p-8" onSubmit={handelSubmit}>
        <div className="grid grid-cols-1 mb-3">
          <div className="col w-[100%]">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Title</h3>
            <input
              type="text"
              className="w-full h-[35px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-md p-3 text-sm"
              name="title"
              value={formFields.title}
              onChange={onChangeInput}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 mb-3">
          <div className="col w-[100%]">
            <h3 className="text-[14px] font-[500] mb-1 text-black">
              Description
            </h3>
            <Editor
              value={html}
              onChange={onChangeDescription}
              containerProps={{ style: { resize: "vertical" } }}
            />
          </div>
        </div>
        <br />
        <h3 className="text-[18px] font-[500] mb-1 text-black">Blog Images</h3>
        <div className="scroll max-h-[72vh] overflow-y-scroll pr-2 md:pr-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-7 gap-4">
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
              multiple={true}
              name="images"
              url="/api/blog/uploadImages"
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

export default EditBlog;
