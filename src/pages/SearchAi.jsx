import { useState, useRef } from "react";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);


const Search = () => {
  const [selectedFileType, setSelectedFileType] = useState("text");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [generatedContent, setGeneratedContent] = useState(null);
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileSelect = (file) => {
    const validTypes = [
      "image/jpeg",
      "image/png",
      "application/pdf",
      "image/svg+xml",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (validTypes.includes(file.type)) {
      setUploadedFile(file);
    } else {
      alert("Please upload a valid file (PNG, JPG, PDF, DOCX, or SVG)");
    }
  };

  // Convert uploaded file to Base64 (for Gemini image input)
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleGenerate = async () => {
    if (!prompt && !uploadedFile) {
      alert("Please enter a prompt or upload a file");
      return;
    }

    setIsGenerating(true);
    setGeneratedContent(null);

    try {
      // HuggingFace Text (GPT-2)
      if (selectedFileType === "text") {
        const response = await axios.post(
          "https://api-inference.huggingface.co/models/gpt2",
          { inputs: prompt },
          {
            headers: {
              Authorization: "Bearer YOUR_HUGGING_FACE_API_KEY",
            },
          }
        );
        setGeneratedContent(response.data[0].generated_text);
      }

      // HuggingFace Image (Stable Diffusion)
      else if (selectedFileType === "image") {
        if (uploadedFile && prompt) {
          alert(
            "Image transformation requires a premium API. Using text-to-image instead."
          );
        }

        const response = await axios.post(
          "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
          { inputs: prompt },
          {
            headers: {
              Authorization: "Bearer YOUR_HUGGING_FACE_API_KEY",
            },
            responseType: "blob",
          }
        );

        const imageUrl = URL.createObjectURL(response.data);
        setGeneratedContent(imageUrl);
      }

      // HuggingFace PDF / DOCX Analysis
      else if (selectedFileType === "pdf" && uploadedFile) {
        const formData = new FormData();
        formData.append("file", uploadedFile);
        formData.append("question", prompt || "What is this document about?");

        const response = await axios.post(
          "https://api-inference.huggingface.co/models/impira/layoutlm-document-qa",
          formData,
          {
            headers: {
              Authorization: "Bearer YOUR_HUGGING_FACE_API_KEY",
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setGeneratedContent(response.data.answer);
      }

      // Gemini (Text or Image + Text Analysis)
      else if (selectedFileType === "gemini") {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        if (uploadedFile) {
          const imageBase64 = await fileToBase64(uploadedFile);
          const imagePart = {
            inlineData: {
              data: imageBase64.split(",")[1],
              mimeType: uploadedFile.type,
            },
          };

          const result = await model.generateContent([prompt, imagePart]);
          setGeneratedContent(result.response.text());
        } else {
          const result = await model.generateContent(prompt);
          setGeneratedContent(result.response.text());
        }
      }
    } catch (error) {
      console.error("Error generating content:", error);
      alert("Failed to generate content. Check console for details.");
    }

    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center md:text-left">
                  Interior AI Studio
                </h2>
                <p className="text-gray-600 text-sm md:text-base text-center md:text-left">
                  Your all-in-one AI assistant for generating text, images,
                  document analysis and multimodal with Gemini
                </p>
              </div>
              <div className="relative mb-4">
                <div className="flex flex-col bg-gray-50 rounded-lg border border-gray-300 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                  <textarea
                    className="w-full px-4 py-3 bg-transparent border-none focus:ring-0 resize-none min-h-[120px] text-sm md:text-base"
                    placeholder="Enter your prompt here..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  ></textarea>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-2 border-t border-gray-300 gap-4">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      {[
                        { type: "text", icon: "fa-font", label: "Text" },
                        { type: "image", icon: "fa-image", label: "Image" },
                        { type: "pdf", icon: "fa-file-pdf", label: "PDF/DOCS" },
                        { type: "gemini", icon: "fa-robot", label: "Gemini" },
                      ].map(({ type, icon, label }) => (
                        <button
                          key={type}
                          className={`p-2 rounded-lg transition-colors flex items-center space-x-1 cursor-pointer text-sm ${
                            selectedFileType === type
                              ? "bg-indigo-100 text-indigo-600"
                              : "hover:bg-gray-100"
                          }`}
                          onClick={() => setSelectedFileType(type)}
                        >
                          <i className={`fas ${icon}`}></i>
                          <span>{label}</span>
                        </button>
                      ))}
                    </div>
                    <button
                      className="inline-flex items-center justify-center px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors whitespace-nowrap text-sm"
                      onClick={handleGenerate}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          Generating...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-magic mr-2"></i>
                          Generate
                        </>
                      )}
                    </button>
                  </div>
                </div>
                {selectedFileType !== "text" && (
                  <div className="mt-3 flex flex-col sm:flex-row items-center sm:items-start sm:space-x-4 space-y-2 sm:space-y-0">
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
                        isDragging
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-gray-300"
                      }`}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <i className="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"></i>
                      <p className="text-sm text-gray-600">
                        Drag and drop your {selectedFileType} file here, or
                        click to browse
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        onChange={handleFileUpload}
                        accept={
                          selectedFileType === "image" ||
                          selectedFileType === "gemini"
                            ? "image/*"
                            : selectedFileType === "pdf"
                            ? ".pdf,.doc,.docx,image/svg+xml"
                            : "*"
                        }
                      />
                    </div>
                    {uploadedFile && (
                      <div className="flex items-center space-x-2 text-sm bg-gray-50 p-3 rounded-lg">
                        <i className="fas fa-file text-indigo-600"></i>
                        <span className="text-gray-600 truncate max-w-xs">
                          {uploadedFile.name}
                        </span>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => setUploadedFile(null)}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {generatedContent && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Generated Output:
                  </h3>
                  {selectedFileType === "image" ? (
                    <img
                      src={generatedContent}
                      alt="Generated Output"
                      className="mt-2 max-w-full rounded-lg"
                    />
                  ) : (
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {generatedContent}
                    </p>
                  )}
                </div>
              )}
              <div className="mt-6 text-xs text-gray-500 text-center">
                <p>
                  Powered by Hugging Face and Gemini AI models. Free tiers have
                  rate limits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
