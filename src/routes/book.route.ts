
import { Router } from "express";
import Book from "../models/book.model";

const router = Router();


// GET - Récupérer tous les livres
router.get('/', async (req: Request, res: any) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err : any) {
    res.status(500).json({ message: err.message });
  }
});

// GET - Récupérer un livre par ID
router.get('/:id', getBook, (req : Request, res: any) => {
  res.json(res.book);
});

// POST - Ajouter un nouveau livre
router.post('/', async (req: any, res: any) => {
  const book = new Book({
    title: req.body?.title,
    author: req.body?.author
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// PUT - Mettre à jour un livre existant
router.put('/:id', getBook, async (req: any, res: any) => {
  if (req.body.title != null) {
    res.book.title = req.body.title;
  }
  if (req.body.author != null) {
    res.book.author = req.body.author;
  }

  try {
    const updatedBook = await res.book.save();
    res.json(updatedBook);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Supprimer un livre
router.delete('/:id', getBook, async (req: any, res: any) => {
  try {
    await res.book.remove();
    res.json({ message: 'Livre supprimé' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware pour obtenir un livre par ID
async function getBook(req :any, res: any, next: any) {
  let book;
  try {
    book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: 'Livre non trouvé' });
    }
  } catch (err : any) {
    return res.status(500).json({ message: err.message });
  }

  res.book = book;
  next();
}

export default router;