import React from 'react'

class BooksGrid extends React.Component {
 render() {

  return (
   <ol className="books-grid">
  
                    {(this.props.books.length > 0) && this.props.books.map((b) => 
                     <li key={b.id}>
                         <div className="book">
                           <div className="book-top">
                             <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${(b.imageLinks) && (b.imageLinks.smallThumbnail) && b.imageLinks.smallThumbnail})` }}></div>
                             <div className="book-shelf-changer">
                               <select value={b.shelf} onChange={(event) => {
                                 this.props.onChangeSelection(event.target.value, b)
                                }}>
                                 <option value="none" disabled>Move to...</option>
                                 <option value="currentlyReading">Currently Reading</option>
                                 <option value="wantToRead">Want to Read</option>
                                 <option value="read">Read</option>
                                 <option value="none">None</option>
                               </select>
                             </div>
                           </div>
                           <div className="book-title">{b.title}</div>
                           <div className="book-authors">{(b.authors) && b.authors.map((author) => author)}</div>
                         </div>
                       </li>
                    )}
                 
                    </ol>
  )
 }
}

export default BooksGrid