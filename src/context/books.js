import { createContext, useState } from "react";
import axios from "axios";

const BooksContext = createContext();

function Provider({ children }) {
  // ##################   FETCH-BOOK   ##################################
  const [books, setBook] = useState([]);

  const fetchBooks = async () => {
    const response = await axios.get("http://localhost:3001/books");
    setBook(response.data);
  };

  // #################   CREATE-BOOK   ##################################
  const createBook = async (title) => {
    const response = await axios.post("http://localhost:3001/books", {
      title, // title: title same as title
    });

    const updateBook = [...books, response.data];
    setBook(updateBook);
  };

  // ####################   EDIT-BOOK-BY-ID   ###########################
  const editBookById = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:3001/books/${id}`, {
      title: newTitle,
    });

    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, ...response.data };
      }
      return book;
    });

    setBook(updatedBooks);
  };

  // ##################   DELETE-BOOK-BY-ID   #################################
  const deleteBookById = async (id) => {
    await axios.delete(`http://localhost:3001/books/${id}`);

    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });

    setBook(updatedBooks);
  };

  //   ########################################################################
  const valueToShare = {
    books, // <-Both Are Same Things-> books: books
    deleteBookById, // <-Both Are Same Things-> deleteBookByID: deleteBookByID,
    editBookById, // <-Both Are Same Things-> editBookById: editBookById,
    createBook, // <-Both Are Same Things-> createBook: createBook,
    fetchBooks, // <-Both Are Same Things-> fetchBooks: fetchBooks,
  };

  return (
    <BooksContext.Provider value={valueToShare}>
      {children}
    </BooksContext.Provider>
  );
}

export { Provider };
export default BooksContext;
