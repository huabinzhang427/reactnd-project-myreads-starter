import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'


const ListBooks = ({ books, onChangeSelection }) => {
  const shelves = { currentlyReading: "Currently Reading", read: "Read", wantToRead: "Want to Read"}
  return (
   <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {Object.keys(shelves).map(shelfKey => 
                 <BookShelf 
                    title={shelves[shelfKey]}
                    books={books.filter((book) => book.shelf === shelfKey)}
                    onChangeSelection={onChangeSelection}
                    key={shelfKey}
                    />

                )}
               
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
   </div>
  )
 }

export default ListBooks