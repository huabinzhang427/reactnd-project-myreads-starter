import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {
  state = {
    books: []
    
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks = () => {
      BooksAPI.getAll().then((books) => {
      this.setState( {books: books} )}
    )
  }

  changeSelection = (newShelf, book) => {

    const selectedBook = this.state.books.filter(b => {
      return b.id === book.id
    })

    if(selectedBook.length === 0) { // the book is not yet in our current state. books shelf will be updated and then the book will be added to the state.
      book.shelf = newShelf
      this.setState(state => {
        return {books: state.books.concat([book])}
      })
    } else {                      // the book is already in the current state. the book's shelf will be updated
      this.setState((state) => {
       state.books.filter(b => (b.id === book.id)).map(e => e.shelf = newShelf)
      })
    }

    BooksAPI.update(book, newShelf)
  }

  render() {
    return (
      <div className="app">
       
         
        <Route exact path="/" render={() => 
          <ListBooks books={this.state.books} onChangeSelection={this.changeSelection}/>
        }/>
        <Route path="/search" render={() => 
          <SearchBooks books={this.state.books} onChangeSelection={this.changeSelection}/>
        }/>
    
      </div>
    )
  }
}

export default BooksApp
