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

let name = {
    my_name: "Hello",
};

const { my_name } = name;
console.log(my_name);
