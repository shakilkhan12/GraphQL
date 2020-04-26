import React, { Component, useState } from 'react'
import {useQuery, useMutation} from "@apollo/client"
import {getBookQuery} from "../Queries/queries"

const BookDetails = ({bookId}) => {
    console.log(bookId);
    const {data, loading} = useQuery(getBookQuery, {
        variables: {id:bookId}
    });
    
    // console.log(data,loading);
    const displayBookDetails = () => {
        if(data !== undefined){
            const {book} = data;
            console.log(book);
            return <div>
            <h1>{book.name}</h1>
            <p>{book.genre}</p>
            <p>{book.author.name}</p>
        <p>{book.author.age}</p>
        <p>Books written by: {book.author.name}</p>
        {book.author.books.map(book => (
            <div key={book.id}>
<span className="badge badge-primary">{book.name}</span>
            </div>
        ))}
        </div>
        } else {
            return <p>No book selected</p>
        }
        
    }
     
    return(
        <div>
           {displayBookDetails()}
        </div>
    )

}

export default BookDetails;