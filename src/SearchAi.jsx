// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
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
      {/* <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Assistant
          </h1>
          <p className="text-lg text-gray-600">
            Enter your prompt, upload images or PDFs, and let AI help you
            analyze and generate content.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div
            className={`relative mb-6 ${
              isDragging ? "border-indigo-500" : "border-gray-300"
            } border-2 border-dashed rounded-lg transition-colors`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <textarea
              className="w-full px-4 py-3 min-h-[120px] bg-transparent border-none focus:ring-0 resize-none"
              placeholder="Enter your prompt here or drag & drop files (PNG, JPG, PDF)..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600"
                >
                  <i className="fas fa-paperclip"></i>
                  <span>Attach file</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".png,.jpg,.jpeg,.pdf"
                  onChange={(e) => handleFileSelect(e.target.files[0])}
                />
                {uploadedFile && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <i
                      className={`fas ${
                        uploadedFile.type.includes("image")
                          ? "fa-image"
                          : "fa-file-pdf"
                      }`}
                    ></i>
                    <span className="truncate max-w-xs">
                      {uploadedFile.name}
                    </span>
                    <button
                      onClick={() => setUploadedFile(null)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                )}
              </div>
              <button
                className={`px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2 whitespace-nowrap !rounded-button ${
                  isGenerating ? "opacity-75 cursor-not-allowed" : ""
                }`}
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-wand-magic-sparkles"></i>
                    <span>Generate</span>
                  </>
                )}
              </button>
            </div>
          </div>
          {generatedContent && (
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">
                  Generated Response
                </h3>
                <button
                  className="text-gray-500 hover:text-gray-700 p-1"
                  onClick={() =>
                    navigator.clipboard.writeText(generatedContent)
                  }
                >
                  <i className="fas fa-copy"></i>
                </button>
              </div>
              <div className="whitespace-pre-wrap text-gray-700">
                {generatedContent}
              </div>
            </div>
          )}
        </div>
      </div> */}

      {/* Hero Section */}
      {/* <div className="relative">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=futuristic%20AI%20technology%20concept%20with%20glowing%20digital%20interface%2C%20abstract%20data%20visualization%2C%20blue%20and%20purple%20color%20scheme%2C%20clean%20modern%20design%20with%20soft%20lighting%20effects%2C%20high-tech%20atmosphere%20with%20subtle%20grid%20patterns&width=1440&height=500&seq=2&orientation=landscape"
            alt="AI Technology Hero"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Your All-in-One AI Assistant
          </h2>
          <p className="text-xl text-gray-200 max-w-2xl mb-8">
            Generate text, images, analyze documents, and more with our powerful
            AI tool. Simply enter your prompt and let our AI do the work.
          </p>
        </div>
      </div> */}
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* AI Content Generator Section */}
        <div className="mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  CreativeAI Studio
                </h2>
                <p className="text-gray-600">
                  Your all-in-one AI assistant for generating text, images, and
                  document analysis
                </p>
              </div>
              <div className="relative mb-4">
                <div className="flex flex-col bg-gray-50 rounded-lg border border-gray-300 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                  <textarea
                    className="w-full px-4 py-3 bg-transparent border-none focus:ring-0 resize-none min-h-[120px]"
                    placeholder="Enter your prompt here... (e.g., 'Write a blog post about AI technology' or 'Generate an image of a futuristic city')"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  ></textarea>
                  <div className="flex items-center justify-between px-4 py-2 border-t border-gray-300">
                    <div className="flex items-center space-x-4">
                      <button
                        className={`p-2 rounded-lg transition-colors flex items-center space-x-1 cursor-pointer ${
                          selectedFileType === "text"
                            ? "bg-indigo-100 text-indigo-600"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => setSelectedFileType("text")}
                      >
                        <i className="fas fa-font text-lg"></i>
                        <span className="text-sm">Text</span>
                      </button>
                      <button
                        className={`p-2 rounded-lg transition-colors flex items-center space-x-1 cursor-pointer ${
                          selectedFileType === "image"
                            ? "bg-indigo-100 text-indigo-600"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => setSelectedFileType("image")}
                      >
                        <i className="fas fa-image text-lg"></i>
                        <span className="text-sm">Image</span>
                      </button>
                      <button
                        className={`p-2 rounded-lg transition-colors flex items-center space-x-1 cursor-pointer ${
                          selectedFileType === "pdf"
                            ? "bg-indigo-100 text-indigo-600"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => setSelectedFileType("pdf")}
                      >
                        <i className="fas fa-file-pdf text-lg"></i>
                        <span className="text-sm">PDF</span>
                      </button>
                      <button
                        className={`p-2 rounded-lg transition-colors flex items-center space-x-1 cursor-pointer ${
                          selectedFileType === "code"
                            ? "bg-indigo-100 text-indigo-600"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => setSelectedFileType("code")}
                      >
                        <i className="fas fa-code text-lg"></i>
                        <span className="text-sm">Code</span>
                      </button>
                    </div>
                    <button
                      className="inline-flex items-center px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors whitespace-nowrap !rounded-button"
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
                  <div className="mt-3 flex items-center space-x-4">
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
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600 truncate max-w-xs">
                          {uploadedFile.name}
                        </span>
                        <button
                          className="text-red-500 hover:text-red-700 cursor-pointer"
                          onClick={() => setUploadedFile(null)}
                        >
                          <i className="fas fa-times-circle"></i>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {/* {generatedContent && (
                <div className="mt-6 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                    <h3 className="font-medium text-gray-900">
                      Generated Content
                    </h3>
                    <div className="flex space-x-2">
                      <button className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-200 cursor-pointer">
                        <i className="fas fa-copy"></i>
                      </button>
                      <button className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-200 cursor-pointer">
                        <i className="fas fa-download"></i>
                      </button>
                      <button className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-200 cursor-pointer">
                        <i className="fas fa-share-alt"></i>
                      </button>
                    </div>
                  </div>
                  <div className="h-[300px] p-4 overflow-y-auto">
                    <div className="text-gray-700 whitespace-pre-wrap">
                      {generatedContent.content}
                      {selectedFileType === "image" && (
                        <div className="mt-4">
                          <img
                            src="https://readdy.ai/api/search-image?query=futuristic%20city%20skyline%20with%20tall%20skyscrapers%2C%20flying%20vehicles%2C%20holographic%20advertisements%2C%20neon%20lights%2C%20dramatic%20lighting%2C%20detailed%20architectural%20elements%2C%20sci-fi%20atmosphere%2C%20digital%20art%20style%20with%20vibrant%20colors%20and%20high%20contrast&width=800&height=500&seq=3&orientation=landscape"
                            alt="AI Generated Image"
                            className="w-full h-auto rounded-lg shadow-md"
                          />
                          <p className="mt-2 text-sm text-gray-500 italic">
                            AI-generated image based on your prompt
                          </p>
                        </div>
                      )}
                      {selectedFileType === "code" && (
                        <div className="mt-4 bg-gray-800 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                          {`// React component for a simple AI chat interface
import React, { useState } from 'react';
const AIChat = () => {
const [messages, setMessages] = useState([]);
const [input, setInput] = useState('');
const handleSend = () => {
if (input.trim() === '') return;
// Add user message
const newMessages = [...messages, { text: input, sender: 'user' }];
setMessages(newMessages);
setInput('');
// Simulate AI response
setTimeout(() => {
setMessages([
...newMessages,
{
text: 'This is an AI-generated response to your message.',
sender: 'ai'
}
]);
}, 1000);
};
return (
<div className="chat-container">
<div className="messages">
{messages.map((msg, index) => (
<div key={index} className={\`message \${msg.sender}\`}>
{msg.text}
</div>
))}
</div>
<div className="input-area">
<input
value={input}
onChange={(e) => setInput(e.target.value)}
placeholder="Type your message..."
onKeyPress={(e) => e.key === 'Enter' && handleSend()}
/>
<button onClick={handleSend}>Send</button>
</div>
</div>
);
};
export default AIChat;`}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )} */}
              {generatedContent && (
                <div className="mt-4">
                  <p className="text-green-700">{generatedContent}</p>
                  <img
                    src={generatedContent.replace("Generated Image: ", "")}
                    alt="Generated Output"
                    className="mt-2 w-1/2"
                  />
                </div>
              )}
              <div className="mt-6 flex flex-wrap gap-2">
                <div className="text-sm text-gray-500">Try:</div>
                <button
                  className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full cursor-pointer"
                  onClick={() =>
                    setPrompt(
                      "Write a blog post about the future of AI in healthcare"
                    )
                  }
                >
                  Blog post about AI in healthcare
                </button>
                <button
                  className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full cursor-pointer"
                  onClick={() =>
                    setPrompt("Generate an image of a futuristic smart home")
                  }
                >
                  Image of futuristic smart home
                </button>
                <button
                  className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full cursor-pointer"
                  onClick={() =>
                    setPrompt(
                      "Create a React component for a user profile card"
                    )
                  }
                >
                  React component code
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Features Section */}
      </div>
    </div>
  );
};
export default Search;
