import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaBookmark,
  FaShare,
} from "react-icons/fa";

const fallbackVideos = [
  {
    id: 1,
    src: "/Video/videoOne.mp4",
    profile: "https://via.placeholder.com/50",
    title: "Instagram account recovery",
    description: "Help us confirm your account",
    likes: 12,
    comments: [
      { text: "Nice video!" },
      { text: "Awesome work!" },
      { text: "Nice video!" },
      { text: "Awesome work!" },
    ],
  },
  {
    id: 2,
    src: "/Video/videoTwo.mp4",
    profile: "https://via.placeholder.com/50",
    title: "New Feature Demo",
    description: "Testing video scrolling UI",
    likes: 5,
    comments: [{ text: "Cool!" }],
  },
];

export default function ShortVideoFeed() {
  const containerRef = useRef(null);
  const videoRefs = useRef([]);
  const commentRef = useRef(null);

  const [videos, setVideos] = useState(fallbackVideos);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedVideos, setLikedVideos] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [showShare, setShowShare] = useState(false);

  // Fetch videos from API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("/api/videos");
        if (Array.isArray(res.data) && res.data.length > 0) {
          setVideos(res.data);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, []);

  // Infinite scroll (load more when near bottom)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 5
      ) {
        // Append more videos (fake API pagination here)
        setVideos((prev) => [...prev, ...fallbackVideos]);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto play/pause based on visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index);
          if (entry.isIntersecting) {
            setCurrentIndex(index);
            videoRefs.current[index]?.play();
          } else {
            videoRefs.current[index]?.pause();
          }
        });
      },
      { threshold: 0.6 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, [videos]);

  // Like button
  const toggleLike = (id) => {
    setLikedVideos((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Add comment
  const handleAddComment = () => {
    if (commentText.trim() !== "") {
      setComments((prev) => [commentText, ...prev]);
      setCommentText("");
    }
  };

  // Share
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
    setShowShare(false);
  };

  const handleWhatsAppShare = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://wa.me/?text=${url}`, "_blank");
    setShowShare(false);
  };

  // Time ago
  const getTimeAgo = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  // Close comments on outside click or scroll
  useEffect(() => {
    function handleClickOutside(event) {
      if (commentRef.current && !commentRef.current.contains(event.target)) {
        setShowComments(false);
      }
    }
    function handleScroll() {
      setShowComments(false);
    }
    if (showComments) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("scroll", handleScroll, true);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleScroll, true);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, [showComments]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-black relative">
      {/* Video Container */}
      <div
        ref={containerRef}
        className="h-screen w-full max-w-[390px] overflow-y-scroll snap-y snap-mandatory bg-black"
      >
        {videos.map((video, index) => (
          <div
            key={`${video.id}-${index}`}
            className="h-screen w-full relative flex-shrink-0 snap-start"
          >
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={video.src}
              data-index={index}
              className="h-full w-full object-cover"
              muted
              loop
              playsInline
            />
            <div className="absolute top-4 left-4 flex items-center space-x-2">
              <img
                src={video.profile}
                alt="profile"
                className="w-10 h-10 rounded-full border border-white"
              />
              <span className="text-white font-semibold">{video.title}</span>
            </div>
            <div className="absolute bottom-24 left-4 text-white max-w-xs">
              <p className="text-sm opacity-80">{video.description}</p>
              <button className="mt-2 px-4 py-1 bg-blue-500 rounded-full text-sm">
                View
              </button>
            </div>
            <div className="absolute right-4 bottom-24 flex flex-col items-center space-y-6 text-white text-xl">
              <button onClick={() => toggleLike(video.id)}>
                {likedVideos[video.id] ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart />
                )}
              </button>
              <span className="text-sm">{video.likes || 0}</span>
              <button
                onClick={() => {
                  setComments(video.comments || []);
                  setShowComments(true);
                }}
              >
                <FaRegComment />
              </button>
              <button>
                <FaBookmark />
              </button>
              <button onClick={() => setShowShare(true)}>
                <FaShare />
              </button>
            </div>
          </div>
        ))}
      </div>

  {/* Comments Modal */}
{showComments && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-end">
    <div
      ref={commentRef}
      className="bg-gray-800 rounded-t-xl w-full max-w-[390px] max-h-[70%] flex flex-col"
    >
      <div className="flex justify-between p-2 border-b border-gray-700">
        <h1 className="text-white">Comments</h1>
        <button
          onClick={() => setShowComments(false)}
          className="text-red-500 text-sm"
        >
          X
        </button>
      </div>
      <div
        className="flex-1 space-y-3 pr-2 overflow-y-auto"
        style={{ maxHeight: "200px" }}
      >
        {comments.length > 0 ? (
          comments.map((c, i) => {
            const userName = c.user?.name || "Anonymous";
            const profilePic =
              c.user?.profilePic || "/default-avatar.png";
            const createdAt = c.createdAt
              ? new Date(c.createdAt)
              : new Date();
            return (
              <div
                key={i}
                className="flex items-start border border-gray-500 rounded-lg pl-5 pt-1 gap-2"
              >
                <img
                  src={profilePic}
                  alt={userName}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium text-sm">
                      {userName}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {getTimeAgo(createdAt)}
                    </span>
                  </div>
                  <p className="text-white text-sm bg-gray-800 p-2 rounded break-words">
                    {c.text || c}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-400 text-center">No comments yet</p>
        )}
      </div>
      <div className="flex mt-2 border-t border-gray-700">
        <input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 p-2 rounded-l bg-gray-700 text-white outline-none"
        />
        <button
          onClick={handleAddComment}
          className="px-4 bg-blue-500 rounded-r text-white"
        >
          Send
        </button>
      </div>
    </div>
  </div>
)}


      {/* Share Modal */}
      {showShare && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center space-y-4 z-50">
          <button
            onClick={() => setShowShare(false)}
            className="text-white absolute top-4 right-4"
          >
            Close
          </button>
          <button
            onClick={handleCopyLink}
            className="px-4 py-2 bg-gray-700 text-white rounded"
          >
            Copy Link
          </button>
          <button
            onClick={handleWhatsAppShare}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Share on WhatsApp
          </button>
        </div>
      )}
    </div>
  );
}
