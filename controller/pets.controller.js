const router = require("express").Router();

const validateSession = require("../middleware/validate-session");
const Pet = require("../model/pets.model");

/* 
Endpoint: localhost:4000/pet/add
Request Type: POST
1- create variables that will store the title, description, and imageURL
2- create a new Pet Model Object
3- save the data created from the Pet Model
4- send back the Pet Information that was saved to the DB

*/

// ! Adding validate session to routes that we want to protect

router.post("/add", validateSession, async (req, res) => {
  try {
    const { title, description, imageURL } = req.body;

    console.log(title);

    const pet = new Pet({
      title: title,
      description: description,
      imageURL: imageURL,
      ownerId: req.user._id,
    });

    const newPet = await pet.save();

    res.json({ message: `route works`, pet: newPet });
  } catch (error) {
    res.json({ message: error.message });
  }
});

/* 
Endpoint: localhost:4000/pet/view-all
Request Type: GET
*/

router.get("/view-all", validateSession, async (req, res) => {
  try {
    // 1. create a variable to store the response using the Model and Find method

    const pets = await Pet.find().populate("ownerId", "firstname lastname");

    // 2. add to the res.json the variable (pets)

    res.json({ message: `route works`, pets: pets });
  } catch (error) {
    res.json({ message: error.message });
  }
});

/* 
Endpoint: localhost:4000/pet/delete/:id
Request Type: DELETE
*/

router.delete("/delete/:id", validateSession, async (req, res) => {
  try {
    //1. Use the model method of deleteOne()
    const pet = await Pet.deleteOne({
      _id: req.params.id,
    });
    // 2. console.log(pet)
    console.log(pet);
    res.json({
      message: `route works`,
      deleteMessage: pet.deletedCount > 0 ? "Pet Deleted" : "Pet Not Found",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

/* 
Endpoint: localhost:4000/pet/update/:id
Request Type: UPDATE
*/

router.put("/update/:id", validateSession, async (req, res) => {
  try {
    // 1. store id in a variable
    const id = req.params.id;
    // 2. create variable called filter that will store an object of what you are looking for.

    const filter = { _id: id };
    // 3. Create a variable called data store the req.body
    const data = req.body;

    // 4. Update options: Create a variable called options

    const options = { new: true };

    // 5. use the Model's method of findByIdAndUpdate(filter, data, options) store into a variable

    const pet = await Pet.findOneAndUpdate(filter, data, options);

    // 6. update the res.json with the pet information

    res.json({ message: `route works`, pet: pet });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
