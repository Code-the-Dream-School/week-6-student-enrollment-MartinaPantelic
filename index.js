// declaring variables

let studentsData = [];
let coursesData = [];

let studentsBlock = document.getElementById('students-block');
let coursesBlock = document.getElementById('courses-block');

let showStudentsBtn = document.getElementById('students');
let showCoursesBtn = document.getElementById('courses');

let submitNewStudent = document.getElementById('submit_btn');
let enrollment;

// Main buttons / event listeners
showStudentsBtn.addEventListener('click', () =>{
    displayStudents();
  })
  
  showCoursesBtn.addEventListener('click', () =>{
    displayCourses();
  })

submitNewStudent.addEventListener('click', (e) => {
    addNewStudent();
})


//enrollment constructor
class Enrollment {
    constructor(students, courses) {
        this.students = students;
        this.courses = courses;

        //initialize the courses for each student
        this.students.forEach(student => {
            student.courses = [];
        });

        //initialize students for each course
        this.courses.forEach(course => {
            course.students = [];
        });
    }

    //add new student
    addNewStudent = (courseId, studentId) => {

        const name = document.getElementById('name').value;
        const last_name = document.getElementById('lastName').value;

        studentsData.push({
            id: studentsData.length,
            name: name,
            last_name: last_name,
            status: true,
            courses: []
        });
        $('#new_student').modal('hide');

    }

    // adding students and courses conditionals
    addCourseToStudent(courseId, studentId) {
        let student = this.students.filter(student => student.id === studentId)[0]
        let course = this.courses.filter(course => course.id === courseId)[0];
        let status = student.status;
        let studentName = student.name;


        if (student.courses.length === 3) {
            alert('maximum number of courses reached');
            return;
        }
        if (course.students.length === 4) {
            alert('maximum number of students reached');
            return;
        }

        if (student.courses.filter(course => course.id === courseId).length > 0) {
            alert('the student is already enrolled in this course');
            return;
        }
        if (course.students.filter(student => student.id === studentId).length > 0) {
            alert('the course is already enrolled to this student');
            return;
        }

        //check students status

        if (status === true) {
            student.courses.push(course);
            course.students.push(student);

        } else {
            alert('Student is not active');
        }



    }

    // edit studdent

    editStudent(studentId, inputName, inputLastName) {
        let student = this.students.filter(student => student.id === studentId)[0];
        student.name = inputName;
        student.last_name = inputLastName;

    }
    // showEditStudent(studentId) {
    //     let student = this.students.filter(student => student.id === studentId)[0]
    //   let editStudent = document.querySelector(".edit-student-form") ; 
    //   editStudent.style.display = "block";
    // }

}

//student api call
const getStudentsData = async () => {
    const response = await fetch('https://code-the-dream-school.github.io/JSONStudentsApp.github.io/Students.json');
    const json = await response.json();
    return json;
}

//courses api call
const getCoursesData = async () => {
    const response = await fetch('https://code-the-dream-school.github.io/JSONStudentsApp.github.io/Courses.json');
    const json = await response.json();
    return json;
}

//get all data
const getAllData = async () => {
    coursesData = await getCoursesData(),
        studentsData = await getStudentsData()

    enrollment = new Enrollment(studentsData, coursesData);

    refreshStudents();
    refreshCourses();
 
}

//add new student
const addNewStudent = (courseId, studentId) => {
    enrollment.addNewStudent(courseId, studentId);
    refreshStudents();
    refreshCourses();

}

//add student to course
const addStudentToCourse = (courseId, studentId) => {
    enrollment.addStudentToCourse(courseId, studentId);
    refreshStudents();
    refreshCourses();

}

//add course to student
const addCourseToStudent = (courseId, studentId) => {
    enrollment.addCourseToStudent(courseId, studentId);
    refreshStudents();
    refreshCourses();

}

// edit student refresh
const editStudent = (studentId, inputName, inputLastName) => {
    enrollment.editStudent(studentId, inputName, inputLastName);
    refreshStudents();
    refreshCourses();

}

//refresh students cards
const refreshStudents = () => {

    studentsBlock.innerHTML = '';
    studentsData.forEach(student => {
       
        // student card added
        let card = document.createElement('div');

        card.setAttribute("class", "card-item");
        card.innerHTML = `

            <article class="item-wrap">
            <div class="name h5">${student.name} ${student.last_name}<span></span></div>
            <div class="courses-list mb-3">
            </div>
            <div class="button-wrap mb-3">
                 <button class="btn btn-outline-info add-course" type="button" data-student="${student.id}">Add course</button>
                <!-- <button class="btn btn-outline-info show-edit-student" type="button" data-student="${student.id}">Edit info</button> -->
                <button class="btn btn-outline-info edit-student" type="button" data-student="${student.id}">Submit info</button>
            </div>
            <div class="edit-student-form">
                <input type="text" class="form-control mb-3" value placeholder="name">
                <input type="text" class="form-control mb-3" value placeholder="last-name">
            </div>
        </article>
        `;


        studentsBlock.appendChild(card);
        if (student.status === true) {
            card.className = "active";
        }

        //selected courses list
        let studentBody = document.createElement('div');

        let coursesResult = '<ul>';
        student.courses.forEach(course => {
            coursesResult += '<li>' + course.name + '</li>';
        });
        coursesResult += '</ul>';

        studentBody.innerHTML += coursesResult;

        card.children[0].children[1].appendChild(studentBody);

        // courses select list
        const populateCoursesList = () => {
            let coursesList = document.createElement("select");
            coursesList.setAttribute("id", "courses-list");
            let option = document.createElement("option");

            for (let i = 0; i < coursesData.length; i++) {
                let option = document.createElement("option");
                option.text = coursesData[i].name;
                option.value = coursesData[i].id;
                coursesList.add(option);
            }
            card.children[0].appendChild(coursesList);
        }

        populateCoursesList();

    });
    // add selected course button - event
    const addCourseBtn = document.querySelectorAll('.add-course');
    addCourseBtn.forEach(el => el.addEventListener('click', event => {
        let courseId = el.parentElement.parentElement.getElementsByTagName('select')[0].value;
        let studentId = el.attributes["data-student"].value;

        addCourseToStudent(parseInt(courseId), parseInt(studentId));
    }));

    //show edit student
    //       let showEditStudentBtn = document.querySelectorAll('.show-edit-student')
    //       showEditStudentBtn.forEach (el => el.addEventListener('click', event =>{
    //         //let studentId = el.attributes["studentId"].value;
    //         //showEditStudent(parseInt(studentId));
    //         let editStudent = document.querySelector(".edit-student-form") ; 
    //   editStudent.style.display = "block";

    //     }));

    //edit student
    let editStudentBtn = document.querySelectorAll('.edit-student');

    editStudentBtn.forEach(el => el.addEventListener('click', event => {
        let studentId = el.attributes["data-student"].value;
        let inputName = el.parentElement.parentElement.children[3].children[0].value;
        let inputLastName = el.parentElement.parentElement.children[3].children[1].value;

        editStudent(parseInt(studentId), inputName, inputLastName);

    }));

}

//refresh courses cards
const refreshCourses = () => {

    let coursesBlock = document.getElementById('courses-block');

    coursesBlock.innerHTML = '';
    coursesData.forEach(course => {

        // create course card
        let card = document.createElement('div');

        card.setAttribute("class", "card-item");
        card.innerHTML = `

            <article class="item-wrap">
            <div class="name h5">${course.name}<span class="hours">${course.duration}</span></div>
            <div class="courses-list mb-3">
            </div>
            <div class="button-wrap mb-3">
                <button class="btn btn-outline-info add-student" type="button" data-course="${course.id}">Add student</button>
            </div>
        </article>
        `;

        coursesBlock.appendChild(card);

        // added students list
        let courseBody = document.createElement('div');

        let studentsResult = '<ul>';
        course.students.forEach(student => {
            studentsResult += '<li>' + student.name + "&nbsp" + student.last_name + '</li>';
        });
        studentsResult += '</ul>';

        courseBody.innerHTML += studentsResult;

        card.children[0].children[1].appendChild(courseBody);

        // students select list
        const populateStudentsList = () => {
            let studentsList = document.createElement("select");
            studentsList.setAttribute("id", "students-list");
            let option = document.createElement("option");

            for (let i = 0; i < studentsData.length; i++) {
                let option = document.createElement("option");
                option.text = studentsData[i].name;
                option.value = studentsData[i].id;
                studentsList.add(option);
            }
            card.children[0].appendChild(studentsList);
        }

        populateStudentsList();

    });


    // add selected student button - event
    const addStudentBtn = document.querySelectorAll('.add-student');
    addStudentBtn.forEach(el => el.addEventListener('click', event => {
        let studentId = el.parentElement.parentElement.getElementsByTagName('select')[0].value;
        let courseId = el.attributes["data-course"].value;

        addCourseToStudent(parseInt(courseId), parseInt(studentId));
    }));

}

//displaying students block
const displayStudents = () => {
    studentsBlock.hidden = false;
    coursesBlock.hidden = true;
}
//displaying courses block
const displayCourses = () => {
    studentsBlock.hidden = true;
    coursesBlock.hidden = false;
}

getAllData();