import React, { Component, useState } from 'react'
import {useQuery, useMutation} from "@apollo/client"
import {getAuthorsQuery, addBookMutation,getBooksQuery} from "../Queries/queries"


const AddBook = () => {
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [authorId, setAuthorId] = useState('');
    const {data, loading, error} = useQuery(getAuthorsQuery);
    const [addBook] = useMutation(addBookMutation);
        
    const showAuthors = () => {
        if(loading){
            return <option disabled>Loading</option>
        } else {
            return data.authors.map(author => (
            <option value={author.id} key={author.id}>{author.name}</option>
            ))
        }
    }
    const submitForm = (e) => {
        e.preventDefault();
        addBook({
            variables: {
                name: name,
                genre: genre,
                authorId: authorId
            },
            refetchQueries: [{query: getBooksQuery}]
        });
        // addBook(name, genre, authorId);
    }
    return(
      <form id="add-book" className="mt-5" onSubmit={submitForm}>
          <div className="form-group">
              <h3>Add new Book</h3>
          </div>
          <div className="form-group">
          <label htmlFor="">Book Name</label>
          <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} name=""/>
          </div>
          <div className="form-group">
          <label htmlFor="">Genre</label>
          <input type="text" className="form-control" onChange={(e) => setGenre(e.target.value)} name=""/>
          </div>
          <div className="form-group">
          <label htmlFor="">Author</label>
          <select name="" className="form-control" onChange={(e) => setAuthorId(e.target.value)}>
              <option value="">Select author</option>
              {showAuthors()}
          </select>
          </div>
          <button type="submit" className="btn btn-primary">+</button>
      </form>
    )
}

export default AddBook;