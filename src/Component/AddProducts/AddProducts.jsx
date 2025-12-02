import React, { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Rating from "@mui/material/Rating";
import UploadBox from "../UploadBox/UploadBox";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoMdClose } from "react-icons/io";
import Button from "@mui/material/Button";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useContext } from "react";
import { myContext } from "../../App";
import { deleteImages, fetchDataFromApi, postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const AddProducts = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    images: [],
    brand: "",
    price: "",
    oldPrice: "",
    category: "",
    catName: "",
    catId: "",
    subCatId: "",
    subCat: "",
    thirdSubCat: "",
    thirdSubCatId: "",
    countInStock: "",
    rating: "",
    isFeatured: false,
    discount: "",
    productRam: [],
    size: [],
    productWeight: [],
  });
  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productFeatured, setProductFeatured] = useState("");
  const [productRams, setProductRams] = useState([]);
  const [productRamsData, setProductRamsData] = useState([]);
  const [productWeight, setProductWeight] = useState([]);
  const [productWeightData, setProductWeightData] = useState([]);
  const [productSize, setProductSize] = useState([]);
  const [productSizeData, setProductSizeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [productThirtLavelCat, setProductThirtLavelCat] = useState("");

  const [previews, setPreviews] = useState([]);

  const context = useContext(myContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDataFromApi("/api/product/productRAMS/ramlist").then((res) => {
      if (res?.data?.error === false) {
        setProductRamsData(res?.data?.data);
      }
    });

    fetchDataFromApi("/api/product/productWeight/Weightlist").then((res) => {
      if (res?.data?.error === false) {
        setProductWeightData(res?.data?.data);
      }
    });

    fetchDataFromApi("/api/product/productSize/Sizelist").then((res) => {
      if (res?.data?.error === false) {
        setProductSizeData(res?.data?.data);
      }
    });
  }, []);

  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
    formFields.catId = event.target.value;
    formFields.category = event.target.value;
  };

  const selectCatByname = (name) => {
    formFields.catName = name;
  };

  const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
    formFields.subCatId = event.target.value;
  };

  const selectSubCatByname = (name) => {
    formFields.subCat = name;
  };

  const handleChangeProductThirtLavelCat = (event) => {
    setProductThirtLavelCat(event.target.value);
    formFields.thirdSubCatId = event.target.value;
  };

  const selectSubCatByThirtLavelname = (name) => {
    formFields.thirdSubCat = name;
  };

  const handleChangeProductFeatured = (event) => {
    setProductFeatured(event.target.value);
    formFields.isFeatured = event.target.value;
  };
  const handleChangeProductRams = (event) => {
    const {
      target: { value },
    } = event;
    setProductRams(typeof value === "string" ? value.split(",") : value);
    formFields.productRam = value;
  };
  const handleChangeProductWeight = (event) => {
    const {
      target: { value },
    } = event;
    setProductWeight(typeof value === "string" ? value.split(",") : value);
    formFields.productWeight = value;
  };
  const handleChangeProductSize = (event) => {
    const {
      target: { value },
    } = event;
    setProductSize(typeof value === "string" ? value.split(",") : value);
    formFields.size = value;
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  const onChangeRating = (e) => {
    setFormFields(() => ({
      ...formFields,
      rating: e.target.value,
    }));
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

  const handelSubmit = (e) => {
    e.preventDefault(0);

    if (formFields.name === "") {
      context.openAlartBox("Error", "Please Enter Product name");
      setIsLoading(false);
      return false;
    }
    if (formFields.description === "") {
      context.openAlartBox("Error", "Please Enter Product Description");
      setIsLoading(false);
      return false;
    }
    if (formFields.catId === "") {
      context.openAlartBox("Error", "Please Enter Product Category");
      setIsLoading(false);
      return false;
    }
    if (formFields.price === "") {
      context.openAlartBox("Error", "Please Enter Product Price");
      setIsLoading(false);
      return false;
    }
    if (formFields.oldPrice === "") {
      context.openAlartBox("Error", "Please Enter Product old Price");
      setIsLoading(false);
      return false;
    }
    if (formFields.countInStock === "") {
      context.openAlartBox("Error", "Please Enter Product Stock");
      setIsLoading(false);
      return false;
    }
    if (formFields.brand === "") {
      context.openAlartBox("Error", "Please Enter Product Brand");
      setIsLoading(false);
      return false;
    }
    if (formFields.discount === "") {
      context.openAlartBox("Error", "Please Enter Product discount");
      setIsLoading(false);
      return false;
    }

    if (formFields.rating === "") {
      context.openAlartBox("Error", "Please Enter Product Rating");
      setIsLoading(false);
      return false;
    }
    if (previews?.length === 0) {
      context.openAlartBox("Error", "Please Select Product Images");
      setIsLoading(false);
      return false;
    }

    setIsLoading(true);
   

    postData("/api/product/create", formFields).then((res) => {
      if (res?.error === false) {
        context.openAlartBox("Sucess", res?.message);
        setTimeout(() => {
          setIsLoading(false);
          context.setIsOppenFullScreenPanel({
            open: false,
          });
          navigate("/products");
        }, 1000);
      } else {
        setIsLoading(false);
        context.openAlartBox("Error", res?.message);
      }
    });
  };

  return (
    <section className="p-5 bg-gray-50">
      <form action="" className="form py-3 p-8" onSubmit={handelSubmit}>
        <div className="scroll max-h-[72vh] overflow-y-scroll pr-4">
          <div className="grid grid-cols-1 mb-3">
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Name
              </h3>
              <input
                type="text"
                className="w-full h-[35px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-md p-3"
                name="name"
                value={formFields.name}
                onChange={onChangeInput}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 mb-3">
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Description
              </h3>
              <textarea
                type="text"
                className="w-full h-[140px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-md p-3"
                name="description"
                value={formFields.description}
                onChange={onChangeInput}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 mb-3 gap-3">
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Category
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
                      <MenuItem
                        value={cat?._id}
                        onClick={() => selectCatByname(cat?.name)}
                      >
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
                          <MenuItem
                            value={subCat?._id}
                            onClick={() => selectSubCatByname(subCat?.name)}
                          >
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
                              <MenuItem
                                key={index}
                                value={thirlavelCat?._id}
                                onClick={() =>
                                  selectSubCatByThirtLavelname(
                                    thirlavelCat?.name
                                  )
                                }
                              >
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
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Price
              </h3>
              <input
                type="number"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-md p-3"
                name="price"
                value={formFields.price}
                onChange={onChangeInput}
              />
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Old Price
              </h3>
              <input
                type="number"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-md p-3"
                name="oldPrice"
                value={formFields.oldPrice}
                onChange={onChangeInput}
              />
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Is Featured?
              </h3>
              <Select
                labelId="demo-simple-select-label"
                id="productCatDropdown"
                size="small"
                className="w-full"
                value={productFeatured}
                label="Category"
                onChange={handleChangeProductFeatured}
              >
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </Select>
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Stock
              </h3>
              <input
                type="number"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-md p-3 text-sm"
                name="countInStock"
                value={formFields.countInStock}
                onChange={onChangeInput}
              />
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Brand
              </h3>
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-md p-3 text-sm"
                name="brand"
                value={formFields.brand}
                onChange={onChangeInput}
              />
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Discount
              </h3>
              <input
                type="number"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-md p-3 text-sm"
                name="discount"
                value={formFields.discount}
                onChange={onChangeInput}
              />
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product RAMS
              </h3>
              {productRamsData?.length !== 0 && (
                <Select
                  multiple
                  labelId="demo-simple-select-label"
                  id="productCatDropdown"
                  size="small"
                  className="w-full"
                  value={productRams}
                  label="Category"
                  onChange={handleChangeProductRams}
                >
                  {productRamsData?.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.name}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Weight
              </h3>
              {productWeightData?.length !== 0 && (
                <Select
                  multiple
                  labelId="demo-simple-select-label"
                  id="productCatDropdown"
                  size="small"
                  className="w-full"
                  value={productWeight}
                  label="Category"
                  onChange={handleChangeProductWeight}
                >
                  {productWeightData?.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.name}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Size
              </h3>
              {productSizeData?.length !== 0 && (
                <Select
                  multiple
                  labelId="demo-simple-select-label"
                  id="productCatDropdown"
                  size="small"
                  className="w-full"
                  value={productSize}
                  label="Category"
                  onChange={handleChangeProductSize}
                >
                  {productSizeData?.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.name}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Size
              </h3>
              <Rating
                name="half-rating"
                defaultValue={1}
                precision={0.5}
                onChange={onChangeRating}
              />
            </div>
          </div>

          <div className="col w-full p-5 px-0">
            <h3 className="font-[700] text-[18px] mb-3">Media & Images</h3>
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
                url="/api/product/uploadImages"
                setPreviewsFun={setPreviewsFun}
              />
            </div>
          </div>
        </div>
        <hr />
        <br />
        <Button type="submit" className="btn-blue btn-lg w-full flex gap-2">
          {isLoading ? (
            <CircularProgress
              color="inherit"
              style={{ width: "20px", height: "20px" }}
            />
          ) : (
            <>
              <FaCloudUploadAlt className="text-[25px] text-white" />
              Publish and View
            </>
          )}
        </Button>
      </form>
    </section>
  );
};

export default AddProducts;
