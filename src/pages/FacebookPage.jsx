import {
  ArchiveBoxIcon,
  Bars4Icon,
  BellAlertIcon,
  BellIcon,
  BuildingStorefrontIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ChatBubbleOvalLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalCircleIcon,
  FaceFrownIcon,
  GifIcon,
  HandThumbUpIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PhoneIcon,
  PhotoIcon,
  PlusCircleIcon,
  UsersIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/solid";

import {
  HomeIcon,
  PlayCircleIcon,
  PuzzlePieceIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

import { Link, NavLink } from "react-router-dom";
import { faker } from "@faker-js/faker";
import { useEffect, useRef } from "react";
import ReactTimeAgo from "react-time-ago";
import FacebookLogo from "../assets/facebook-logo.png";

const navItems = [
  {
    icon: HomeIcon,
    link: "/",
    name: "Feed",
  },
  {
    icon: PlayCircleIcon,
    link: "/watch",
    name: "Watch",
  },
  {
    icon: BuildingStorefrontIcon,
    link: "/marketplace",
    name: "Marketplace",
  },
  {
    icon: UserGroupIcon,
    link: "/groups",
    name: "Group",
  },
  {
    icon: PuzzlePieceIcon,
    link: "/gaming",
    name: "Gaming",
  },
];

const menus = [
  {
    icon: Bars4Icon,
    link: "/",
    name: "Menu",
  },
  {
    icon: ChatBubbleOvalLeftEllipsisIcon,
    link: "/messages",
    name: "Messages",
  },
  {
    icon: BellAlertIcon,
    link: "/notifications",
    name: "Notifications",
  },
];

const chats = [];

for (let i = 0; i < 20; i++) {
  const chat = {
    id: i,
    name: faker.person.fullName(), // Generate a random name
    image: "https://placehold.it/400x400", // Generate a random avatar image
    last_message: faker.lorem.sentence(4), // Generate a random last message
    last_message_at: faker.date.recent({ days: 7 }), // Generate a random recent date
  };

  chats.push(chat);
}

let messages = [];

if (localStorage.getItem("messages")) {
  messages = JSON.parse(localStorage.getItem("messages"));
} else {
  for (let i = 0; i < 50; i++) {
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

const FacebookPage = () => {
  return (
    <div>
      <header className="flex justify-between items-center px-4 shadow">
        <div className="flex justify-between items-center space-x-2">
          <img
            src={FacebookLogo}
            alt="logo"
            className="h-10 w-10 rounded-full"
          />

          <label
            htmlFor="search"
            className="bg-secondary-medium p-[7px] flex items-center rounded-full"
          >
            <span className="pl-1">
              <MagnifyingGlassIcon className="h-5 w-5 " />
            </span>

            <input
              type="search"
              id="search"
              name="search"
              placeholder="Search Facebook"
              className="w-full bg-secondary-medium focus:outline-none px-2"
            />
          </label>
        </div>

        <nav className="flex justify-center items-center space-x-2 py-1">
          {navItems.map((navItem) => {
            const Icon = navItem.icon;
            return (
              <div
                className="relative flex flex-col justify-between"
                key={navItem.name}
              >
                <NavLink
                  to={navItem.link}
                  key={navItem.name}
                  role={navItem.name}
                  className={({ isActive }) =>
                    (isActive
                      ? "text-primary activeFbNavItem"
                      : " text-gray-500 hover:bg-secondary-light rounded-lg") +
                    ` p-3 transition-all h-full w-28 flex justify-center items-center `
                  }
                  title={navItem.name}
                >
                  <Icon className="h-6 w-6 stroke-2" />
                </NavLink>
                <div className="-mb-1.5 h-[3px] bg-primary bottomBorder"></div>
              </div>
            );
          })}
        </nav>

        <div className="flex justify-center items-center space-x-2">
          {menus.map((menu) => {
            const Icon = menu.icon;
            return (
              <button
                className="bg-secondary hover:bg-secondary-dark p-2 rounded-full flex justify-center items-center h-10 w-10"
                title={menu.name}
                key={menu.name}
              >
                <Icon className="h-7 w-7" />
              </button>
            );
          })}

          <button
            className="bg-secondary hover:bg-secondary-dark rounded-full flex justify-center items-center h-10 w-10"
            title="Profile"
          >
            <img
              src="https://ui-avatars.com/api/?size=400"
              alt="profile picture"
              className="h-full w-full rounded-full"
            />
          </button>
        </div>
      </header>

      <main className="flex justify-between space-y-2">
        <aside className="flex flex-col justify-between px-3 pt-3 space-y-2">
          <div className="flex space-x-2">
            <img src="https://placehold.it/50x50" alt="icon" className="shadow w-10 h-10 rounded-full" />
            <h3>MD Rafsan Jani Rafin</h3>
          </div>
          <div className="flex space-x-2">
            <img src="https://placehold.it/50x50" alt="icon" className="shadow w-10 h-10 rounded-full" />
            <h3>Friends</h3>
          </div>
          <div className="flex space-x-2">
            <img src="https://placehold.it/50x50" alt="icon" className="shadow w-10 h-10 rounded-full" />
            <h3>Feeds</h3>
          </div>
          <div className="flex space-x-2">
            <img src="https://placehold.it/50x50" alt="icon" className="shadow w-10 h-10 rounded-full" />
            <h3>Groups</h3>
          </div>
          <div className="flex space-x-2">
            <img src="https://placehold.it/50x50" alt="icon" className="shadow w-10 h-10 rounded-full" />
            <h3>Marketplace</h3>
          </div>
          <div className="flex space-x-2">
            <img src="https://placehold.it/50x50" alt="icon" className="shadow w-10 h-10 rounded-full" />
            <h3>Video</h3>
          </div>
          <div className="flex space-x-2">
            <img src="https://placehold.it/50x50" alt="icon" className="shadow w-10 h-10 rounded-full" />
            <h3>See more</h3>
          </div>
          <div className="flex space-x-2">
            <img src="https://placehold.it/50x50" alt="icon" className="shadow w-10 h-10 rounded-full" />
            <h3>Your shortcuts</h3>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default FacebookPage;
