const ChatPage = () => {
  return (
    <div className='grid grid-cols-9 grid-flow-col h-screen'>
      <aside
        className='grid grid-cols-6 grid-flow-col col-span-3 border'
        role='left sidebar'
      >
        <nav role='menu' className='border col-span-1'>
          <ul>
            <li>settings</li>
            <li>profile</li>
          </ul>
        </nav>
        <ul role='chat list' className='border col-span-5'>
          <li>user 1</li>
          <li>user 2</li>
        </ul>
      </aside>
      <main className='col-span-4 border'>main</main>
      <aside className='col-span-2 border'>right sidebar</aside>
    </div>
  )
}

export default ChatPage
