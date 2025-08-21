import { useState, useRef } from "react";

const AIChatGenerator = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [messages, setMessages] = useState([
    {
      type: "ai",
      content:
        "Hello! I'm your AI image generation assistant. Upload an image and provide a prompt to get started, or ask me to create something new!",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedModel, setSelectedModel] = useState("stable-diffusion");
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleFileSelect = (file) => {
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    if (validTypes.includes(file.type)) {
      setUploadedFile(file);

      setMessages((prev) => [
        ...prev,
        {
          type: "user",
          content: `Uploaded image: ${file.name}`,
          timestamp: new Date(),
          file: file,
        },
      ]);
    } else {
      alert("Please upload a valid image file (JPEG, PNG, GIF, or WEBP)");
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() && !uploadedFile) return;

    const userMessage = {
      type: "user",
      content: newMessage,
      timestamp: new Date(),
      file: uploadedFile,
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setUploadedFile(null);

    setIsGenerating(true);

    setTimeout(() => {
      const aiResponse = {
        type: "ai",
        content:
          "Here's the generated image based on your request. What would you like to modify?",
        timestamp: new Date(),
        image:
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsGenerating(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row h-[80vh]">
          {/* Upload Section */}
          <div className="w-full md:w-2/5 p-6 border-r border-gray-200 flex flex-col overflow-y-auto">
            <div className="mb-6 shrink-0">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                AI Image Generator
              </h2>
              <p className="text-gray-600">
                Upload an image and describe what you want to create
              </p>
            </div>

            <div
              className="border-2 border-dashed border-indigo-300 rounded-xl p-8 text-center cursor-pointer flex flex-col items-center justify-center flex-1 mb-4 bg-indigo-50 hover:bg-indigo-100 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <i className="fas fa-cloud-upload-alt text-4xl text-indigo-500 mb-4"></i>
              <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                Upload Your Image
              </h3>
              <p className="text-gray-600">
                Drag & drop your image here or click to browse
              </p>
              <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium">
                <i className="fas fa-upload mr-2"></i> Browse Files
              </button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept="image/*"
              />
            </div>

            {uploadedFile && (
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="text-gray-700">
                  <span className="font-semibold">{uploadedFile.name}</span>{" "}
                  ready for processing
                </p>
                <p className="text-sm text-gray-500">
                  Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            )}

            <div className="mb-4 shrink-0">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Initial Prompt
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Describe what you want to generate or modify..."
                rows="3"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              ></textarea>
            </div>

            <div className="mb-4 shrink-0">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                AI Model
              </label>
              <div className="flex space-x-2">
                {[
                  { id: "stable-diffusion", name: "Stable Diffusion" },
                  { id: "dall-e", name: "DALL-E" },
                  { id: "midjourney", name: "Midjourney" },
                ].map((model) => (
                  <button
                    key={model.id}
                    className={`px-3 py-2 rounded-lg text-sm font-medium ${
                      selectedModel === model.id
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => setSelectedModel(model.id)}
                  >
                    {model.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center shrink-0"
              onClick={handleSendMessage}
              disabled={isGenerating || (!newMessage && !uploadedFile)}
            >
              {isGenerating ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Generating...
                </>
              ) : (
                <>
                  <i className="fas fa-magic mr-2"></i>
                  Generate Image
                </>
              )}
            </button>
          </div>

          {/* Chat Section */}
          <div className="w-full md:w-3/5 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 max-w-[80%] ${
                    message.type === "user" ? "ml-auto" : "mr-auto"
                  }`}
                >
                  <div
                    className={`rounded-2xl p-4 ${
                      message.type === "user"
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-800 border border-gray-200"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-sm">
                        {message.type === "user" ? "You" : "AI Assistant"}
                      </span>
                      <span
                        className={`text-xs ${
                          message.type === "user"
                            ? "text-indigo-200"
                            : "text-gray-500"
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </span>
                    </div>

                    <p className="mb-2">{message.content}</p>

                    {message.file && (
                      <div className="mt-2 p-2 bg-black bg-opacity-20 rounded-lg">
                        <p className="text-sm">Uploaded: {message.file.name}</p>
                      </div>
                    )}

                    {message.image && (
                      <img
                        src={message.image}
                        alt="Generated content"
                        className="mt-3 rounded-lg max-w-full"
                      />
                    )}
                  </div>
                </div>
              ))}

              {isGenerating && (
                <div className="mb-4 mr-auto max-w-[80%]">
                  <div className="bg-white rounded-2xl p-4 border border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-sm">
                        AI Assistant
                      </span>
                      <span className="text-xs text-gray-500">Now</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="mr-2">Generating response</span>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 shrink-0 bg-white">
              <div className="flex space-x-2">
                <input
                  type="text"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Type your message here..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button
                  className="px-5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center"
                  onClick={handleSendMessage}
                  disabled={isGenerating || !newMessage.trim()}
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatGenerator;
