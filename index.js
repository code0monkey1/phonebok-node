        const express=require("express")
        const app= express()
        app.use(express.json())
        
        const morgan=require("morgan")
        morgan.token("type" , (req,res)=> JSON.stringify(req.body) )
        app.use(morgan(`:method :url :status :res[content-length] - :response-time ms :type`))
      
        const cors=require('cors')       
        app.use(cors())

      
        //  console.log("Logging that this is the node module running !!!")
        // custom middleware 
        // const requestLogger = (request,response,next)=>{
        //     console.log("metnod: ",request.method ) 
        //     console.log("path : ",request.path)
        //     console.log("Body ",request.body)
        //     console.log("---")
        //     next()
        // }

        // app.use(requestLogger)

        // const unknownEndpoint = (request, response) => {
        //     response.status(404).send({ error: 'unknown endpoint' })
        //   }
   console.log("The node module has started executing !! ")
  
        let persons= [
            {name : "Arto Hellas",
            number :"34234-234234",
            id:1
            },
            {
            name : "Brto Hellas",
            number :"44234-234234",
            id:2
            },
            {name : "Crto Hellas",
            number :"54234-234234",
            id:3
            },
            {
                name : "Drto Hellas",
            number :"64234-234234",
            id:4
            }

        ]

        app.get("/api/persons",(request,response)=>{
        
            response.send(persons)

        } )

        app.get("/",(request,response)=>{
            response.send("<div> Hello node </div>")
        })

        // app.get("/info",(request,response)=>{
            
        //     response.send(
        //         `<div>Phonebook has info for ${persons.length} people </div>
        //         <br/>
        //         <div> ${Date()} </div>`
            
        //     )
        //     }
        // )
        app.get("/api/persons/:id" ,(request,response)=>{
            
            const id=Number(request.params.id);

            const entry = persons.find( person => person.id===id)
            
           if(entry) response.send(entry)
           else response.status(404).end()
        })

        app.delete("/api/persons/:id" ,(request,response)=>{
            console.log("The delete method on the node server has been reached ")
            const id=Number(request.params.id)

            persons=persons.filter( person => person.id!==id)
            
            response.status(204).end()
        })
        function getId(){
            
            return Math.round(Math.random()*1000)

        }
        app.post( "/api/persons/",(request,response)=>{
            console.log("The post method on the node server has been reached")
            const person=request.body
            
            const isDuplicateName = persons.find( p => p.name===person.name)
            
            if( person.name && person.number && !isDuplicateName){
                
                person.id=getId();

                // console.log(person)

                persons=persons.concat(person)
                response.json(person)
            }
            else{
                
                let error;

                    if(isDuplicateName)error= 'name must be unique'
                    else if (! person.number)error = 'must put in a number '
                    else if ( ! person.name )error = 'must put in a name'
                
                    console.log(`The error is ${error}`)
                
                return response.status(400)
                        .json({ error: `${error}` })

            }
        

        }
        )

        // app.use(unknownEndpoint)

        const PORT =process.env.PORT||3001

        app.listen(PORT,()=>{
            console.log(`server started running on port ${PORT} `)
        })
