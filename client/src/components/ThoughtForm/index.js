import React, { useState } from "react";

const ThoughtForm = () => {
    const [thoughtText, setThoughtText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const handleChange = event => {
        // if, on change, textarea chars are < or = 280 chars...
        if (event.target.value.length <= 280) {
            // thoughtText will equal the value of textarea (meaning the page will not render anymore that 280 chars)
            setThoughtText(event.target.value);
            // characterCount will equal the value of textarea.length
            setCharacterCount(event.target.value.length);
        }
    };
    const handleFormSubmit = async event => {
        event.preventDefault();
        setThoughtText('');
        setCharacterCount(0);
    };
    return (
        <div>
            {/* If text exceeds limit, change text color with new class */}
            <p className={`m-0 ${characterCount === 280 ? 'text-error' : ''}`}>
                Character Count: {characterCount}/280
            </p>
            <form className="flex-row justify-center justify-space-between-md align-stretch" onSubmit={handleFormSubmit}>
                <textarea
                placeholder="Share what's on your mind..."
                value={thoughtText}
                onChange={handleChange}
                className="form-input col-12 col-md-9"
                ></textarea>
                <button className="btn col-12 col-md-3" type="submit">
                Submit
                </button>
            </form>
        </div>
    );
}

export default ThoughtForm;