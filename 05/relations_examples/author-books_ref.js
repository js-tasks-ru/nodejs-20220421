const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

mongoose.plugin(beautifyUnique);

mongoose.connect('mongodb://localhost/test');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  authors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }]
});

const Book = mongoose.model('Book', bookSchema);

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // books: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Book',
  // }],
});

authorSchema.virtual('books', {
  ref: 'Book',
  localField: '_id',
  foreignField: 'authors',
});

const Author = mongoose.model('Author', authorSchema);

(async function() {
  // await Book.deleteMany({});
  // await Author.deleteMany({});

  // const leo = await Author.create({
  //   name: 'Leo Tolstoy',
  // });

  // const warAndPeace = await Book.create({title: 'War And Peace', authors: [leo]});
  // const annaKarenina = await Book.create({title: 'Anna Karenina', authors: [leo]});
  // const hadjiMurad = await Book.create({title: 'Hadji Murad', authors: [leo]});
  
  console.log(await Author.findOne({name: 'Leo Tolstoy'}));

  // console.log(await Book.findOne({title: 'Anna Karenina'}).populate('authors'));

  // deep (multi-level) populate: http://mongoosejs.com/docs/populate.html#deep-populate
})().catch(console.error).then(() => mongoose.disconnect());
