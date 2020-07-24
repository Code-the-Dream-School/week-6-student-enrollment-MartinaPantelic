//STUDENT
// fetch student list

const getStudentList = () => {

    let apiCallStudent = `https://code-the-dream-school.github.io/JSONStudentsApp.github.io/Students.json`;
    console.log(apiCallStudent);

    fetch(apiCallStudent)
        .then(response => response.json())
        .catch(e => {
            console.error(`Retreival error: ${e}`);
        })
        .then(data => studentData(data));

}


//create student card HTML
const studentList = document.getElementById('student-list');
const addStudentCard = () => {

    let card = document.createElement('div');

    if (studentInfo.status === true) {
        card.className = "active";
    }

    card.innerHTML = `
 
        <article class="item-wrap" id="${studentInfo.id}">
        <div class="name h5">${studentInfo.name} ${studentInfo.lastName}<span></span></div>
        <ul class="courses-list">
        </ul>
        <div class="button-wrap">
            <button id="add-course" class="btn btn-outline-info add-course" type="button">Add course</button>
            <button id="edit-info" class="btn btn-outline-info" type="button">Edit info</button>
        </div>
    </article>
 
 `;

    studentList.appendChild(card);

}


// get student data


const studentData = (data) => {


    for (let i = 0; i < data.length; i++) {

        studentInfo = {
            name: data[i].name,
            lastName: data[i].last_name,
            status: data[i].status,
            id: data[i].id,
            courses: []
        }

        addStudentCard();
        addSelectCourse();

    }
}


//COURSES   

// fetch courses list

const getCourseList = () => {

    let apiCallCourse = `https://code-the-dream-school.github.io/JSONStudentsApp.github.io/Courses.json`;
    console.log(apiCallCourse);

    fetch(apiCallCourse)
        .then(response => response.json())
        .catch(e => {
            console.error(`Retreival error: ${e}`);
        })
        .then(data => courseData(data));
      
}

//create student card HTML

const addCourseCard = () => {
    const courseList = document.getElementById('course-list');
    let card = document.createElement('div');

    card.innerHTML = `
 
        <article class="item-wrap">
        <div class="name h5">${courseInfo.name}<span class="hours">${courseInfo.duration}</span></div>
        <ul class="courses-list">
       <!-- <li>django</li>
        <li>sq basics</li> -->
        </ul>
        <div class="button-wrap">
            <button id="add-student" class="btn btn-outline-info" type="button">Add student</button>
        </div>
        </article>
 
    `;

    courseList.appendChild(card);

}


// get course data

const courseData = (data) => {
    for (let i = 0; i < data.length; i++) {

        courseInfo = {
            name: data[i].name,
            duration: data[i].duration
        }

        addCourseCard();
        
    }
    console.log(data.length);
    return data

}



// add course form to student

const addSelectCourse = () => {

    //Create array of options to be added
    let array = ["Introduction to Wireframing", "Django"];

    //Create and append select form

    const coursesForm = document.createElement("form");
    const selectList = document.createElement("select");
    const submitCourseBtn = document.createElement("button");

    

    submitCourseBtn.innerHTML = "Submit Course";
    //submitCourseBtn.setAttribute("class", "btn btn-primary");
    submitCourseBtn.setAttribute( "class", "btn btn-primary add-course-" + studentInfo.id.toString());

    //selectList.id = "course-enroll";
    selectList.setAttribute("class", "form-control mb-3");
    selectList.setAttribute( "id", "course-enroll-" + studentInfo.id.toString());

   
    studentList.appendChild(coursesForm);
    coursesForm.appendChild(selectList);
    coursesForm.appendChild(submitCourseBtn);

    //Create and append the options
    for (let i = 0; i < array.length; i++) {
        let option = document.createElement("option");
        option.value = array[i];
        option.text = array[i];
        selectList.appendChild(option);
    }

    //add course to student

    // const addCourseForm = () => {
    //     console.log("test")
    // }
    
    // coursesForm.addEventListener('click', (e) => {
    //     if (e.target.classList.contains('add-course-0')) {
    //         addCourseForm();
    //     }
    // });

}

getCourseList();
getStudentList();