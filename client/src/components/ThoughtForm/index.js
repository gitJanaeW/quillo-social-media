import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {ADD_THOUGHT} from '../../utils/mutations';
import {QUERY_THOUGHTS, QUERY_ME} from '../../utils/queries';

const ThoughtForm = () => {
    const [thoughtText, setThoughtText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    // We are adding an object argument to useMutation to automatically render the newest thought without reloading
    const [addThought, {error}] = useMutation(ADD_THOUGHT, {
        // addThought represents the most recently created data in the cache (which, in our case, is the new thought)
        update(cache, {data: {addThought}}) {
            try {
                // update me array's cache too! (in case the me array is what is currently rendering & not the profile array)
                const {me} = cache.readQuery({query: QUERY_ME});
                cache.writeQuery({
                    query: QUERY_ME,
                    data: {me: {...me, thoughts: [...me.thoughts, addThought]}},
                })
            } catch (e) {
                console.warn('First thougt insertion by user!');
            }
        
            // read what's currently in the QUERY_THOUGHTS cache
            const {thoughts} = cache.readQuery({query: QUERY_THOUGHTS});
            // prepend the newest thought (from the QUERY_THOUGHTS cache) to the front of the array
            cache.writeQuery({
                query: QUERY_THOUGHTS,
                data: {thoughts: [addThought, ...thoughts]}
            });
        }
    });
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
        try {
            // trigger mutation and add thought to db
            await addThought({
                variables: {thoughtText}
            });
            // clear the form
            setThoughtText('');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
        
    };
    return (
        <div>
            {/* If text exceeds limit, change text color with new class */}
            <p className={`m-0 ${characterCount === 280 ? 'text-error' : ''}`}>
                Character Count: {characterCount}/280
                {error && <span className="ml-2">Something went wrong...</span>}
            </p>
            <form className="flex-row justify-center justify-space-between-md align-stretch" onSubmit={handleFormSubmit}>
                <textarea
                placeholder="Share what's on your mind..."
                value={thoughtText}
                onChange={handleChange}
                className="form-input col-12 col-md-9"
                ></textarea>
                <button className="btn col-12 col-md-3" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ThoughtForm;