var express = require('express');

var path=require('path');


var router = express.Router();


router.use(express.static(__dirname+"./public/"));
var mysql=require('mysql');

var conn=mysql.createConnection({

  host:"localhost",
  user:"root",
  password:'',
  database:'ems',
});

conn.connect(function(err){

  if(err) throw err;
  console.log('Connection created successfully !! ');
});

router.get('/', function(req, res, next) {

  var getQuery='select * from `employee`';
  conn.query(getQuery,function(err,result){
    if(err) throw err;

    res.render('index',{title:'Employee Records',records:result,success:''});

  });

  



});

router.post('/', function(req, res, next) {

 

     var name=req.body.uname;
     var email=req.body.email;
     var etype=req.body.emptype;
     var hourlyrate=req.body.hrlyrate;
     var totalHour=req.body.ttlhr;
     var total=parseInt(hourlyrate)* parseInt(totalHour);
      
      
      console.log(name+email+etype+hourlyrate+totalHour+total);
  

  var insertQuery='INSERT INTO `employee`(`name`, `email`, `etype`, `hourlyrate`, `totalhour`, `total`) VALUES (?,?,?,?,?,?)';
   var query=mysql.format(insertQuery,[name,email,etype,hourlyrate,totalHour,total]);
   conn.query(query,function(err,response){

    if(err) throw err;

    var getQuery="select * from `employee`";
     
     conn.query(getQuery,function(err,result){
  

      if(err) throw err;
      res.render('index',{title:'Employee Records',records:result,success:'Records Inserted Successfully !!'});

     });

    });

 
 
});

router.get('/edit/:id', function(req, res, next) {
   var id=req.params.id;
  var getQuery='select * from `employee` where `id`=?';
  var query=mysql.format(getQuery,[id]);
  conn.query(query,function(err,result){
    if(err) throw err;
    var string=JSON.stringify(result);
    var json=JSON.parse(string);


    res.render('edit',{title:'Employee Records',records:json,success:''});

  });

  router.post('/update/', function(req, res, next) {

 
   var id=req.body.id;
    var name=req.body.uname;
     var email=req.body.email;
    var etype=req.body.emptype;
    var hourlyrate=req.body.hrlyrate;
    var totalHour=req.body.ttlhr;
    var total=parseInt(req.body.hrlyrate)*parseInt(req.body.ttlhr);
      
      
      console.log(name+email+etype+hourlyrate+totalHour+total);
  

  var updateQuery="UPDATE `employee` SET `name`=?,`email`=?,`etype`=?,`hourlyrate`=?,`totalhour`=?,`total`=? WHERE `id`=?";
   var query=mysql.format(updateQuery,[name,email,etype,hourlyrate,totalHour,total,id]);
   console.log(query);
   conn.query(query,function(err,response){

    if(err) throw err;
     var getQuery="select * from `employee`";
     
     conn.query(getQuery,function(err,result){
  

      if(err) throw err;
      res.render('index',{title:'Employee Records',records:result,success:'Records updated Successfully !!'});

     });

    
    
   });

 
 
});

  



});


router.get('/delete/:id', function(req, res, next) {
  var id=req.params.id;
  
  var deleteData='delete from employee where id=?';
  
  var query=mysql.format(deleteData,id);

  conn.query(query,function(err,response){

    if(err) throw err;

    var getQuery='select * from `employee`';

    conn.query(getQuery,function(err,result){

      if(err) throw err;

      res.render('index',{title:'Employee Records',records:result,success:'Record Deleted Successfully !!'});
    });

  });

 
 
 
 

 });




// router.post('/upload',upload, function(req, res, next) {

//   var imageFile=req.file.filename;
//   var success=req.file.filename+" uploaded successfully !";

//   var imageDetails=new uploadModel({

//     imagename:imageFile,
//   });
//   imageDetails.save(function(err,doc){
//     if(err) throw err;

//     imagedata.exec(function(err,data){

//       if(err) throw err;
//       res.render('upload-file', { title: 'Upload File',records:data,success:success});

//     }); 
    

//   });
// });

  // router.get('/upload',function(req, res, next) {

  
  
  //   imagedata.exec(function(err,data){
  //     if(err) throw err;
  // res.render('upload-file', { title: 'Upload File', records:data, success:'' });
  //   });
  
  
  
  // });

  // function checkLogin(req,res,next){
  //   var myToken= localStorage.getItem('myToken');
  //   try {
  //    jwt.verify(myToken, 'loginToken');
  //   } catch(err) {
  //     res.send ("you need login to access this page");
  //   }
  //   next();
  // }



/* GET home page. */


// router.get('/login',function(req, res, next) {

//   var token = jwt.sign({ foo: 'bar' }, 'loginToken');
//   localStorage.setItem('myToken', token);
//   res.send("Login Successfully");
// });

// router.get('/logout',function(req, res, next) {

//   localStorage.removeItem('myToken');
//   res.send("Logout Successfully");
  
// });



// router.post('/search/', function(req, res, next) {

//   var flrtName = req.body.fltrname;
//   var flrtEmail = req.body.fltremail;
//   var fltremptype = req.body.fltremptype;
  
//   if(flrtName !='' && flrtEmail !='' && fltremptype !='' ){

//    var flterParameter={ $and:[{ name:flrtName},
//   {$and:[{email:flrtEmail},{etype:fltremptype}]}
//   ]
//    }
//   }else if(flrtName !='' && flrtEmail =='' && fltremptype !=''){
//     var flterParameter={ $and:[{ name:flrtName},{etype:fltremptype}]
//        }
//   }else if(flrtName =='' && flrtEmail !='' && fltremptype !=''){

//     var flterParameter={ $and:[{ email:flrtEmail},{etype:fltremptype}]
//        }
//   }else if(flrtName =='' && flrtEmail =='' && fltremptype !=''){

//     var flterParameter={etype:fltremptype
//        }
//   }else{
//     var flterParameter={}
//   }
//   var employeeFilter =empModel.find(flterParameter);
//   employeeFilter.exec(function(err,data){
//       if(err) throw err;
//       res.render('index', { title: 'Employee Records', records:data });
//         });
  
  
// });

// router.get('/delete/:id', function(req, res, next) {
    
//     var id=req.params.id;
//     var del=empModel.findByIdAndDelete(id);
    
//   del.exec(function(err){
//     if(err) throw err;
   
//     employee.exec(function(err,data){
//       if(err) throw err;
//       res.render('index', { title: 'Employee Records', records:data,success:'Record Deleted  Successfully !'});
  
//     });
//   });
 
// });








module.exports = router;
