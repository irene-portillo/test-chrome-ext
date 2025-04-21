// NOTE: This made me move it here to make things safer for the 
// chrome extension-- otherwise wont run
// need to call this through js 

// want to use fetch api basically to send requests
// fetch api -- like get requests 
fetch('/api/user')
    .then(response=>response.json())
    .then(users=>console.log(users)); // can also use alert 
// send req to endpoint on server 
