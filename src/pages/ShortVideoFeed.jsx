import React, { useState, useRef, useEffect } from "react";
import "../App.css";
import axios from "axios";
import {
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaBookmark,
  FaShare,
  FaEllipsisH,
  FaTimes,
  FaWhatsapp,
  FaFacebook,
  FaEnvelope,
  FaLink,
} from "react-icons/fa";
import { Volume2, VolumeX } from "lucide-react";

import { IoIosSend } from "react-icons/io";
import { RiKakaoTalkFill } from "react-icons/ri";
import { BsThreeDotsVertical, BsReply } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function ShortVideoFeed() {
  const containerRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const videoRefs = useRef([]);
  const commentRef = useRef(null);
  const commentInputRef = useRef(null);

  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedVideos, setLikedVideos] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [showShare, setShowShare] = useState(false);
  const [videoLikes, setVideoLikes] = useState({});
  const [replyingTo, setReplyingTo] = useState(null);

  // Initialize likes from videos data
  useEffect(() => {
    const initialLikes = {};
    videos.forEach((video) => {
      initialLikes[video.id] = video.likes;
    });
    setVideoLikes(initialLikes);
  }, [videos]);

  // Map API product data to video format
  // const mapApiDataToVideos = (products) => {
  //   return products.map((item, index) => ({
  //     id: item._id || index,
  //     src: item.gallery?.[0]?.url, // take first gallery video/image
  //     profile: item.vendorId?.images.profileImage,
  //     username: item.vendorId?.title || "unknown_vendor",
  //     vendorNameId: item.vendorId?._id,
  //     title: item.title,
  //     description: item.shortDescription || item.description || "",
  //     tags: item.metadata?.tags || [],
  //     likes: Math.floor(Math.random() * 5000) + 100, // placeholder until backend provides
  //     comments: [], // empty for now
  //     timestamp: new Date(item.createdAt || Date.now()),
  //   }));
  // };


  const mapApiDataToVideos = (products) => {
  let allVideos = [];

  products.forEach((item, index) => {
    const galleryVideos = (item.gallery || [])
      .filter((g) => g.url) // only those with a url
      .map((g, vidIndex) => ({
        id: `${item._id}-${vidIndex}`, // unique per product-video
        src: g.url,
        profile: item.vendorId?.images?.profileImage,
        username: item.vendorId?.title || "unknown_vendor",
        vendorNameId: item.vendorId?._id,
        title: item.title,
        description: item.shortDescription || item.description || "",
        tags: item.metadata?.tags || [],
        likes: Math.floor(Math.random() * 5000) + 100,
        comments: [],
        timestamp: new Date(item.createdAt || Date.now()),
      }));

    allVideos = [...allVideos, ...galleryVideos];
  });

  return allVideos;
};


  // Fetch videos from API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/products`
        );
        console.log(res.data, "API response");

        const products = res.data?.data?.products || [];
        if (products.length > 0) {
          const mappedVideos = mapApiDataToVideos(products);
          setVideos(mappedVideos);
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

    // const handleScroll = () => {
    //   if (
    //     container.scrollTop + container.clientHeight >=
    //     container.scrollHeight - 100
    //   ) {
    //     // Simulate loading more videos
    //     const newVideos = [...fallbackVideos].map((video, i) => ({
    //       ...video,
    //       id: videos.length + i + 1,
    //       timestamp: new Date(Date.now() - (i * 86400000))
    //     }));
    //     setVideos((prev) => [...prev, ...newVideos]);
    //   }
    // };

    const handleScroll = () => {
      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 100
      ) {
        // if you want to add pagination later, do it here
        console.log("Reached bottom, load more");
      }
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [videos.length]);

  // Auto play/pause based on visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index);
          if (entry.isIntersecting) {
            setCurrentIndex(index);
            videoRefs.current[index]
              ?.play()
              .catch((e) => console.log("Autoplay prevented:", e));
          } else {
            videoRefs.current[index]?.pause();
          }
        });
      },
      { threshold: 0.7 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, [videos]);

  // Like button
  const toggleLike = (id) => {
    setLikedVideos((prev) => {
      const isLiked = !prev[id];
      setVideoLikes((prevLikes) => ({
        ...prevLikes,
        [id]: isLiked ? prevLikes[id] + 1 : prevLikes[id] - 1,
      }));
      return { ...prev, [id]: isLiked };
    });
  };

  // Add comment
  const handleAddComment = () => {
    if (commentText.trim() !== "") {
      const newComment = {
        id: Date.now(),
        user: {
          name: "current_user",
          profilePic: "https://via.placeholder.com/50",
        },
        text: commentText,
        likes: 0,
        createdAt: new Date(),
        replies: [],
      };

      if (replyingTo) {
        setComments((prev) =>
          prev.map((comment) => {
            if (comment.id === replyingTo) {
              return {
                ...comment,
                replies: [...comment.replies, newComment],
              };
            }
            return comment;
          })
        );
        setReplyingTo(null);
      } else {
        setComments((prev) => [newComment, ...prev]);
      }

      setCommentText("");

      // Auto focus back to input after sending
      setTimeout(() => {
        commentInputRef.current?.focus();
      }, 100);
    }
  };

  // Share functions
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

  // Time ago formatter
  const getTimeAgo = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    if (diff < 2592000) return `${Math.floor(diff / 604800)}w ago`;
    if (diff < 31536000) return `${Math.floor(diff / 2592000)}mo ago`;
    return `${Math.floor(diff / 31536000)}y ago`;
  };

  // Format large numbers (like 1.2k)
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  // Close comments on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (commentRef.current && !commentRef.current.contains(event.target)) {
        setShowComments(false);
        setReplyingTo(null);
      }
    }

    if (showComments) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showComments]);

  // Auto focus comment input when comments open
  useEffect(() => {
    if (showComments) {
      setTimeout(() => {
        commentInputRef.current?.focus();
      }, 300);
    }
  }, [showComments]);

  // Share options data
  const shareOptions = [
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="text-green-500 text-2xl" />,
      color: "bg-green-100",
    },
    {
      name: "Facebook",
      icon: <FaFacebook className="text-blue-600 text-2xl" />,
      color: "bg-blue-100",
    },
    {
      name: "Email",
      icon: <FaEnvelope className="text-gray-600 text-2xl" />,
      color: "bg-gray-100",
    },
    {
      name: "KakaoTalk",
      icon: <RiKakaoTalkFill className="text-yellow-400 text-2xl" />,
      color: "bg-yellow-100",
    },
    {
      name: "Copy Link",
      icon: <FaLink className="text-gray-600 text-2xl" />,
      color: "bg-gray-100",
    },
  ];

  const processImageUrl = (
    imageUrl,
    transformations = "c_fill,f_auto,h_50,q_auto,w_50"
  ) => {
    if (!imageUrl) return null;

    if (imageUrl.startsWith("http")) {
      return imageUrl;
    }

    if (imageUrl.includes("/") && !imageUrl.startsWith("http")) {
      return `https://res.cloudinary.com/dbpjwgvst/image/upload/${transformations}/v1/${imageUrl}`;
    }

    return `https://res.cloudinary.com/dbpjwgvst/image/upload/${transformations}/v1/${imageUrl}`;
  };

  const getProfileImageUrl = (imageUrl) => {
    return processImageUrl(imageUrl);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black relative">
      {/* Video Container */}
      <div
        ref={containerRef}
        className="h-screen w-full max-w-[390px] overflow-y-scroll snap-y snap-mandatory bg-black scrollbar-hide"
      >
        {videos.map((video, index) => (
          <div
            key={`${video.id}-${index}`}
            className="h-screen w-full relative flex-shrink-0 snap-start"
          >
            {/* Video Element */}
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={video.src}
              data-index={index}
              className="h-full w-full object-cover"
              muted={muted}
              loop
              playsInline
            />

            <button
              onClick={() => setMuted((m) => !m)}
              className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full p-2"
            >
              {muted ? (
                <VolumeX className="text-white w-6 h-6" />
              ) : (
                <Volume2 className="text-white w-6 h-6" />
              )}
            </button>

            {/* Bottom Video Info */}
            <div className="absolute bottom-20 left-4 text-white max-w-xs z-10">
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={processImageUrl(video?.profile)}
                  alt="profile"
                  className="w-8 h-8 rounded-full border border-white object-cover"
                />
                <Link to={`/design-vendor/${video?.vendorNameId}`}>
                  {" "}
                  <span className="font-semibold text-sm">
                    @{video.username}
                  </span>
                </Link>
                <Link to={`/design-detail/${video.id}`}>
                  <button className="text-sm font-bold bg-white text-black p-3 py-0.5 rounded ">
                    View Product
                  </button>
                </Link>
              </div>
              <p className="text-sm font-medium mb-1">{video.title}</p>
              <p className="text-xs opacity-90">{video.description}</p>
              <div className="flex items-center gap-2 mt-1">
                {video.tags?.map((tag, i) => (
                  <span key={i} className="text-xs opacity-80">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Video Actions Sidebar */}
            <div className="absolute right-4 bottom-20 flex flex-col items-center space-y-5 text-white z-10">
              {/* Like Button */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => toggleLike(video.id)}
                  className="p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition"
                >
                  {likedVideos[video.id] ? (
                    <FaHeart className="text-red-500 text-2xl" />
                  ) : (
                    <FaRegHeart className="text-2xl" />
                  )}
                </button>
                <span className="text-xs font-medium">
                  {formatNumber(videoLikes[video.id] || 0)}
                </span>
              </div>

              {/* Comment Button */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => {
                    setComments(video.comments || []);
                    setShowComments(true);
                  }}
                  className="p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition"
                >
                  <FaRegComment className="text-2xl" />
                </button>
                <span className="text-xs font-medium">
                  {formatNumber(video.comments?.length || 0)}
                </span>
              </div>

              {/* Bookmark Button */}
              {/* <button className="p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition">
                <FaBookmark className="text-2xl" />
              </button> */}

              {/* Share Button */}
              <button
                onClick={() => setShowShare(true)}
                className="p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition"
              >
                <FaShare className="text-2xl" />
              </button>

              {/* More Options */}
              {/* <button className="p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition">
                <BsThreeDotsVertical className="text-xl" />
              </button> */}
            </div>
          </div>
        ))}
      </div>

      {/* Comments Modal */}
      {showComments && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-end">
          <div
            ref={commentRef}
            className="bg-gray-900 rounded-t-xl w-full max-w-[390px] h-[70vh] flex flex-col"
          >
            {/* Comments Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h1 className="text-white font-semibold text-lg">Comments</h1>
              <button
                onClick={() => {
                  setShowComments(false);
                  setReplyingTo(null);
                }}
                className="text-gray-400 hover:text-white"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4 scrollbar-hide">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <img
                      src={comment.user.profilePic}
                      alt={comment.user.name}
                      className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold text-sm">
                          @{comment.user.name}
                        </span>
                        <span className="text-gray-400 text-xs">
                          {getTimeAgo(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-white text-sm mt-1">{comment.text}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <button className="text-gray-400 text-xs hover:text-white flex items-center gap-1">
                          <FaRegHeart className="text-xs" />{" "}
                          {formatNumber(comment.likes || 0)}
                        </button>
                        <button
                          onClick={() => setReplyingTo(comment.id)}
                          className="text-gray-400 text-xs hover:text-white flex items-center gap-1"
                        >
                          <BsReply className="text-xs" /> Reply
                        </button>
                      </div>

                      {/* Reply indicator */}
                      {replyingTo === comment.id && (
                        <div className="text-xs text-blue-400 mt-1">
                          Replying to @{comment.user.name}
                        </div>
                      )}

                      {/* Nested Comments */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-2 ml-4 pl-4 border-l border-gray-700 space-y-3">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex gap-3 pt-2">
                              <img
                                src={reply.user.profilePic}
                                alt={reply.user.name}
                                className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                              />
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-white font-semibold text-xs">
                                    @{reply.user.name}
                                  </span>
                                  <span className="text-gray-400 text-xxs">
                                    {getTimeAgo(reply.createdAt)}
                                  </span>
                                </div>
                                <p className="text-white text-xs mt-1">
                                  {reply.text}
                                </p>
                                <div className="flex items-center gap-4 mt-1">
                                  <button className="text-gray-400 text-xxs hover:text-white flex items-center gap-1">
                                    <FaRegHeart className="text-xxs" />{" "}
                                    {reply.likes || 0}
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-400">No comments yet</p>
                </div>
              )}
            </div>

            {/* Add Comment Input */}
            <div className="p-3 border-t border-gray-700 bg-gray-900">
              <div className="flex items-center gap-2">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Your profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <input
                  ref={commentInputRef}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
                  placeholder={
                    replyingTo
                      ? `Replying to @${
                          comments.find((c) => c.id === replyingTo)?.user
                            .name || "user"
                        }...`
                      : "Add a comment..."
                  }
                  className="flex-1 p-2 px-4 rounded-full bg-gray-700 text-white outline-none text-sm"
                />
                <button
                  onClick={handleAddComment}
                  disabled={!commentText.trim()}
                  className={`p-2 rounded-full ${
                    commentText.trim() ? "text-blue-500" : "text-gray-500"
                  }`}
                >
                  <IoIosSend className="text-xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShare && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl w-full max-w-sm p-4 mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-lg font-semibold">Share</h2>
              <button
                onClick={() => setShowShare(false)}
                className="text-gray-400 hover:text-white"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {shareOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={() => {
                    if (option.name === "Copy Link") handleCopyLink();
                    else if (option.name === "WhatsApp") handleWhatsAppShare();
                  }}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg ${option.color} hover:opacity-90 transition`}
                >
                  <div className="mb-2">{option.icon}</div>
                  <span className="text-xs font-medium">{option.name}</span>
                </button>
              ))}
            </div>

            <div className="bg-gray-700 rounded-lg p-3 mb-4">
              <p className="text-white text-xs mb-2">Link</p>
              <div className="flex items-center justify-between bg-gray-800 rounded px-3 py-2">
                <p className="text-white text-sm truncate">
                  https://youtube.com/shorts/kpQwQZbp3eY?si=jClbC
                </p>
                <button
                  onClick={handleCopyLink}
                  className="text-blue-500 text-sm font-medium ml-2"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
