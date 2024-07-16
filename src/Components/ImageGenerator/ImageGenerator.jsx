import React, { useRef, useState } from 'react'
import './ImageGenerator.css'
import default_image from '../Assets/default_image.svg'

const ImageGenerator = () => {
    const [image_url,setImage_url]=useState('/');
    let inputRef=useRef(null);

    const imageGenerator =async()=>{
        if(inputRef.current.value===""){

        }
        const responce = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:"sk-proj-PrwWEX5IY3v1dQ6u8FC8T3BlbkFJVexhcjIFXCMFKUFt8Sfv",
                    "User-Agent":"Chrome",

                },
                body:JSON.stringify({
                    prompt:`${inputRef.current.value}`,
                    n:1,
                    size:"512x512",

                }),
            }
        );
        let data=await responce.json();
        console.log(data)
    }
  

  return (
    <div>
        <div className="ai-image-generator">
            <div className="header">AI image <span>generator</span></div>
            <div className="img-loading">
                <div className="image">
                    <img src={image_url==="/"?default_image:image_url} alt="" />
                </div>
            </div>
            <div className="search-box">
                <input type="text" ref={inputRef}  className='search-input' placeholder='enter your prompt' />
                <div className="generate-btn" onClick={()=>{imageGenerator()}}>Generate</div>
            </div>
        </div>
      
    </div>
  )
}

export default ImageGenerator
