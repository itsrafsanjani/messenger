import {
  ArchiveBoxIcon,
  BuildingStorefrontIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ChatBubbleOvalLeftIcon,
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
                    (isActive ? 'bg-gray-200 active ' : ' ') +
                    ` p-3 rounded-lg hover:bg-gray-200 transition-all`
                  }
                  title={menu.name}
                >
                  <Icon className='h-7 w-7 first:text-gray-700' />
                </NavLink>
              )
            })}
          </div>
        </nav>
        <ul role='chat list' className='border-r-2 col-span-6'>
          <li>user 1</li>
          <li>user 2</li>
        </ul>
      </aside>
      <main className='col-span-4 border-r-2'>main</main>
      <aside className='col-span-2'>right sidebar</aside>
    </div>
  )
}

export default ChatPage
