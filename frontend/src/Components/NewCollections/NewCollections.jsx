import React, { useState , useEffect } from 'react'
import "./NewCollections.css"
import Item from '../Item/Item'
const NewCollections = () => {
  const [new_collection,setnewcollection] = useState([]);
  useEffect(()=>{
    fetch('https://shop-now-api-five.vercel.app/newcollection')
    .then((res)=>res.json())
    .then((data)=>setnewcollection(data));
  },[])
  return (
    <div className="newcollections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
          {new_collection.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          })}
      </div>
    </div>
  )
}

export default NewCollections
