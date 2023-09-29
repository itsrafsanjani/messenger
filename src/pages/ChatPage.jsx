import {
  ArchiveBoxIcon,
  BellIcon,
  BuildingStorefrontIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ChatBubbleOvalLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { Link, NavLink } from "react-router-dom";
import { faker } from "@faker-js/faker";
import { useEffect, useRef } from "react";
import FacebookIcon from "../assets/facebook.svg";
const menus = [
  {
    icon: ChatBubbleOvalLeftIcon,
    link: "/",
    name: "Chats",
  },
  {
    icon: UsersIcon,
    link: "/people",
    name: "People",
  },
  {
    icon: BuildingStorefrontIcon,
    link: "/marketplace",
    name: "Marketplace",
  },
  {
    icon: ChatBubbleOvalLeftEllipsisIcon,
    link: "/requests",
    name: "Requests",
  },
  {
    icon: ArchiveBoxIcon,
    link: "/archive",
    name: "Archive",
  },
];

const chats = [];

for (let i = 0; i < 20; i++) {
  const chat = {
    id: i,
    name: faker.person.fullName(), // Generate a random name
    image: "https://placehold.it/400x400", // Generate a random avatar image
    last_message: faker.lorem.sentence(4), // Generate a random last message
    last_message_at: faker.date.recent({ days: 7 }).toLocaleTimeString(), // Generate a random recent date
  };

  chats.push(chat);
}

let messages = [];

if (localStorage.getItem("messages")) {
  messages = JSON.parse(localStorage.getItem("messages"));
} else {
  for (let i = 0; i < 1000; i++) {
    const message = {
      id: i,
      body: faker.lorem.sentence(),
      is_received: faker.datatype.boolean(),
      // is_received: true,
    };

    messages.push(message);
  }

  localStorage.setItem("messages", JSON.stringify(messages));
}

function groupByIsReceived(data) {
  const groupedData = [];
  let currentChunk = [];

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const nextItem = data[i + 1];

    currentChunk.push(item);

    if (nextItem && item.is_received !== nextItem.is_received) {
      groupedData.push(currentChunk);
      currentChunk = [];
    }
  }

  if (currentChunk.length > 0) {
    groupedData.push(currentChunk);
  }

  return groupedData;
}

const groupedMessages = groupByIsReceived(messages);

console.log(groupedMessages);

const ChatPage = () => {
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView();
  });

  return (
    <div className="grid grid-cols-9 grid-flow-col h-screen">
      <aside
        className="grid grid-cols-7 grid-flow-col col-span-3 border-r-2"
        role="left sidebar"
      >
        <nav role="menu" className="border-r-2 col-span-1">
          <div className="flex flex-col justify-center items-center space-y-1 pt-4 ">
            {menus.map((menu) => {
              const Icon = menu.icon;
              return (
                <NavLink
                  to={menu.link}
                  key={menu.name}
                  role={menu.name}
                  className={({ isActive }) =>
                    (isActive
                      ? "bg-gray-100 text-gray-800 active "
                      : " text-gray-500") +
                    ` p-3 rounded-lg hover:bg-gray-100 transition-all`
                  }
                  title={menu.name}
                >
                  <Icon className="h-5 w-5" />
                </NavLink>
              );
            })}
          </div>
        </nav>

        <div
          role="chat list"
          className="flex flex-col border-r-2 col-span-6 overflow-auto"
        >
          <div className="h-[105px] sticky top-0 bg-white">
            <div className="flex justify-between items-center py-3 px-8">
              <h3 className="font-bold text-2xl">Chats</h3>
              <button className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full">
                <PencilSquareIcon className="h-5 w-5 " />
              </button>
            </div>

            <div className="px-4">
              <label
                htmlFor="search"
                className="bg-gray-100 p-[6px] flex items-center rounded-full"
              >
                <span className="pl-1">
                  <MagnifyingGlassIcon className="h-5 w-5 " />
                </span>

                <input
                  type="search"
                  id="search"
                  name="search"
                  placeholder="Search Messenger"
                  className="w-full bg-gray-100 focus:outline-none pl-2"
                />
              </label>
            </div>
          </div>

          <div className="h-[calc(100vh-105px)] overflow-auto">
            {chats.length > 0 ? (
              chats.map((chat, index) => {
                return (
                  <Link
                    to={"/chats/" + chat.id}
                    key={chat.id}
                    className="block px-[6px] mb-1"
                  >
                    <div
                      className={
                        (index === 0 ? "bg-gray-100 " : " ") +
                        " flex hover:bg-gray-100 rounded-lg transition-all"
                      }
                    >
                      <div className="flex items-center py-2 px-3 ">
                        <img
                          src={chat.image}
                          alt="profile picture"
                          className="h-12 w-12 rounded-full"
                        />
                        <div className="pl-3 flex flex-col space-y-1">
                          <h3 className="text-sm">{chat.name}</h3>
                          <div className="text-xs flex text-gray-500">
                            <p>{chat.last_message}</p>
                            <time>{chat.last_message_at}</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="text-center text-gray-500">No chats found!</div>
            )}
          </div>
        </div>
      </aside>
      <main className="relative col-span-4 border-r-2 h-[calc(100vh-60px)] overflow-auto">
        <div className="flex flex-col pt-3 space-y-2">
          {groupedMessages.map((messages, index) => {
            return (
              <ul key={index} className="group">
                {messages.map(({ id, is_received, body }) => {
                  return (
                    <li
                      key={id}
                      className={`clear-both max-w-[75%] p-1.5 px-4 mb-0.5 lg:mx-6 break-words break-all message text-sm ${
                        is_received
                          ? "float-left justify-start mr-8 bg-[#e4e6eb] him"
                          : "float-right ml-8 bg-[#0084ff] text-white me"
                      }`}
                    >
                      {body}
                    </li>
                  );
                })}
              </ul>
            );
          })}
        </div>

        <div ref={divRef}></div>

        <div className="fixed bottom-0 h-[60px] w-[calc(100vw-55.55vw)]">
          <input
            type="text"
            name="body"
            id="body"
            placeholder="Enter message"
            className="h-full w-full bg-gray-100 px-3 py-2 focus:outline-none"
          />
        </div>
      </main>
      <aside className="col-span-2">
        <div className="flex flex-col justify-center items-center pt-5 pb-2 space-y-2">
          <img
            src="https://placehold.it/400x400"
            alt="profile picture"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <Link to="/" className="hover:underline">
              <h3 className="text-lg font-medium">Md Rafsan Jani Rafin</h3>
            </Link>
            <h3 className="text-sm text-gray-500 font-light text-center">
              Active now
            </h3>
          </div>
        </div>

        <div className="flex justify-center items-center space-x-8 pt-1">
          <NavLink to="/" className="flex flex-col items-center justify-center">
            <div className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full flex justify-center items-center h-8 w-8">
              <img src={FacebookIcon} alt="facebook" className="h-5 w-5 " />
            </div>
            <div className="text-xs text-gray-500 pt-1">Profile</div>
          </NavLink>
          <NavLink to="/" className="flex flex-col items-center justify-center">
            <div className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full flex justify-center items-center h-8 w-8">
              <BellIcon className="h-5 w-5 " />
            </div>
            <div className="text-xs text-gray-500 pt-1">Mute</div>
          </NavLink>
          <NavLink to="/" className="flex flex-col items-center justify-center">
            <div className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full flex justify-center items-center h-8 w-8">
              <MagnifyingGlassIcon className="h-5 w-5 " />
            </div>
            <div className="text-xs text-gray-500 pt-1">Search</div>
          </NavLink>
        </div>

        <div className="pt-5 px-4 text-sm transition-all">
          <div className="flex justify-between items-center hover:bg-gray-200 rounded-lg px-2 py-3 cursor-pointer">
            <div>Chat info</div>

            <div>
              <ChevronRightIcon className="h-5 w-5 " />
            </div>
          </div>

          <div className="flex justify-between items-center hover:bg-gray-200 rounded-lg px-2 py-3 cursor-pointer">
            <div>Customize chat</div>

            <div>
              <ChevronRightIcon className="h-5 w-5 " />
            </div>
          </div>

          <div className="flex justify-between items-center hover:bg-gray-200 rounded-lg px-2 py-3 cursor-pointer">
            <div>Media, files and links</div>

            <div>
              <ChevronRightIcon className="h-5 w-5 " />
            </div>
          </div>

          <div className="flex justify-between items-center hover:bg-gray-200 rounded-lg px-2 py-3 cursor-pointer">
            <div>Privacy and support</div>

            <div>
              <ChevronRightIcon className="h-5 w-5 " />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default ChatPage;
