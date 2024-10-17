import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addData } from './store/userSlice'
import { RootState } from './store/store'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ListPage from './component/ListPage'
import AddUser from './component/AddUser'

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/add" element={<AddUser />} />
          <Route path="/edit/:id" element={<AddUser />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
