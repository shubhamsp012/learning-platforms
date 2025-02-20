const mongoose = require("mongoose");
const quiz =  require("./models/quiz");

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/LoginF')
}
main().then(()=>{
    console.log("connect");
}).catch(err=>console.log(err));


let data = [
    {
        question: "2. In what year was C programming language developed?",
        options: [
            "a) 1980",
            "b) 1972",
            "c) 1965",
            "d) 1995"
        ],
        correctAnswer: "b) 1972",
    },
    {
        question: "3. Which of the following is a key feature of C programming?",
        options: [
            "a) It is slow and inefficient.",
            "b) It is a high-level programming language.",
            "c) It allows low-level memory manipulation.",
            "d) It is not portable across platforms."
        ],
        correctAnswer: "c) It allows low-level memory manipulation",
    },
    {
        question: "4. Why is learning C programming important?",
        options: [
            "a) It  the easiest language to learn.",
            "b) It helps in understanding how programming languages work at a low level.",
            "c) It  only used for game development.",
            "d) It requires no knowledge of memory management."
        ],
        correctAnswer: "b) It helps in understanding how programming languages work at a low level.",
    },
    {
        question: "5. Which of the following applications is C NOT commonly used for?",
        options: [
            "a) Operating Systems",
            "b) Web Development",
            "c) Game Development",
            "d) Embedded Systems"
        ],
        correctAnswer: "b) Web Development",
    },
    {
        question: "6. What is the main purpose of the #include directive in a C program?",
        options: [
            "a) To define variables",
            "b) To include external libraries or header files",
            "c) To print output",
            "d) To start the program execution"
        ],
        correctAnswer: "b) To include external libraries or header files",
    },
    {
        question: "7. What does the main() function represent in a C program?",
        options: [
            "a) A library function",
            "b) The entry point or starting point of the program",
            "c) A variable declaration",
            "d) The function to define memory allocation"
        ],
        correctAnswer: "b) The entry point or starting point of the program",
    },
    {
        question: "8. Which function is used in C to print output to the console?",
        options: [
            "a) scanf()",
            "b) printf()",
            "c) cin()",
            "d) output()"
        ],
        correctAnswer: "b) printf()",
    },
    {
        question: "9. What does the return 0; statement indicate in the main() function?",
        options: [
            "a) Program has encountered an error",
            "b) Program has executed successfully",
            "c) Program should terminate immediately",
            "d) Program has to be recompiled"
        ],
        correctAnswer: "b) Program has executed successfully",
    },
    {
        question: "10. Which of the following is the correct syntax for including the standard input-output library in C?",
        options: [
            "a) #include <stdio.h>",
            "b) #include <stdlib.h>",
            "c) #input <stdio.h>",
            "d) #include stdio.h"
        ],
        correctAnswer: "a) #include <stdio.h>",
    },
];


quiz.insertMany(data);