import React, { Component } from 'react'
import {useQuery} from "@apollo/client"
import {getAuthorsQuery} from "../Queries/queries"


const AddBook = () => {
    const {data, loading, error} = useQuery(getAuthorsQuery);
    console.log('my data', data);
    const showAuthors = () => {
        if(loading){
            return <option disabled>Loading</option>
        } else {
            return data.authors.map(author => (
            <option value={author.id} key={author.id}>{author.name}</option>
            ))
        }
    }
    return(
      <form id="add-book" className="mt-5">
          <div className="form-group">
              <h3>Add new Book</h3>
          </div>
          <div className="form-group">
          <label htmlFor="">Book Name</label>
          <input type="text" className="form-control" name=""/>
          </div>
          <div className="form-group">
          <label htmlFor="">Genre</label>
          <input type="text" className="form-control" name=""/>
          </div>
          <div className="form-group">
          <label htmlFor="">Author</label>
          <select name="" className="form-control" id="">
              <option value="">Select author</option>
              {showAuthors()}
          </select>
          </div>
          <button type="button" className="btn btn-primary">+</button>
      </form>
    )
}

export default AddBook;