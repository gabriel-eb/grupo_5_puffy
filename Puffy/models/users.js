const fs=require('fs');


const user={
    fileName:'./DB/users.json',
    getData:function(){
        return JSON.parse(fs.readFileSync(this.fileName,'utf-8'))
    },
   
    findAll:function(){
        return this.getData();
    },

    //Buscamos a un usuario por su id (Primary Key)
    findByPK: function(id){
        let allUsers=this.findAll();
        let userFound=allUsers.find(oneUser=>oneUser.id===id);
        return userFound;
        
    },

    //Metodo que nos permite buscar al usuario por cualquier campo, en este caso por email
    //field="email","telefono",etc text=Texto exacto, por ejemplo montse@gmail.com
    findByField: function(field,text){
        let allUsers=this.findAll();
        let userFound=allUsers.find(oneUser=>oneUser[field]===text);
        return userFound;
    },

    //Generar id
    generateId:function(){
        let allUsers=this.findAll();
        let lastUser=allUsers.pop();
        if(lastUser){
            return lastUser.id + 1;
        }
        return 1;
        
    },

    //Guardar al usuario en la DB
    create:function(userData){
        let allUsers=this.findAll();
        let newUser={
            id:this.generateId(),
            ...userData
        }
        allUsers.push(userData);
        fs.writeFileSync(this.fileName,JSON.stringify(allUsers,null,' '));
        return true;
    },
    delete:function(id){
        let allUsers=this.findAll();
        let finalUsers=allUsers.filter(oneUser=>oneUser.id!==id);
        fs.writeFileSync(this.fileName,JSON.stringify(finalUsers,null,' '));
        return true;
    }
}

module.exports=user;