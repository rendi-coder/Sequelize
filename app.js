const express = require('express')
const path = require('path')
const sequelize = require('./utils/database')

const Contacts = require(path.join(__dirname,'models/contacts'))

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(path.resolve(__dirname,'client')))

app.use(express.json())

app.get('/api/contacts',async (req,res)=>{
    try{
        const contacts = await Contacts.findAll();
        res.status(200).json(contacts);
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:'Server error'
        })
    }
})

app.post('/api/contacts',async (req,res)=>{
    try{
        const candidate = {...req.body,marked:false}
        const contact = await Contacts.create(candidate)
        res.status(201).json({contact})
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:'Server error'
        })
    }
})

app.delete('/api/contacts/:id',async (req,res)=>{
    try{
    await Contacts.destroy({
        where: {
        id: req.params.id
        }
    });
    res.status(200).json({message: 'Deleted contact'})
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:'Server error'
        })
    }
 })

 app.put('/api/contacts/:id',async (req,res)=>{
     try{
        const contact = await Contacts.findByPk(+req.params.id)
        contact.marked = !contact.marked
        await contact.save()
        res.status(200).json({contact})
     }catch(e){
        console.log(e);
        res.status(500).json({
            message:'Server error'
        })
     }
    
  })
 
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','index.html'))
})

async function start(){
    try{
        await sequelize.sync() //{force:true} { alter: true }
        app.listen(PORT,()=>{
            console.log("Server has been started on port 3000...")
        })
    }catch(e){
        console.log(e)
    }
}

start();