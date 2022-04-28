const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

mongoose.plugin(beautifyUnique);

mongoose.connect('mongodb://localhost/test');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  },
});

const Book = mongoose.model('Book', bookSchema);

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
}, {toJSON: {virtuals: true}, toObject: {virtuals: true}});

authorSchema.virtual('books', {
  ref: 'Book',
  localField: '_id',
  foreignField: 'author',
});

const Author = mongoose.model('Author', authorSchema);

(async function() {
  await Book.deleteMany({});
  await Author.deleteMany({});

  const LeoTolstoy = await Author.create({name: 'Leo Tolstoy'});
  await Book.create({title: 'War And Peace', author: LeoTolstoy});
  await Book.create({title: 'Anna Karenina', author: LeoTolstoy});
  await Book.create({title: 'Hadji Murad', author: LeoTolstoy});

  const author = await Author.findOne({name: 'Leo Tolstoy'}).populate('books');
  
  console.log(author);

  // const book = await Book.findOne({title: "Anna Karenina"}).populate('author');
  // console.log(book);
  // console.log(author.books[0].id);

  // deep (multi-level) populate: http://mongoosejs.com/docs/populate.html#deep-populate
})().catch(console.error).then(() => mongoose.disconnect());
