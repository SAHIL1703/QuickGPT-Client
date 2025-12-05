import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import Message from "./Message";
import toast from "react-hot-toast";

const ChatBox = () => {
  const containerRef = useRef(null);

  const { selectedChat, theme ,user , axios , token , setUser } = useAppContext();

  const [mode, setMode] = useState("text");
  const [prompt, setPrompt] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  const onSubmit = async (e) => {
    
    try {
      e.preventDefault();
      if(!user) return toast('Login To Send Message')
        setLoading(true)
        const promptCopy = prompt
        setPrompt('')
        setMessages(prev=>[...prev , {role : 'user' , content : prompt , timestamp : Date.now() , isImage : false}]);

        const {data} = await axios.post(`/api/message/${mode}` , {chatId : selectedChat._id , prompt , isPublished} , {headers : {Authorization : token}})

        if(data.success){
          setMessages(prev=>[...prev , data.reply]);
          //Decrease Credits
          if(mode==='image'){
            setUser(prev => ({ ...prev, credits: prev.credits - 2 }));

          }else{
            setUser(prev => ({ ...prev, credits: prev.credits - 1 }));

          }
        }else{
          toast.error(data.message)
          setPrompt(promptCopy)
        }

    } catch (error) {
      toast.error(error.message)
    }finally{
      setPrompt('')
      setLoading(false)
    }
  };

  //States
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  //UseEffect to load the chats that are selected
  useEffect(() => {
    if (selectedChat?.messages) {
      setMessages(selectedChat.messages);
    }
  }, [selectedChat]);

  useEffect(() => {
    // console.log("ContainerRef : ", containerRef);
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div
      
      className="flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40"
    >
      {/* Chat Message */}
      <div ref={containerRef} className="flex-1 mb-5 overflow-y-scroll">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center gap-2 text-primary">
            <img
              src={theme === "dark" ? assets.logo_full : assets.logo_full_dark}
              alt=""
              className="w-full max-w-56 sm:max-w-68"
            />
            <p className="mt-5 text-4xl sm:text-6xl text-center text-gray-400 dark:text-white">
              Ask me anything
            </p>
          </div>
        )}

        {/* Displaying of the Message  */}
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}

        {/* Loading Animation  */}
        {loading && (
          <div className="loader flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
          </div>
        )}
      </div>

      {/* Community Mode */}
      {mode === "image" && (
        <label
          htmlFor=""
          className="inline-flex items-center mx-auto text-sm mb-3 gap-2"
        >
          <p className="text-xs">Publish Generated Image to Community</p>
          <input
            type="checkbox"
            className="cursor-pointer"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </label>
      )}

      {/* prompt  */}
      <form
        onSubmit={onSubmit}
        action=""
        className="bg-primary/20 dark:bg-[#583C79]/30 border border-primary dark:border-[#80609F]/30 rounded-full w-full max-w-2xl p-3 pl-4 mx-auto flex gap-4 items-center"
      >
        <select
          className=" outline-none pr-8"
          onChange={(e) => setMode(e.target.value)}
          value={mode}
          name=""
          id=""
        >
          <option className="dark:bg-purple-900" value="text">
            Text
          </option>
          <option className="dark:bg-purple-900" value="image">
            Image
          </option>
        </select>

        <input
          className="w-full border-none outline-none focus:outline-none focus:ring-0"
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          type="text"
          placeholder="Enter Prompt"
          required
        />
        <button disabled={loading}>
          <img
            className="w-8 cursor-pointer"
            src={loading ? assets.stop_icon : assets.send_icon}
            alt=""
          />
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
