// You are not permitted to change this in any way
function Student(name, major, yearInSchool, club) {
    this.name = name; // string, (e.g. "Jim", "Pam", "Michael")
    this.major = major; // string, (e.g. "Computer Science", "Art", "Business")
    this.yearInSchool = yearInSchool; // int, (e.g. 1, 2, 3, 4)
    this.club = club; // string, (e.g. "Improv", "Art")
}

var students = [
    new Student("Pam", "Art", 2, "Art"),
    new Student("Michael", "Business", 4, "Improv"),
    new Student("Dwight", "Horticulture", 1, "Karate"),
    new Student("Jim", "Sports Science", 2, "Guitar"),
    new Student("Angela", "Accounting", 4, "Cat"),
    new Student("Toby", "Human Resources", 3, "Photography")
];

var clubOrder = {
    improv: 1,
    cat: 2,
    art: 3,
    guitar: 4
};

// logMe function to display Student information
Student.prototype.logMe = function(club) {
    if (club) {
        console.log(this.name + " - " + this.major + " - " + this.yearInSchool + " - " + this.club);
    } else {
        console.log(this.name + " - " + this.major + " - " + this.yearInSchool);
    }
}

// logs the sorted array to the console
function logArray(array, sortType) {
    console.log("**********")
    console.log("The students sorted by " + sortType + " are:");
    if (sortType === "club affiliation") {
        array.forEach(function (student) {
            student.logMe(true);
        })
    } else {
        array.forEach(function (student) {
            student.logMe(false);
        });
    }
}

/* This function sorts arrays using an arbitrary comparator. You pass it a comparator
and an array of objects appropriate for that comparator and it will return a new array
which is sorted with the largest object in index 0 and the smallest in the last index*/
function sortArr(comparator, array) {
    for (var i = 1; i < array.length; i++) {
        var check = i;
        var item = array[check];

        while (check > 0 && (comparator(item, array[check - 1]) ) ) {
            array[check] = array[check - 1];
            array[check - 1] = item;
            check -= 1;
        }
    }
}

/* A comparator takes two arguments and uses some algorithm to compare them. If the first
argument is larger or greater than the 2nd it returns true, otherwise it returns false.
Here is an example that works on integers*/
function exComparator( int1, int2){
    if (int1 > int2){
        return true;
    } else {
        return false;
    }
}

/* For all comparators if students are 'tied' according to the comparison rules then the order of
those 'tied' students is not specified and either can come first*/

/* This compares two students based on their year in school. Sort in descending order.*/
function yearComparator(student1, student2) {
    return student1.yearInSchool > student2.yearInSchool
}

/* This compares two students based on their major. It should be case insensitive and
makes which are alphabetically earlier in the alphabet are "greater" than ones that
come later (from A-Z).*/
function majorComparator(student1, student2) {
    var lowerMajor1 = student1.major.toLowerCase();
    var lowerMajor2 = student2.major.toLowerCase();
    return lowerMajor1 < lowerMajor2;
}

/* This compares two students based on the club they're in. The ordering from "greatest"
to "least" is as follows: improv, cat, art, guitar, (types not otherwise listed).
It should be case insensitive. If two clubs are of equal type then the student who
has the higher year in school should be "greater."*/
function clubComparator(student1, student2) {
    var student1Club = student1.club.toLowerCase();
    var student2Club = student2.club.toLowerCase();
    if (clubOrder[student1Club] < clubOrder[student2Club]) {    //check know club order
        return true;
    } else if (student1Club === student2Club || (!(student1Club in clubOrder) && !(student2Club in clubOrder))) { //check if clubs are same
        return student1.yearInSchool > student2.yearInSchool;   //compare years in school
    } else {
        return student1Club in clubOrder && !(student2Club in clubOrder); //check if student clubs in club order
    }
}

/* Your program should output the following to the console.log, including each of the opening and closing
stars. All values in parenthesis should be replaced with appropriate values. To accomplish this, you will
have to sort the array of students using each comparator and then loop through the array and and call logMe
on each student of the now-sorted array. If the argument is 'true' then it prints the student's name, major,
year in school, and club affiliation. If the argument is 'false' then the club affiliation is ommited and
just the student's name, major and year in school is logged. Please carefully note which sorted results require
the club to be displayed and which do not.

**********
The students sorted by year in school are:
(Name - Major - Year) // of the "greatest" student
...
(Name - Major - Year) // of the "least" student

**********
The students sorted by major are:
(Name - Major - Year) // of the "greatest" student
...
(Name - Major - Year) // of the "least" student

**********
The students sorted by club affiliation are:
(Name - Major - Year - Club) // of the "greatest" student
...
(Name - Major - Year - Club) // of the "least" student

**********

As an example of what is expected to be printed to the console with logMe being sent True for a single student:
Jim - Sports Science - 2 - Guitar

*/

sortArr(yearComparator, students);
logArray(students, "year");
sortArr(majorComparator, students);
logArray(students, "major");
sortArr(clubComparator, students);
logArray(students, "club affiliation");
console.log("**********")

