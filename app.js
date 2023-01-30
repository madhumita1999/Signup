const express=require("express");
const app = express();
const request = require("request");
const https = require("https");
const bodyParser = require("body-parser");
const { STATUS_CODES } = require("http");
app.use(express.static("public")); //when u want to make use of static files 
app.use(bodyParser.urlencoded({extended:true}));
app.listen( process.env.PORT || 3002,function(req,res){
    console.log("Am running good")
});
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html");

});
app.post("/",function(req,res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
        const data ={
            members:[
                {
                    email_address: email,
                    status:"subscribed",
                    merge_fields:{
                        FNAME:firstName,
                        LNAME:lastName
                    }

                }
            ]
        };
    const jsonData = JSON.stringify(data); //convert javascript obj to string
    //console.log(firstName,lastName,email);
    const url = "https://us10.api.mailchimp.com/3.0/lists/104ea6f8ef"
    const options = {
        method:"POST",//type of request
        auth:"madhu:abc2db7072fddf2c8f7195c962ace53b3-us10"
    }
    const request1 =https.request(url,options,function(response){
        if(response.statusCode==200){
            //res.send("Succesfully subscribed");
            res.sendFile(__dirname+"/success.html");
        }else{
            //res.send("There's an error signing up pls try again later")
            res.sendFile(__dirname+"/failure.html")
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request1.write(jsonData);
    
    request1.end();

})

app.post("/failure",(req,res)=>{
    res.redirect("/");
})
//bc2db7072fddf2c8f7195c962ace53b3-us10

//list id

//104ea6f8ef


