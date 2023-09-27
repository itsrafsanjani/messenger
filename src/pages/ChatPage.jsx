import {
  ArchiveBoxIcon,
  BuildingStorefrontIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ChatBubbleOvalLeftIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  UsersIcon,
} from '@heroicons/react/24/solid'
import { Link, NavLink } from 'react-router-dom'
import { faker } from '@faker-js/faker'

const menus = [
  {
    icon: ChatBubbleOvalLeftIcon,
    link: '/',
    name: 'Chats',
  },
  {
    icon: UsersIcon,
    link: '/people',
    name: 'People',
  },
  {
    icon: BuildingStorefrontIcon,
    link: '/marketplace',
    name: 'Marketplace',
  },
  {
    icon: ChatBubbleOvalLeftEllipsisIcon,
    link: '/requests',
    name: 'Requests',
  },
  {
    icon: ArchiveBoxIcon,
    link: '/archive',
    name: 'Archive',
  },
]

const chats = []

for (let i = 0; i < 20; i++) {
  const chat = {
    id: i,
    name: faker.person.fullName(), // Generate a random name
    image: 'https://placehold.it/400x400', // Generate a random avatar image
    last_message: faker.lorem.sentence(4), // Generate a random last message
    last_message_at: faker.date.recent({ days: 7 }).toLocaleTimeString(), // Generate a random recent date
  }

  chats.push(chat)
}

const ChatPage = () => {
  return (
    <div className='grid grid-cols-9 grid-flow-col h-screen'>
      <aside
        className='grid grid-cols-7 grid-flow-col col-span-3 border-r-2'
        role='left sidebar'
      >
        <nav role='menu' className='border-r-2 col-span-1'>
          <div className='flex flex-col justify-center items-center space-y-1 pt-4 '>
            {menus.map((menu) => {
              const Icon = menu.icon
              return (
                <NavLink
                  to={menu.link}
                  key={menu.name}
                  role={menu.name}
                  className={({ isActive }) =>
                    (isActive
                      ? 'bg-gray-100 text-gray-800 active '
                      : ' text-gray-500') +
                    ` p-3 rounded-lg hover:bg-gray-100 transition-all`
                  }
                  title={menu.name}
                >
                  <Icon className='h-5 w-5' />
                </NavLink>
              )
            })}
          </div>
        </nav>

        <div
          role='chat list'
          className='flex flex-col border-r-2 col-span-6 overflow-auto'
        >
          <div className='h-[105px] sticky top-0 bg-white'>
            <div className='flex justify-between items-center py-3 px-8'>
              <h3 className='font-bold text-2xl'>Chats</h3>
              <button className='p-2 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full'>
                <PencilSquareIcon className='h-5 w-5 ' />
              </button>
            </div>

            <div className='px-4'>
              <label
                htmlFor='search'
                className='bg-gray-100 p-[6px] flex items-center rounded-full'
              >
                <span className='pl-1'>
                  <MagnifyingGlassIcon className='h-5 w-5 ' />
                </span>

                <input
                  type='search'
                  id='search'
                  name='search'
                  placeholder='Search Messenger'
                  className='w-full bg-gray-100 focus:outline-none pl-2'
                />
              </label>
            </div>
          </div>

          <div className='h-[calc(100vh-105px)] overflow-auto'>
            {chats.length > 0
              ? chats.map((chat, index) => {
                  return (
                    <Link
                      to={'/chats/' + chat.id}
                      key={chat.id}
                      className='block px-[6px] mb-1'
                    >
                      <div
                        className={
                          (index === 0 ? 'bg-gray-100 ' : ' ') +
                          ' flex hover:bg-gray-100 rounded-lg transition-all'
                        }
                      >
                        <div className='flex items-center py-2 px-3 '>
                          <img
                            src={chat.image}
                            alt='profile picture'
                            className='h-12 w-12 rounded-full'
                          />
                          <div className='pl-3 flex flex-col space-y-1'>
                            <h3 className='text-sm'>{chat.name}</h3>
                            <div className='text-xs flex text-gray-500'>
                              <p>{chat.last_message}</p>
                              <time>{chat.last_message_at}</time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })
              : (
                <div className='text-center text-gray-500'>No chats found!</div>
              )}
          </div>
        </div>
      </aside>
      <main className='col-span-4 border-r-2'>main</main>
      <aside className='col-span-2'>right sidebar</aside>
    </div>
  )
}

export default ChatPage
