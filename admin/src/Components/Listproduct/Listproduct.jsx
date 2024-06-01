import React, { useEffect, useState } from 'react'
import './Listproduct.css'
import cross_icon from '../../assets/cross_icon.png'
const Listproduct = () => {
  const [allProd,setAllProd] = useState([]);
  const fetchInfo = async () =>{
    await fetch('http://localhost:4000/allproducts')
    .then((res)=>res.json())
    .then((data)=>setAllProd(data))  //curly braces optional
  }
  const removeProduct = async (id) => {
    await fetch('http://localhost:4000/removeproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({id:id})
    })
    await fetchInfo();
  }
  useEffect(()=>{
    fetchInfo();
  },[]);

  return (
    <div className='listprod'>
      <h1>All Products List</h1>
      <div className='listprod-format-main'>
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className='listprod-allprod'>
        <hr />
        {allProd.map((product,index)=>{
          return <><div key={index} className='listprod-format-main listprod-format'>
            <img src={product.image} alt="" className="listprod-icon" />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={()=>{removeProduct(product.id)}} src={cross_icon} alt="" className="listprod-remove-icon" />
            </div>
            <hr />
            </> 
        })}
      </div>
    </div>
  )
}

export default Listproduct