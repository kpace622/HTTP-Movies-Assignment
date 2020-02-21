import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialItem = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const  UpdateMovie = props => {
    const { id } = props.match.params
    const [item, setItem] = useState(initialItem);

    useEffect(() => {
        axios
          .get(`http://localhost:5000/api/movies/${id}`)
          .then(response => {
            console.log(response)
            setItem(response.data)
          })
          .catch(err => {
            console.log(err)
          })
      }, [item.id])

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

    const handleStars = event => {
        setItem({
          ...item,
          stars: [event.target.value],
        })
      }
    
    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, item)
        .then(res => {
            console.log(res)
            setItem(initialItem)
            props.history.push('/')
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
                onChange={handleStars}
                placeholder='stars'
                value={item.stars}
            />
            <button>Update</button>
        </form>
     )
}

export default UpdateMovie;