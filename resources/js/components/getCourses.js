import axios from 'axios';


export const getCourses=()=>{
    let token="";  
    if(localStorage.getItem("token")){
    token= localStorage.getItem("token");
    }
    else if(sessionStorage.getItem("token")){
    token= sessionStorage.getItem("token");
    }
    var courses=[];
    if(token){
        axios.get("/api/courses", { headers: { "Authorization": `Bearer ${token}` } })
        .then(res => {
        res.data.forEach(element => {
            axios.get('https://cors-anywhere.herokuapp.com/https://www.udemy.com/api-2.0/courses/' + element.courses_id + '/', { headers: { Authorization: 'Basic ZDRUUnpnS0pmTEtnTW16SFdMTXM5dmlFYTY0QWcySnNNOGEzOFpFbzo2UEppUUlENGdwcnJKNFZBZDRwVjV3RTVLb3Nac0NuYmQ4aGRhalFNdXRGd0xzRXh1MFlPSHk1ZzlJTDJhTkpKUHlKSEVFQjFsUU5mUFo0Z09YaFUxdEd1V1ZyOTF3eHdXYnJMVml3Q3FEVnRmWVRERDNSY0MyREpVNGpmazYzcQ==' } })
            .then(res2 => {
                //console.log(res2.data);
                courses.push({ id: res2.data.id, title: res2.data.title, image: res2.data.image_240x135, price: res2.data.price, name: res2.data.visible_instructors[0].name, url: res2.data.url });//recuperer les données voulus dans l'objet  
                console.log(courses);
            })          
        })
    }).catch(errors => {
        console.log(errors);
        });
}
console.log("cours",courses);
return courses;
}

