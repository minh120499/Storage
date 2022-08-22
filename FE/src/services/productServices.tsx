
const addProduct=(data:any)=>{
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify(data);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw
};

 return fetch("http://localhost:8080/api/products/add", requestOptions)


}
export default addProduct