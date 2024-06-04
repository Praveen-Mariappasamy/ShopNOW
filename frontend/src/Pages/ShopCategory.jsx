import React , {useContext, useState} from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'
const ShopCategory = (props) => {

  const {setFilter , filter , all_product} = useContext(ShopContext);
  
  const [sortText , setSort] = useState("Low -> High")

  const sorter = ()=>{
    if(filter===-1) setFilter(1);
    else setFilter(-1);
    if(sortText==="Low -> High") setSort("High -> Low");
    else setSort("Low -> High");
  }

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort" onClick={sorter}>
          {sortText} <img src={dropdown_icon}  alt="" />
        </div>
      </div>
      <div className='shopcategory-products'>
        {all_product.map((item,i)=>{
          if(props.category===item.category){
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          }
          else{
            return null;
          }
        })}
      </div>
      <div className='shopcategory-loadmore'>
        Eplore More
      </div>
    </div>
  )
}

export default ShopCategory
