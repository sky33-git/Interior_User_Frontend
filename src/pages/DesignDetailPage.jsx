import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

const DesignDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("🔍 Fetching product with ID:", id);
        setLoading(true);
        setError("");

        const response = await api.products.getProductById(id);

        console.log("🔍 Product response:", response);

        if (response.success && response.product) {
          console.log("✅ Product loaded:", response.product);
          setProduct(response.product);
        } else {
          console.error("❌ Product not found in response");
          setError("Product not found");
        }
      } catch (error) {
        console.error("❌ Failed to fetch product:", error);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const formatPrice = (priceRange) => {
    if (!priceRange || (!priceRange.min && !priceRange.max)) {
      return "Price on Request";
    }

    const currency = priceRange.currency || "INR";
    const symbol = currency === "INR" ? "₹" : "$";

    if (priceRange.min && priceRange.max) {
      return `${symbol}${priceRange.min.toLocaleString()} - ${symbol}${priceRange.max.toLocaleString()}`;
    } else if (priceRange.min) {
      return `Starting ${symbol}${priceRange.min.toLocaleString()}`;
    } else {
      return "Price on Request";
    }
  };

  // ✅ FIXED: Better image URL handling
  const getProductImage = (product) => {
    // Use processed imageUrl first, then fallback to thumbnailImage, then placeholder
    return (
      product.imageUrl || product.thumbnailImage || "/placeholder-image.jpg"
    );
  };

  const getGalleryImages = (product) => {
    // Use processed galleryUrls first, then fallback to galleryImages
    return product.galleryUrls || product.galleryImages || [];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading design details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h2>
          <p className="text-red-600 mb-6">{error}</p>
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Debug Info:</strong>
              <br />
              Product ID: {id}
              <br />
              Error: {error}
            </p>
          </div>
          <Button
            onClick={() => window.history.back()}
            className="bg-amber-500 hover:bg-amber-600 text-white mt-4"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const galleryImages = getGalleryImages(product);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 py-12">
    
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* ✅ FIXED: Image section with proper URL handling */}
          <div className="relative h-[500px] lg:h-[800px] rounded-xl overflow-hidden shadow-lg">
            <img
              src={product.thumbnailImage.url}
              alt={product.name}
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                console.warn(`❌ Image failed to load: ${e.target.src}`);
                e.target.src = "/placeholder-image.jpg";
              }}
              onLoad={() => {
                console.log("✅ Main image loaded successfully");
              }}
            />

            {/* ✅ FIXED: Gallery images with proper URL handling */}
            {galleryImages && galleryImages.length > 0 && (
              <div className="absolute bottom-4 left-4 flex space-x-2">
                {galleryImages.slice(0, 3).map((image, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 rounded-lg overflow-hidden border-2 border-white"
                  >
                    <img
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.warn(
                          `❌ Gallery image ${index + 1} failed to load: ${
                            e.target.src
                          }`
                        );
                        e.target.src = "/placeholder-image.jpg";
                      }}
                    />
                  </div>
                ))}
                {galleryImages.length > 3 && (
                  <div className="w-12 h-12 rounded-lg bg-black bg-opacity-50 border-2 border-white flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">
                      +{galleryImages.length - 3}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Product details section - unchanged */}
          <div className="relative">
            <div className="absolute top-0 right-0 flex space-x-3">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full !rounded-button cursor-pointer"
              >
                <i className="fas fa-share-alt text-gray-600"></i>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full !rounded-button cursor-pointer"
                onClick={toggleFavorite}
              >
                <i
                  className={`${
                    isFavorite
                      ? "fas fa-heart text-red-500"
                      : "far fa-heart text-gray-600"
                  }`}
                ></i>
              </Button>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 pr-20 mb-6 leading-tight">
              {product.name}
            </h1>

            <div className="flex flex-wrap gap-3 mb-8">
              {/* <Badge className="px-4 py-2 bg-amber-100 text-amber-800 hover:bg-amber-200 !rounded-button whitespace-nowrap cursor-pointer">
                <i className="fas fa-palette mr-2"></i> Customisable Designs
              </Badge> */}
              {/* {product.rating && (
								<Badge className="px-4 py-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 !rounded-button whitespace-nowrap cursor-pointer">
									<i className="fas fa-star mr-2"></i> {product.rating} rating
								</Badge>
							)} */}
              {product.durationEstimate && (
                <Badge className="px-4 py-2 bg-purple-100 text-purple-800 hover:bg-purple-200 !rounded-button whitespace-nowrap cursor-pointer">
                  <i className="fas fa-truck mr-2"></i>{" "}
                  {product.durationEstimate} delivery
                </Badge>
              )}
              {/* <Badge className="px-4 py-2 bg-blue-100 text-blue-800 hover:bg-blue-200 !rounded-button whitespace-nowrap cursor-pointer">
								<i className="fas fa-shield-alt mr-2"></i> Flat 10 year warranty
							</Badge>
							<Badge className="px-4 py-2 bg-green-100 text-green-800 hover:bg-green-200 !rounded-button whitespace-nowrap cursor-pointer">
								<i className="fas fa-credit-card mr-2"></i> Easy EMIs
							</Badge> */}
            </div>

            <Card className="p-6 mb-8 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-5">
                {product.category} Design Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Category</p>
                  <p className="text-base font-medium">{product.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Price Range</p>
                  <p className="text-base font-medium">
                    {formatPrice(product.priceRange)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Vendor</p>
                  <p className="text-base font-medium">{product.vendorName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Duration</p>
                  <p className="text-base font-medium">
                    {product.durationEstimate || "Contact for details"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Layout</p>
                  <p className="text-base font-medium">
                    {product?.layout || "L Shape  Design"}
                  </p>
                </div>

				 <div>
                  <p className="text-sm text-gray-500 mb-1">Room Dimension: </p>
                  <p className="text-base font-medium">
                    {product?.layout || ": 12x16 feet"}
                  </p>
                </div>
				<div>
                  <p className="text-sm text-gray-500 mb-1">Countertop Material</p>
                  <p className="text-base font-medium">
                    {product?.layout || " Marble"}
                  </p>
                </div>
				<div>
                  <p className="text-sm text-gray-500 mb-1">Shutter finish </p>
                  <p className="text-base font-medium">
                    {product?.layout || "Laminate in Suede finish"}
                  </p>
                </div>
				<div>
                  <p className="text-sm text-gray-500 mb-1">Storage Features</p>
                  <p className="text-base font-medium">
                    {product?.layout || "Vanity unit with Drawer"}
                  </p>
                </div>
				<div>
                  <p className="text-sm text-gray-500 mb-1">Special Features:</p>
                  <p className="text-base font-medium">
                    {product?.layout || "Subtle recessed ceiling lighting adds depth and highlights the clean, contemporary design while maintaining practical illumination."}
                  </p>
                </div>
				<div>
                  <p className="text-sm text-gray-500 mb-1">Style: </p>
                  <p className="text-base font-medium">
                    {product?.layout || "Contemporary"}
                  </p>
                </div>
				<div>
                  <p className="text-sm text-gray-500 mb-1">Ideal for: </p>
                  <p className="text-base font-medium">
                    {product?.layout || "Medium-sized families"}
                  </p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Description</p>
                <p className="text-base">{product.shortDescription}</p>
              </div>

              {product.materialsUsed && product.materialsUsed.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Materials Used</p>
                    <p className="text-base font-medium">
                      {product.materialsUsed.join(", ")}
                    </p>
                  </div>
                  {product.consultationFee > 0 && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Consultation Fee
                      </p>
                      <p className="text-base font-medium">
                        ₹{product.consultationFee.toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </Card>

            {product.features && product.features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Key Features
                </h3>
                <ul className="space-y-2 pl-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
{/* 
            {product.fullDescription && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Detailed Description
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.fullDescription}
                </p>
              </div>
            )} */}

            {/* <Button className="w-full py-6 text-lg bg-amber-500 hover:bg-amber-600 text-white !rounded-button whitespace-nowrap cursor-pointer">
              Request Consultation
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignDetailPage;
