/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	signup : function(req,res){
        console.log("Backend works");
        
       var Passwords = require('machinepack-passwords');
       
        Passwords.encryptPassword({
            password : req.param('password'),
            difficulty :10
        }).exec({
            error : function(err){
              return res.negotiate(err);
            },
            success:function(encrytedPassword){
                console.log("password Encryted");
                require('machinepack-gravatar').getImageUrl({
                    emailAddress :req.param('email')
                }).exec({
                    error: function(err){
                      return res.negotiate(err);
                    },
                    success : function(gravatarUrl){
                        console.log("Now creating users");
                        User.create ({
                            name :req.param('name'),
                            email:req.param('email'),
                            password:encrytedPassword,
                            lastLoggedIn:new Date(),
                            gravatarUrl : gravatarUrl
                        },function userCreated(err,newUser){
                            if(err){
                                console.log("error " +err);
                               return res.negotiate(err);
                            }
                    
                    //SESSION
                            console.log("User Added");
                            return res.json({
                                id : newUser.id
                            });
                            
                        })
                        
                    }
                })
            }
        })
     
    },
    
    login: function(req,res){
        console.log("Login Backed works");
        User.findOne({
            email : req.param('email')
        },function foundUser(err,user){
            if(err){
                return res.negotiate(err);
            }
            if(!user){
                return notFound();
            }
            require('machinepack-passwords').checkPassword({
                passwordAttempt : req.param('password'),
                encryptedPassword :user.password
            }).exec({
                error : function(err){
                    console.log("Password Error");
                    return res.negotiate(err);
                },
                incorrect : function(){
                    console.log("Password incorrect");
                    return res.notFound();
                },
                success : function(){
                    req.session.me = user.id;
                    console.log("Success,Creating session");
                    return res.ok();
                }
            })
        })
    },
    
    logout : function(req,res){
        User.findOne({id:req.session.me},function(err,user){
            if(err){
                return res.negotiate(err);
            }
            req.session.me == null;
            res.redirect('/');
            console.log("Logged Out");
        })
    }
};

