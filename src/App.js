import React from 'react'
import {Routes, Route} from "react-router-dom"
import { AddProd } from './pages/AddProd';
import { Home } from './pages/Home';
import { EditProd } from './pages/EditProd';
import "./app.css"

function App() {
  return <>
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/addProd' element={<AddProd />} />
        <Route exact path='/editProd/:id' element={<EditProd />} />
      </Routes>
    </div>
  </>
}

export default App;

