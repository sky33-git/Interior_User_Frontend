import React, { useState, useRef, useEffect } from "react";
import "../App.css"
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
import { IoIosSend } from "react-icons/io";
import { RiKakaoTalkFill } from "react-icons/ri";
import { BsThreeDotsVertical, BsReply } from "react-icons/bs";

const fallbackVideos = [
  {
    id: 1,
    src: "/Video/videoOne.mp4",
    profile: "/Image/userOne.jpg",
    username: "purav_jha",
    title: "Purav Jha revealing his girlfriend for the first time",
    description: "Purav Jha and Dr. Rakshita Singh",
    tags: ["#puravjha", "#shorts", "#fyp", "#harshbenwal"],
    likes: 12500,
    comments: [
      { 
        id: 1,
        user: { 
          name: "geetikesh6362", 
          profilePic: "/Image/userTwo.jpg" 
        },
        text: "Bro is elvish more than elvish",
        likes: 19,
        createdAt: new Date(Date.now() - 15552000000), // 6 months ago
        replies: [
          {
            id: 11,
            user: {
              name: "user123",
              profilePic: "/Image/userOne.jpg"
            },
            text: "So true!",
            likes: 3,
            createdAt: new Date(Date.now() - 12960000000) // 5 months ago
          }
        ]
      },
      { 
        id: 2,
        user: { 
          name: "RaviGothwal-z5v", 
          profilePic: "/Image/userOne.jpg" 
        },
        text: "Elvish kirti reunion",
        likes: 5,
        createdAt: new Date(Date.now() - 18144000000), // 7 months ago
        replies: []
      },
    ],
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
  },
  {
    id: 2,
    src: "/Video/videoTwo.mp4",
    profile: "/Image/userTwo.jpg",
    username: "tech_reviewer",
    title: "New iPhone 15 Pro Max review",
    description: "Unboxing and first impressions",
    tags: ["#iphone", "#tech", "#unboxing"],
    likes: 8700,
    comments: [
      { 
        id: 3,
        user: { 
          name: "tech_lover", 
          profilePic: "https://via.placeholder.com/50" 
        },
        text: "Worth the upgrade?",
        likes: 42,
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
        replies: []
      }
    ],
    timestamp: new Date(Date.now() - 172800000), // 2 days ago
  },
  {
    id: 3,
    src: "/Video/videoThree.mp4",
    profile: "https://via.placeholder.com/50",
    username: "carryminati",
    title: "Roasting Bigg Boss Moments",
    description: "CarryMinati with another savage roast",
    tags: ["#carryminati", "#roast", "#biggboss"],
    likes: 54000,
    comments: [
      { 
        id: 4,
        user: { name: "funnyguy", profilePic: "https://via.placeholder.com/50" },
        text: "Carry never disappoints 🔥",
        likes: 120,
        createdAt: new Date(Date.now() - 43200000), // 12 hours ago
        replies: []
      }
    ],
    timestamp: new Date(Date.now() - 259200000), // 3 days ago
  },
  {
    id: 4,
    src: "/Video/videoFour.mp4",
    profile: "https://via.placeholder.com/50",
    username: "beerbiceps",
    title: "Morning Routine for Success",
    description: "How I structure my day as an entrepreneur",
    tags: ["#motivation", "#morningroutine", "#success"],
    likes: 8900,
    comments: [
      { 
        id: 5,
        user: { name: "lifecoach", profilePic: "https://via.placeholder.com/50" },
        text: "This inspired me to wake up earlier!",
        likes: 34,
        createdAt: new Date(Date.now() - 10800000), // 3 hours ago
        replies: []
      }
    ],
    timestamp: new Date(Date.now() - 432000000), // 5 days ago
  },
  {
    id: 5,
    src: "/Video/videoFive.mp4",
    profile: "https://via.placeholder.com/50",
    username: "elonmuskfan",
    title: "Starship Test Launch Update",
    description: "Latest updates on SpaceX Starship",
    tags: ["#spacex", "#starship", "#elonmusk"],
    likes: 42000,
    comments: [
      { 
        id: 6,
        user: { name: "spacenerd", profilePic: "https://via.placeholder.com/50" },
        text: "The future of space travel 🚀",
        likes: 210,
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
        replies: []
      }
    ],
    timestamp: new Date(Date.now() - 604800000), // 7 days ago
  },
  {
    id: 6,
    src: "/Video/videoSix.mp4",
    profile: "https://via.placeholder.com/50",
    username: "msdhoni",
    title: "CSK Practice Session Highlights",
    description: "Thala Dhoni leading from the front",
    tags: ["#dhoni", "#csk", "#ipl"],
    likes: 35000,
    comments: [
      { 
        id: 7,
        user: { name: "cricketfan", profilePic: "https://via.placeholder.com/50" },
        text: "Whistle Podu 💛",
        likes: 55,
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        replies: []
      }
    ],
    timestamp: new Date(Date.now() - 259200000), // 3 days ago
  },
  {
    id: 7,
    src: "/Video/videoSeven.mp4",
    profile: "https://via.placeholder.com/50",
    username: "arijitsingh",
    title: "Live Performance – Tum Hi Ho",
    description: "Soulful live rendition of Tum Hi Ho",
    tags: ["#arijitsingh", "#music", "#live"],
    likes: 68000,
    comments: [
      { 
        id: 8,
        user: { name: "musiclover", profilePic: "https://via.placeholder.com/50" },
        text: "His voice hits different ❤️",
        likes: 90,
        createdAt: new Date(Date.now() - 5400000), // 1.5 hours ago
        replies: []
      }
    ],
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
  },
  {
    id: 8,
    src: "/Video/videoEight.mp4",
    profile: "https://via.placeholder.com/50",
    username: "sundarpichai",
    title: "Google I/O Highlights",
    description: "AI, Pixel updates, and more",
    tags: ["#google", "#ai", "#pixel"],
    likes: 12000,
    comments: [
      { 
        id: 9,
        user: { name: "techgeek", profilePic: "https://via.placeholder.com/50" },
        text: "Excited for Pixel 9!",
        likes: 15,
        createdAt: new Date(Date.now() - 28800000), // 8 hours ago
        replies: []
      }
    ],
    timestamp: new Date(Date.now() - 172800000), // 2 days ago
  },
  {
    id: 9,
    src: "/Video/videoNine.mp4",
    profile: "https://via.placeholder.com/50",
    username: "viratkohli",
    title: "Virat Kohli Net Practice",
    description: "King Kohli in beast mode 🔥",
    tags: ["#viratkohli", "#cricket", "#rcb"],
    likes: 56000,
    comments: [
      { 
        id: 10,
        user: { name: "rcbfan", profilePic: "https://via.placeholder.com/50" },
        text: "RCB forever ❤️",
        likes: 70,
        createdAt: new Date(Date.now() - 21600000), // 6 hours ago
        replies: []
      }
    ],
    timestamp: new Date(Date.now() - 345600000), // 4 days ago
  },
  {
    id: 10,
    src: "/Video/videoTen.mp4",
    profile: "https://via.placeholder.com/50",
    username: "comedyking",
    title: "Funniest Indian Wedding Moments",
    description: "Compilation of hilarious desi wedding fails",
    tags: ["#wedding", "#comedy", "#shorts"],
    likes: 9800,
    comments: [
      { 
        id: 11,
        user: { name: "lolman", profilePic: "https://via.placeholder.com/50" },
        text: "Indian weddings never disappoint 😂",
        likes: 25,
        createdAt: new Date(Date.now() - 43200000), // 12 hours ago
        replies: []
      }
    ],
    timestamp: new Date(Date.now() - 604800000), // 7 days ago
  }
];


export default function ShortVideoFeed() {
  const containerRef = useRef(null);
  const videoRefs = useRef([]);
  const commentRef = useRef(null);
  const commentInputRef = useRef(null);

  const [videos, setVideos] = useState(fallbackVideos);
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
    videos.forEach(video => {
      initialLikes[video.id] = video.likes;
    });
    setVideoLikes(initialLikes);
  }, [videos]);

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
        container.scrollHeight - 100
      ) {
        // Simulate loading more videos
        const newVideos = [...fallbackVideos].map((video, i) => ({
          ...video,
          id: videos.length + i + 1,
          timestamp: new Date(Date.now() - (i * 86400000))
        }));
        setVideos((prev) => [...prev, ...newVideos]);
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
            videoRefs.current[index]?.play().catch(e => console.log("Autoplay prevented:", e));
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
        [id]: isLiked ? prevLikes[id] + 1 : prevLikes[id] - 1
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
          profilePic: "https://via.placeholder.com/50" 
        },
        text: commentText,
        likes: 0,
        createdAt: new Date(),
        replies: []
      };

      if (replyingTo) {
        setComments(prev => prev.map(comment => {
          if (comment.id === replyingTo) {
            return {
              ...comment,
              replies: [...comment.replies, newComment]
            };
          }
          return comment;
        }));
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
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
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
    { name: "WhatsApp", icon: <FaWhatsapp className="text-green-500 text-2xl" />, color: "bg-green-100" },
    { name: "Facebook", icon: <FaFacebook className="text-blue-600 text-2xl" />, color: "bg-blue-100" },
    { name: "Email", icon: <FaEnvelope className="text-gray-600 text-2xl" />, color: "bg-gray-100" },
    { name: "KakaoTalk", icon: <RiKakaoTalkFill className="text-yellow-400 text-2xl" />, color: "bg-yellow-100" },
    { name: "Copy Link", icon: <FaLink className="text-gray-600 text-2xl" />, color: "bg-gray-100" },
  ];

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
              muted
              loop
              playsInline
            />
            
            {/* Bottom Video Info */}
            <div className="absolute bottom-20 left-4 text-white max-w-xs z-10">
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={video.profile}
                  alt="profile"
                  className="w-8 h-8 rounded-full border border-white object-cover"
                />
                <span className="font-semibold text-sm">@{video.username}</span>
                <button className="text-sm font-bold bg-white text-black px-2 py-0.5 rounded ">
                  View Profile
                </button>
              </div>
              <p className="text-sm font-medium mb-1">{video.title}</p>
              <p className="text-xs opacity-90">{video.description}</p>
              <div className="flex items-center gap-2 mt-1">
                {video.tags?.map((tag, i) => (
                  <span key={i} className="text-xs opacity-80">{tag}</span>
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
                      <p className="text-white text-sm mt-1">
                        {comment.text}
                      </p>
                      <div className="flex items-center gap-4 mt-1">
                        <button className="text-gray-400 text-xs hover:text-white flex items-center gap-1">
                          <FaRegHeart className="text-xs" /> {formatNumber(comment.likes || 0)}
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
                                    <FaRegHeart className="text-xxs" /> {reply.likes || 0}
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
                  onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                  placeholder={
                    replyingTo 
                      ? `Replying to @${comments.find(c => c.id === replyingTo)?.user.name || 'user'}...`
                      : "Add a comment..."
                  }
                  className="flex-1 p-2 px-4 rounded-full bg-gray-700 text-white outline-none text-sm"
                />
                <button
                  onClick={handleAddComment}
                  disabled={!commentText.trim()}
                  className={`p-2 rounded-full ${commentText.trim() ? 'text-blue-500' : 'text-gray-500'}`}
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