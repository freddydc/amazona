//* Arguments

const collection = {
  users: [
    {
      name: "Science",
      password: "Fiction",
    },
  ],
};

// Start
collection.users.map((data) =>
  //! Consola
  console.log("Dict: ", data, "\nElement: ", data.name)
);
//! Consola
collection.users.map((data) => console.log(data));

// Start
const sendMessage = {
  message: "Getting this message",
};
const getMessage = sendMessage;
const { message } = getMessage;
//! Consola
console.log(message);

// Start
let a = 10;
function sum(a) {
  return a + 10;
}
//! Consola
console.log(sum(a));

// Start
let suma = (a) => a + 10;
//! Consola
console.log(suma(a));

// Start
let someName = "f,r,e,d,d,y";
let splitName = someName.split(",")[1];
//! Consola
console.log(splitName);

//* Spread Syntax
function spreadSum(x, y, z) {
  return x + y + z;
}

// Start
const numbers = [1, 2, 3];
//! Consola
console.log(spreadSum(...numbers));

//! Consola
console.log(spreadSum.apply(null, numbers));

// Start
let cartExist = undefined;

if (cartExist) {
  //! Consola
  console.log("Already exist!");
} else {
  //! Consola
  console.log("Not exist is new");
}

// Start
const person = { a: [1, 2, 3] };
const result = person.a.filter((letter) => letter != 1);

//! Consola
console.log(result);

//* Syntax spread
let oldName = { name: ["freddy", "juan", "pedro"] };
let newName = { name: "reels" };

// let resultMe = { ...oldName}
// let resultMe = {name: [...oldName.name, newName.name]}
let resultMe = { ...oldName, name: [...oldName.name, newName.name] };

//! Consola
console.log(resultMe);

// Start
let resultFilter = {
  ...oldName,
  name: oldName.name.filter((x) => x !== "juan"),
};

//! Consola
console.log(resultFilter);
