import React, { useState } from 'react'
import './Addproduct.css'
import upload from '../../assets/upload_area.svg'
const Addproduct = () => {
    const [image, setImage] = useState(false);
    const [product, setProduct] = useState({
        name: "",
        image: "",
        new_price: "",
        old_price: "",
        category: "women",
    })

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }
    const changeHandler = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }
    const addProduct = async () => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = async () => {
            if (!reader.result) {
                console.error('Failed to read file');
                return;
            }
            const base64Data = reader.result;
            product.image = base64Data;
            await fetch('http://localhost:4000/addproduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            }).then((res) => res.json()).then((data) => {
                data.success ? alert("Product Added") : alert("Failed");
            })
        }
    }
    return (
        <div className='addprod'>
            <div className="addprod-item-field">
                <p>Product title</p>
                <input value={product.name} onChange={changeHandler} type="text" name="name" placeholder='Type Here' />
            </div>
            <div className="addprod-price">
                <div className="addprod-item-field">
                    <p>Price</p>
                    <input value={product.old_price} onChange={changeHandler} type="text" name="old_price" placeholder='Type Here' />
                </div>
                <div className="addprod-item-field">
                    <p>Offer Price</p>
                    <input value={product.new_price} onChange={changeHandler} type="text" name="new_price" placeholder='Type Here' />
                </div>
            </div>
            <div className="addprod-item-field">
                <p>Product Category</p>
                <select value={product.category} onChange={changeHandler} name="category" className="addprod-selector">
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kids">Kids</option>
                </select>
            </div>
            <div className="addprod-item-field">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload} className="addprod-thumbnail" alt="" />
                </label>
                <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
            </div>
            <button onClick={() => { addProduct() }} className="addprod-button">ADD</button>
        </div>
    )
}

export default Addproduct
