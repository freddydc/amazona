// Arguments

const dato = {
    lybrary: [
        {
            a: "The Science",
            b: "The Fiction",
        },
    ],
};

dato.lybrary.map((product) =>
    console.log("dict: ", product, "\nelem: ", product.a)
);

dato.lybrary.map((book) => console.log(book));

// start
let name = {
    my_name: "Hello",
};
const { my_name } = name;
console.log(my_name);
// End

// Start
let a = 10;
function sum(a) {
    return a + 10;
}
console.log(sum(a));

let suma = (a) => a + 10;
console.log(suma(a));
// End
