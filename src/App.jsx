import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PostList from './features/post/PostList'
import AddPostForm from './features/post/AddPostForm'
function App() {


  return (
    <main>    <AddPostForm/>
    <PostList/>
    </main>

  )
}

export default App
