import { useState, useRef } from "react";
import axios from "axios";

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
      setUploadedFile(file);
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
    const validTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (validTypes.includes(file.type)) {
      setUploadedFile(file);
    } else {
      alert("Please upload a valid file (PNG, JPG, or PDF)");
    }
  };

  const handleGenerate = async () => {
    if (!prompt && !uploadedFile) {
      alert("Please enter a prompt or upload a file");
      return;
    }

    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("image", uploadedFile);

    setIsGenerating(true);

    try {
      const response = await axios.post("http://localhost:8000/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const imageUrl = response.data.download_url;
      setGeneratedContent(`Generated Image: ${imageUrl}`);
    } catch (error) {
      console.error("Error generating content:", error);
      alert("Failed to generate content. Check console or backend.");
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
                  CreativeAI Studio
                </h2>
                <p className="text-gray-600 text-sm md:text-base text-center md:text-left">
                  Your all-in-one AI assistant for generating text, images, and
                  document analysis
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
                        { type: "pdf", icon: "fa-file-pdf", label: "PDF" },
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
                    <label className="flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-100">
                      <i className="fas fa-upload"></i>
                      <span>Upload {selectedFileType}</span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileUpload}
                        accept={
                          selectedFileType === "image"
                            ? "image/*"
                            : selectedFileType === "pdf"
                            ? ".pdf"
                            : "*"
                        }
                      />
                    </label>
                    {uploadedFile && (
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="text-gray-600 truncate max-w-xs">
                          {uploadedFile.name}
                        </span>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => setUploadedFile(null)}
                        >
                          <i className="fas fa-times-circle"></i>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {generatedContent && (
                <div className="mt-4">
                  <p className="text-green-700 text-sm md:text-base">
                    {generatedContent}
                  </p>
                  <img
                    src={generatedContent.replace("Generated Image: ", "")}
                    alt="Generated Output"
                    className="mt-2 w-full sm:w-1/2 rounded-lg"
                  />
                </div>
              )}
              {/* <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start">
                <div className="text-sm text-gray-500">Try:</div>
                {[
                  "Write a blog post about the future of AI in healthcare",
                  "Generate an image of a futuristic smart home",
                  "Create a React component for a user profile card",
                ].map((example, index) => (
                  <button
                    key={index}
                    className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full cursor-pointer"
                    onClick={() => setPrompt(example)}
                  >
                    {example.length > 40
                      ? `${example.slice(0, 37)}...`
                      : example}
                  </button>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
