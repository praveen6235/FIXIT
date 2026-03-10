import Provider from "../models/Provider.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const addProvider = async (req,res)=>{

  try{

    const {name,email,contact,service,price,password} = req.body

    const nameRegex = /^[A-Za-z\s]+$/
    const phoneRegex = /^[6789][0-9]{9}$/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if(!name || !email || !contact || !service || !price || !password){
    return res.status(400).json({message:"All fields are required"})
    }

    if(!nameRegex.test(name)){
    return res.status(400).json({message:"Name must contain only letters"})
    }

    if(!emailRegex.test(email)){
    return res.status(400).json({message:"Invalid email"})
    }

    if(!phoneRegex.test(contact)){
    return res.status(400).json({message:"Mobile must start with 6,7,8,9 and be 10 digits"})
    }

    if(isNaN(price) || price <= 0){
    return res.status(400).json({message:"Invalid price"})
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const image = req.file ? req.file.filename : ""

    const provider = new Provider({
    name,
    email,
    contact,
    service,
    price,
    password:hashedPassword,
    image
    })

    await provider.save()

    res.json({message:"Provider Added Successfully"})

  }
  catch(error){

    res.status(500).json({error:error.message})

  }

}
export const getProviders = async (req, res) => {

  try {

    const providers = await Provider.find()

    res.json(providers)

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

}

export const deleteProvider = async (req, res) => {

  try {

    const provider = await Provider.findByIdAndDelete(req.params.id);

    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    res.json({ message: "Provider deleted successfully" });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};
export const updateProvider = async (req,res)=>{

  try{

    const {name,email,contact,service,price,password} = req.body

    const nameRegex = /^[A-Za-z\s]+$/
    const phoneRegex = /^[6789][0-9]{9}$/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if(!name || !nameRegex.test(name)){
    return res.status(400).json({message:"Invalid name"})
    }

    if(!email || !emailRegex.test(email)){
    return res.status(400).json({message:"Invalid email"})
    }

    if(!contact || !phoneRegex.test(contact)){
    return res.status(400).json({message:"Invalid phone"})
    }

    let updateData = {
    name,
    email,
    contact,
    service,
    price
    }

    if(password){
    updateData.password = await bcrypt.hash(password,10)
    }

    if(req.file){
    updateData.image = req.file.filename
    }

    const provider = await Provider.findByIdAndUpdate(
    req.params.id,
    updateData,
    { returnDocument:"after" }
    )

    res.json(provider)

  }
  catch(error){

    res.status(500).json({error:error.message})

  }

}

export const getProviderProfile = async (req,res)=>{

  try{

    const provider = await Provider.findById(req.params.id)

    res.json(provider)

  }
  catch(error){

    res.status(500).json({message:error.message})

  }

}


export const updateProviderProfile = async (req,res)=>{

  try{

    const provider = await Provider.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true}
    )

    res.json(provider)

  }
  catch(error){

    res.status(500).json({message:error.message})

  }

}

export const providerLogin = async (req,res)=>{

  try{

    const {email,password} = req.body

    const provider = await Provider.findOne({email})

    if(!provider){

      return res.status(404).json({message:"Provider not found"})

    }

    const isMatch = await bcrypt.compare(password,provider.password)

    if(!isMatch){
      
      return res.status(400).json({message:"Invalid password"})
      
    }

    const token = jwt.sign(
    {
    id:provider._id,
    role:"provider"
    },
    "secretkey",
    {expiresIn:"1d"}
    )

    res.json({
    message:"Login successful",
    token,
    provider
    })

  }
  catch(error){

  res.status(500).json({error:error.message})

  }

}

export const changeProviderPassword = async (req,res)=>{

    try{

      const {oldPassword,newPassword} = req.body

      const provider = await Provider.findById(req.params.id)

      if(!provider){

        return res.status(404).json({message:"Provider not found"})
      
      }

      const isMatch = await bcrypt.compare(oldPassword,provider.password)

      if(!isMatch){

        return res.status(400).json({message:"Old password is incorrect"})

      }


      const hashedPassword = await bcrypt.hash(newPassword,10)

      provider.password = hashedPassword

      await provider.save()

      res.json({message:"Password updated successfully"})

    }

    catch(error){

      res.status(500).json({error:error.message})

    }

}
