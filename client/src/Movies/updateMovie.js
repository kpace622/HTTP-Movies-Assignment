import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialItem = {
    title: '',
    director: '',
    metascore: '',
    stars: ''
}

const  UpdateMovie = props => {
    const [item, setItem] = useState(initialItem);

    useEffect(() => {
        const selectedItem = props.savedList.find(item => {
          return `${item.id}` === props.match.params.id;
        });
        if (selectedItem) {
          setItem(selectedItem);
        }
      }, [props.savedList, props.match.params.id]);

    const handleChange = e => {
        e.persist();
        let value = e.target.value;
        if (e.target.name === "metascore") {
        value = parseInt(value, 10);
        }
        setItem({
            ...item, 
            [e.target.name]: value
        });
    };
    
    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${item.id}`, item)
        .then(res => {
            console.log(res)
            props.addToSavedList(res.data)
            props.history.push('http://localhost:5000/movies')
        })
        .catch(err => console.error(err))
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type='text'
                name='title'
                onChange={handleChange}
                placeholder='title'
                value={item.title}
            />
            <input 
                type='text'
                name='director'
                onChange={handleChange}
                placeholder='director'
                value={item.director}
            />
            <input 
                type='text'
                name='metascore'
                onChange={handleChange}
                placeholder='metascore'
                value={item.metascore}
            />
            <input 
                type='text'
                name='stars'
                onChange={handleChange}
                placeholder='stars'
                value={item.stars}
            />
            <button>Update</button>
        </form>
     )
}

export default UpdateMovie;