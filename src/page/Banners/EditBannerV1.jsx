import React, { useState, useContext, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { myContext } from "../../App";
import UploadBox from "../../Component/UploadBox/UploadBox";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { FaCloudUploadAlt } from "react-icons/fa";
import Button from "@mui/material/Button";
import { IoMdClose } from "react-icons/io";
import {
  deleteImages,
  editData,
  fetchDataFromApi,
  postData,
} from "../../utils/api";

const EditBannerV1 = () => {
  const [formFields, setFormFields] = useState({
    catId: "",
    bannerTitle: "",
    subCatId: "",
    thirdSubCatId: "",
    price: "",
  });
  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productThirtLavelCat, setProductThirtLavelCat] = useState("");
  const [previews, setPreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alignInfo, setAlignInfo] = useState("");

  const context = useContext(myContext);
  const navigate = useNavigate();

  useEffect(() => {
    const id = context?.isOppenFullScreenPanel?.id;
    fetchDataFromApi(`/api/bannerV1/${id}`).then((res) => {
      formFields.bannerTitle = res?.data?.banner?.bannerTitle;
      setPreviews(res?.data?.banner?.images);
      formFields.images = res?.data?.banner?.images;
      setProductCat(res?.data?.banner?.catId);
      formFields.catId = res?.data?.banner?.catId;

      setProductSubCat(res?.data?.banner?.subCatId);
      formFields.subCatId = res?.data?.banner?.subCatId;
      setProductThirtLavelCat(res?.data?.banner?.thirdSubCatId);
      formFields.thirdSubCatId = res?.data?.banner?.thirdSubCatId;
      formFields.price = res?.data?.banner?.price;
      setAlignInfo(res?.data?.banner?.alignInfo);
      formFields.alignInfo = res?.data?.banner?.alignInfo;
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

  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
    formFields.catId = event.target.value;
  };

  const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
    formFields.subCatId = event.target.value;
  };

  const handleChangeProductThirtLavelCat = (event) => {
    setProductThirtLavelCat(event.target.value);
    formFields.thirdSubCatId = event.target.value;
  };

  const handleChangeAlignInfo = (event) => {
    setAlignInfo(event.target.value);
    formFields.alignInfo = event.target.value;
  };

  const setPreviewsFun = (previewsArr) => {
    const imgArr = previews;
    for (let i = 0; i < previewsArr.length; i++) {
      imgArr.push(previewsArr[i]);
    }
    setPreviews([]);
    setTimeout(() => {
      setPreviews(imgArr);
      formFields.images = imgArr;
    }, 10);
  };

  const removeImg = (image, index) => {
    var imageArr = [];
    imageArr = previews;
    deleteImages(`/api/bannerV1/deleteimage?img=${image}`).then((res) => {
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

    if (formFields.bannerTitle === "") {
      context.openAlartBox("Error", "Please Enter Banner Title");
      setIsLoading(false);
      return false;
    }
    if (formFields.price === "") {
      context.openAlartBox("Error", "Please Enter Price");
      setIsLoading(false);
      return false;
    }
    if (previews?.length === 0) {
      context.openAlartBox("Error", "Please Select banner images");
      setIsLoading(false);
      return false;
    }

    editData(
      `/api/bannerV1/${context?.isOppenFullScreenPanel?.id}`,
      formFields
    ).then((res) => {
      setTimeout(() => {
        setIsLoading(false);
        context.setIsOppenFullScreenPanel({
          open: false,
        });
        context?.getCat();
        navigate("/banner/list");
      }, 2500);
    });
  };

  return (
    <section className="p-5 bg-gray-50">
      <form action="" className="form py-3 p-8" onSubmit={handelSubmit}>
        <div className="scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4">
          <div className="grid grid-cols-5 mb-3 gap-5">
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Banner Title
              </h3>
              <input
                type="text"
                className="w-full h-[35px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-md p-3 text-sm"
                name="bannerTitle"
                value={formFields.bannerTitle}
                onChange={onChangeInput}
              />
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Category
              </h3>
              {context?.catData?.length !== 0 && (
                <Select
                  labelId="demo-simple-select-label"
                  id="productCatDropdown"
                  size="small"
                  className="w-full"
                  value={productCat}
                  label="Category"
                  onChange={handleChangeProductCat}
                >
                  {context?.catData?.map((cat, index) => {
                    return (
                      <MenuItem value={cat?._id} key={index}>
                        {cat?.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Sub Category
              </h3>
              {context?.catData?.length !== 0 && (
                <Select
                  labelId="demo-simple-select-label"
                  id="productCatDropdown"
                  size="small"
                  className="w-full"
                  value={productSubCat}
                  label="Sub Category"
                  onChange={handleChangeProductSubCat}
                >
                  {context?.catData?.map((cat, index) => {
                    return (
                      cat?.children?.length !== 0 &&
                      cat?.children?.map((subCat, index_) => {
                        return (
                          <MenuItem value={subCat?._id} key={index_}>
                            {subCat?.name}
                          </MenuItem>
                        );
                      })
                    );
                  })}
                </Select>
              )}
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Third lavel Category
              </h3>
              {context?.catData?.length !== 0 && (
                <Select
                  labelId="demo-simple-select-label"
                  id="productCatDropdown"
                  size="small"
                  className="w-full"
                  value={productThirtLavelCat}
                  label="Third Lavel Sub Category"
                  onChange={handleChangeProductThirtLavelCat}
                >
                  {context?.catData?.map((cat) => {
                    return (
                      cat?.children?.length !== 0 &&
                      cat?.children?.map((subCat) => {
                        return (
                          subCat?.children?.length !== 0 &&
                          subCat?.children?.map((thirlavelCat, index) => {
                            return (
                              <MenuItem key={index} value={thirlavelCat?._id}>
                                {thirlavelCat?.name}
                              </MenuItem>
                            );
                          })
                        );
                      })
                    );
                  })}
                </Select>
              )}
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">Price</h3>
              <input
                type="number"
                className="w-full h-[35px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-md p-3 text-sm"
                name="price"
                value={formFields.price}
                onChange={onChangeInput}
              />
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Align Info
              </h3>
              {context?.catData?.length !== 0 && (
                <Select
                  labelId="demo-simple-select-label"
                  id="productCatDropdown"
                  size="small"
                  className="w-full"
                  value={alignInfo}
                  label="Left"
                  onChange={handleChangeAlignInfo}
                >
                  <MenuItem value={"left"}>Left</MenuItem>
                  <MenuItem value={"right"}>Right</MenuItem>
                </Select>
              )}
            </div>
          </div>
          <br />
          <h3 className="text-[18px] font-[500] mb-0 text-black">
            Banner Images
          </h3>
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
                multiple={true}
                name="images"
                url="/api/bannerV1/uploadImages"
                setPreviewsFun={setPreviewsFun}
              />
            </div>
          </div>
        </div>

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

export default EditBannerV1;
