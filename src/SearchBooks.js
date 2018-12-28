import React from 'react'
import { Link } from 'react-router-dom'
import BooksGrid from './BooksGrid'
import * as BooksAPI from './BooksAPI'


class SearchBooks extends React.Component {

 state = {
  query: "",
  books: []
 }

 handleChange = (event) => {
  this.setState({query: event.target.value})
  this.search(this.state.query)
 }

 search = (query) => {
  BooksAPI.search(query, 20).then((results) => {
   if( results && (results.length > 0) ) {
   
    // look if a book in search results is also already on our homepage. if so => update the shelf property
    results.forEach(bookInSearchResult => {
       bookInSearchResult.shelf = "none"
       this.props.books.forEach(bookInHomepage => {
        if(bookInSearchResult.id === bookInHomepage.id) {
          bookInSearchResult.shelf = bookInHomepage.shelf
        }
      })
    })
    this.setState({books: results})     
   }
  })
 } 

 render() {
  return (
   <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" 
                 value={this.state.query} 
                 onChange={this.handleChange} 
                 placeholder="Search by title or author"/>
                
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
               <BooksGrid books={this.state.books} onChangeSelection={this.props.onChangeSelection}/>
            </div>
          </div>
  )
 }
}


export default SearchBooks