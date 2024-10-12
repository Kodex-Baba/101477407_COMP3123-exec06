const DB_CONNECTION_STRING = "mongodb+srv://kodexbaba41:Ea4312016085*@cluster0.o7wsr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


const express = require("express")
const BookModel = require("../models/books");
// const Book = require("../models/books");
const routes = express.Router()

//Get All Books
routes.get("/books", (req, res) => {
    //Get all books
    BookModel.find().then((books) => {
        res.send(books)
    }).catch((err) => {
        res.status(500).send({message: err.message})
    });
});

//Add NEW Book
routes.post("/books", async(req, res) => {
    const bookData = req.body
    console.log(bookData)
    try {
        // Create a new book instance
        const book = new BookModel(bookData)
        // Save the book to MongoDB
        const newBook = await book.save()
        res.send(newBook)
    } catch (err) {
        res.status(500).send({message: err.message})
    }
})

//Update existing Book By Id
routes.post("/book/:bookid", (req, res) => {
    BookModel.findByIdAndUpdate(req.params.bookid, req.body, {new: true})
        .then((book) => {
            if(book) {
                res.send(book)
            } else {
                res.status(404).send({message: "Book not found"})
            }
        }).catch((err) => {
        res.status(500).send({message: err.message})
    })
    // res.send({message: "Update existing Book By Id"})
})

//Delete Book By ID
routes.delete("/book/:bookid", (req, res) => {
    BookModel.findByIdAndDelete(req.params.bookid).then((book) => {
        if(book) {
            res.send(book)
        } else {
            res.status(404).send({message: "Book not found"})
        }
    }).catch((err) => {
        res.status(500).send({message: err.message})
    })
    // res.send({message: "Delete Book By ID"})
})

//Get Book By ID
routes.get("/book/:bookid", (req, res) => {
    BookModel.findById(req.params.bookid)
        .then((book) => {
            if(book) {
                res.send(book)
            } else {
                res.status(404).send({message: "Book not found"})
            }
        }).catch((err) => {
        res.status(500).send({message: err.message})
    })
    // res.send({message: "Get Book By ID"})
})

//Get All Books in sorted order
routes.get("/books/sort", (req, res) => {
    BookModel.find().sort({price: 1})
        .then((books) => {
            res.send(books)
        }).catch((err) => {
        res.status(500).send({message: err.message})
    })
    // res.send({message: "Get All Books in sorted order"})
})



module.exports = routes