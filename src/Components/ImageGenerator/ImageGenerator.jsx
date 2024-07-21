import React, { useRef, useState } from 'react';
import './ImageGenerator.css';
import default_image from '../Assets/default_image.svg';
// import {Configuration,OpenAIApi} from "openai";
// import OpenAI from 'openai';

const ImageGenerator = () => {
    const [image_url, setImage_url] = useState('/');
    let inputRef = useRef(null);
    // const configuration = new Configuration({
    //     apiKey:`sk-proj-PrwWEX5IY3v1dQ6u8FC8T3BlbkFJVexhcjIFXCMFKUFt8Sfv`
    // })
    // const openai=new OpenAIApi(configuration);
    // async function App(){
    //     const responce=await openai.createImage({
    //         prompt:"cat with wings",
    //         n:1,
    //         size:"512x512"
    //     })
    //     console.log(responce.data)
    // }
    // const openai = new OpenAI({
    //     apiKey: "sk-proj-PrwWEX5IY3v1dQ6u8FC8T3BlbkFJVexhcjIFXCMFKUFt8Sfv"
    // });
    // async function main(){
    //     const image = await openai.images.createVariation({
    //         model:"dall-e-2",
    //         image:"cat with wings",
    //         n:1,
    //         size:"1024x1024"
    //     });
    //     console.log(image.data)
    // }
    // main()


    const imageGeneratorfnc = async () => {
        if (inputRef.current.value === "") {
            alert("Please enter a prompt");
            return;
        }

        try {
            const response = await fetch(
                "https://api.openai.com/v1/images/generations",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `sk-proj-PrwWEX5IY3v1dQ6u8FC8T3BlbkFJVexhcjIFXCMFKUFt8Sfv`,
                        "User-Agent": "Chrome",
                    },
                    body: JSON.stringify({
                        prompt: `${inputRef.current.value}`,
                        n: 1,
                        size: "512x512",
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            if (data && data.data && data.data[0] && data.data[0].url) {
                setImage_url(data.data[0].url);
            } else {
                throw new Error("Failed to generate image");
            }
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    return (
        <div>
            <div className="ai-image-generator">
                <div className="header">AI image <span>generator</span></div>
                <div className="img-loading">
                    <div className="image">
                        <img src={image_url === "/" ? default_image : image_url} alt="" />
                    </div>
                </div>
                <div className="search-box">
                    <input type="text" ref={inputRef} className="search-input" placeholder="Enter your prompt" />
                    <div className="generate-btn" onClick={()=>imageGeneratorfnc()}>Generate</div>
                </div>
            </div>
        </div>
    );
};

export default ImageGenerator;
