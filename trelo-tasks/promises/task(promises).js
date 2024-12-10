const resolvedPromise = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Promise resolved!"); 
    }, 2000);
});

resolvedPromise.then((message) => {
    console.log(message);
});

const rejectedPromise = new Promise((_,reject) => {
    setTimeout(() => {
        reject(new Error("Promise rejected!")); 
    }, 2000);
});

rejectedPromise.catch((error)=>{
    console.error(error.message);
});