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
                  <Icon className='h-7 w-7' />
                </NavLink>
              )
            })}
          </div>
        </nav>
        <div role='chat list' className='border-r-2 col-span-6'>
          <div className='flex justify-between items-center py-3 px-8'>
            <h3 className='font-bold text-3xl'>Chats</h3>
            <button className='p-2 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full'>
              <PencilSquareIcon className='h-7 w-7 ' />
            </button>
          </div>

          <div className='px-5'>
            <label htmlFor='search' className='bg-gray-100 p-2 flex rounded-full'>
              <span className='pl-1'>
                <MagnifyingGlassIcon className='h-7 w-7 ' />
              </span>

              <input type='search' id='search' name='search' placeholder='Search Messenger' className='w-full bg-gray-100 focus:outline-none pl-2' />
            </label>
          </div>
        </div>
      </aside>
      <main className='col-span-4 border-r-2'>main</main>
      <aside className='col-span-2'>right sidebar</aside>
    </div>
  )
}

export default ChatPage
