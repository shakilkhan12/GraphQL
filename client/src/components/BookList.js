import React, { Component } from 'react'
import {useQuery} from "@apollo/client"
import {getBooksQuery} from "../Queries/queries"

// console.log('Result',getBooksQuery);

 const  BookList = () => {
    const {data, loading, error} = useQuery(getBooksQuery);
    const displayBooks = () => {
          if(loading){
              return <div>Loading books...</div>
          } else {
              return data.books.map(book => (
              <li key={book.id} className="list-group-item">{book.name}</li>
              ))
          }
    }
    
    
        return (
            <div>
                <ul className="list-group">
                    {displayBooks()}
                </ul>
            </div>
        )
    
}

export default BookList;
