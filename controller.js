const petModel = require("./model");

const isValid = function (value) {
  if (typeof value === 'undefined' || value === null) return false
  if (typeof value === 'string' && value.trim().length === 0) return false
  return true;
}

const isValidRequestBody = function (requestBody) {
  return Object.keys(requestBody).lenght != 0
}

const createPet = async function (req, res) {
  try {
    const requestBody = req.body;
    if (!isValidRequestBody(requestBody)) {
      res.status(400).send({ status: false, massage: 'Invalid request parameters. please provid pet details' })
      return
    }
    //Extract params
    const { name, type, breed, age } = requestBody;  //Object destructing

    // validation starts

    if (!name)
      if (!(isValid(name))) {
        return res.status(400).send({ status: false, message: 'Pet name should be valid' })
      }

    if ((!(/^[a-zA-Z ]{2,30}$/.test(name)))) {
      return res.status(400).send({ status: false, message: 'Name Should not contain Number and length between 2-30' })
    }

    if (!type)
      if (!isValid(type)) {
        return res.status(400).send({ status: false, message: 'Type should be valid' })
      }

    if ((!(/^[a-zA-Z ]{2,30}$/.test(type)))) {
      return res.status(400).send({ status: false, message: 'Type Should not contain Number and length between 2-30' })
    }

    if (!breed)
      if (!isValid(breed)) {
        return res.status(400).send({ status: false, message: 'breed should be valid' })
      }

    if ((!(/^[a-zA-Z ]{2,30}$/.test(breed)))) {
      return res.status(400).send({ status: false, message: 'Breed Should not contain Number and length between 2-30' })
    }

    if (!isValid(age)) {
      return res.status(400).send({ status: false, message: 'Age should be valid' })
    }

    if ((!(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(age)))) {
      return res.status(400).send({ status: false, message: 'Age should be number' })
    }

    // Validation ends

    const petData = { name, type, breed, age }
    const pet = await petModel.create(petData);

    res.status(201).send({ status: true, message: `pet information created successfully`, data: pet });

  } catch (error) {
    console.log(error)
    res.status(500).send({ msg: false, data: error.message })
  }
}
//******************************************************************************************************************************** */

const getPet = async function (req, res) {
  try {
    const queryParams = req.query

    if (isValidRequestBody(queryParams)) {
      const { name, type, breed, age } = queryParams
    }
    const getPetdata = await petModel.find(queryParams)
    return res.status(200).send({ status: true, message: "petList", data: getPetdata })
  } catch (error) {
    console.log(error)
    res.status(500).send({ msg: false, data: error.message })
  }
}
//******************************************************************************************************************************* */

const getPetById = async function (req, res) {
  try {
    const petId = req.params.petId

    const get_pet = await petModel.findById({ _id: petId })
    if (!get_pet)
      return res.status(400).send({ status: false, message: "no pet found" })

    return res.status(200).send({ status: true, message: "success", data: get_pet })
  } catch (error) {
    console.log(error)
    res.status(500).send({ msg: false, data: error.message })
  }
}
//******************************************************************************************************************************* */

const updatePetById = async function (req, res) {
  try {
    const petId = req.params.petId
    const requestUpdateBody = req.body
    const { name, type, breed, age } = requestUpdateBody

    if ((!(/^[a-zA-Z ]{2,30}$/.test(name)))) {
      return res.status(400).send({ status: false, message: 'Name Should not contain Number and length between 2-30' })
    }


    if ((!(/^[a-zA-Z ]{2,30}$/.test(type)))) {
      return res.status(400).send({ status: false, message: 'Type Should not contain Number and length between 2-30' })
    }

    if ((!(/^[a-zA-Z ]{2,30}$/.test(breed)))) {
      return res.status(400).send({ status: false, message: 'Breed Should not contain Number and length between 2-30' })
    }

    if ((!(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(age)))) {
      return res.status(400).send({ status: false, message: 'Age should be number' })
    }

    const petToBeUpdated = await petModel.findOne({ _id: petId })
    if (!petToBeUpdated) return res.status(404).send({ status: false, massage: "This Pet data does not exist " })

    const updatedPets = await petModel.findOneAndUpdate({ _id: petId }, { name: name, type: type, breed: breed, age: age }, { upsert: true })
    res.status(200).send({ status: true, message: "updated successfully", data: updatedPets })

  } catch (error) {
    console.log(error)
    res.status(500).send({ status: false, data: error.message })
  }
}


//**************************************************************************************************************************** */

const DeletePet = async function (req, res) {
  try {
    const petId = req.params.petId

    const deletedpet = await petModel.findByIdAndRemove({ _id: petId })
    res.status(200).send({ status: true, message: "pet is deleted", data: deletedpet })


  } catch (error) {
    console.log(error)
    res.status(500).send({ status: false, data: error.message })
  }
}

//************************************************************************************************************************ */

module.exports = { createPet, getPet, getPetById, updatePetById, DeletePet };