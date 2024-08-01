import React, { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';
import { Form, ImageComponent, Loader } from './components'

const OcrComponent = () => {
    const [image, setImage] = useState(null);
    const [textLines, setTextLines] = useState([]);
    const [loading, setLoading] = useState(false);
    const canvasRef = useRef(null);
    const [progress, setProgress] = useState(0);

    const handleImageUpload = (event) => {
        // to handle image
        const file = event.target.files[0];
        if (file) {
            setTextLines([]);
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
            preprocessImage(file);
        }
    };

    const preprocessImage = (file) => {
        // this function to create a canvas object that can be used to take the correct text
        // becouse of the package 
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            ctx.filter = 'grayscale(100%)';
            ctx.drawImage(img, 0, 0);
        };
    };

    const extractText = () => {
        // Extract the text from the Tesseract package
        setLoading(true);
        const canvas = canvasRef.current;
        canvas.toBlob((blob) => {
            Tesseract.recognize(
                blob,
                'eng',
                {
                    logger: (info) => {
                        if (info.status === 'recognizing text') {
                            setProgress(info.progress * 100);
                        }
                    },
                }
            )
                .then(({ data: { text } }) => {
                    const lines = text.split('\n').filter(line => line.trim() !== '');
                    setTextLines(lines.map((line, index) => ({ id: index, text: line })));
                    setLoading(false);
                    setProgress(100); // Ensure progress bar is at 100% when done
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        }, 'image/png');
    };

    const handleTextChange = (index, event) => {
        /// to update the text form
        const newTextLines = [...textLines];
        newTextLines[index].text = event.target.value;
        setTextLines(newTextLines);
    };

    return (
        <div className="ocr-container">
            <h1 className="ocr-title"> Text Extractor</h1>
            <div className='extract-container'>
                {image ?
                    <ImageComponent {...{ image, loading, progress, setImage }} />
                    :
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="file-input"
                    />
                }

                <button
                    onClick={extractText}
                    disabled={!image || loading}
                    className="extract-button"
                >
                    {loading ? <Loader /> : 'Extract Text'}
                </button>
            </div>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            <Form {...{ handleTextChange, textLines }} />


        </div>
    );
};

export default OcrComponent;
