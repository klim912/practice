const Greetings = async (greeting) => {
    try {
        if (!greeting) {
            throw new Error("Параметр greeting не передано!"); 
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return greeting;
    } catch (error) {
        throw error; 
    }
};

async function result_output() {
    try {
        const result = await Greetings("Hello, World!"); 
        console.log(result); 
    } catch (error) {
        console.error("Помилка при виклику Greetings:", error.message); 
    }
}

result_output();

const delay= ms=>{
    return new Promise(resolve=>setTimeout(()=>resolve(),ms))
}

delay(2000).then(()=>console.log('Hello, World!'));