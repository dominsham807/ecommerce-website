import { useState } from 'react'
// import './App.scss'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Categories from './pages/Categories/Categories'
import { AdminRoute } from './components/Routes/AdminRoute'
import { PrivateRoute } from './components/Routes/PrivateRoute'
import CreateCategory from './pages/CreateCategory/CreateCategory'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'
import UserDashboard from './pages/UserDashboard/UserDashboard'
import CreateProduct from './pages/CreateProduct/CreateProduct'
import Products from './pages/Products/Products'
import CategoryProduct from './pages/CategoryProduct/CategoryProduct'
import CartPage from './pages/Cart/CartPage'
import Profile from './pages/Profile/Profile'
import Order from './pages/Order/Order'
import ProductDetails from './pages/ProductDetails/ProductDetails'

function App() {

  return (
    <>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/products' element={<Products />} />
          <Route path='/category/:slug' element={<CategoryProduct />} />
          <Route path='/product/:slug' element={<ProductDetails />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />

          <Route path='/dashboard' element={<PrivateRoute />}>
              <Route path='user/profile' element={<Profile />} />
              <Route path='user/orders' element={<Order />} />
          </Route>
          {/* Admin Routes */}
          <Route path='/dashboard' element={<AdminRoute />}>
              <Route path='admin' element={<AdminDashboard />} />
              <Route path='admin/create-category' element={<CreateCategory />} />  
              <Route path='admin/create-product' element={<CreateProduct />} />
          </Route>
          
          
          {/* Private Routes */}
          <Route path='/dashboard/user' element={<UserDashboard />} />
      </Routes>
    </>
  )
}

export default App
