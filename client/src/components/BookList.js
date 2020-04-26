import React, { Component, useState } from 'react'
import {useQuery} from "@apollo/client"
import {getBooksQuery} from "../Queries/queries"
import BookDetails from './BookDetails';

// console.log('Result',getBooksQuery);

 const  BookList = () => {
    const [selected, setSelected] = useState('');
    const {data, loading, error} = useQuery(getBooksQuery);
    const displayBooks = () => {
          if(loading){
              return <div>Loading books...</div>
          } else {
              return data.books.map(book => (
              <li key={book.id} className="list-group-item" onClick={(e) => setSelected(book.id)}>{book.name}</li>
              ))
          }
    }
    
    
        return (
            <div>
                <ul className="list-group">
                    {displayBooks()}
                </ul>
                <BookDetails bookId = {selected} />
            </div>
        )
    
}

export default BookList;
