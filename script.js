const students = [];
var a = document.getElementById("editStudentForm")
a.style.display = "none";

function addStudent(name, city, fees) {
  students.push({ name, city, fees });
  console.log(students[0].fees)
  updateTable();
}

function deleteStudent(index) {
  students.splice(index, 1);
  
  updateTable();
  
}

function updateStudent(index, name, city, fees) {
  students[index] = { name, city, fees };
  updateTable();
}

function updateTable() {
  const tbody = document.querySelector("#studentsTable tbody");
  tbody.innerHTML = "";
  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    
    const tr = document.createElement("tr");

    const No = document.createElement("td");
    No.textContent = i+1;

    const nameTd = document.createElement("td");
    nameTd.textContent = student.name;

    const cityTd = document.createElement("td");
    cityTd.textContent = student.city;

    const feesTd = document.createElement("td");
    feesTd.textContent = "$" + (student.fees);

    const actionTd = document.createElement("td");

    const editButton = document.createElement(`a`);
    editButton.textContent = "Edit ";
    editButton.addEventListener("click", () => {
      editStudent(i);
    });

    const deleteButton = document.createElement(`a`);
    deleteButton.textContent = " Delete";
    deleteButton.addEventListener("click", () => {
      deleteStudent(i);
    });

    actionTd.appendChild(editButton);
    actionTd.appendChild(deleteButton);
    tr.appendChild(No);
    tr.appendChild(nameTd);
    tr.appendChild(cityTd);
    tr.appendChild(feesTd);
    tr.appendChild(actionTd);
    tbody.appendChild(tr);
  }
}

const addStudentForm = document.getElementById("addStudentForm");
const editStudentForm = document.getElementById("editStudentForm");
const cancelEditButton = document.getElementById("cancelEditButton");

function editStudent(index) {
  const student = students[index];
  document.getElementById("editName").value = student.name;
  document.getElementById("editCity").value = student.city;
  document.getElementById("editFees").value = student.fees;

  editStudentForm.style.display = "block";
  addStudentForm.style.display = "none";

  editStudentForm.onsubmit = (e) => {
    e.preventDefault();

    const name = document.getElementById("editName").value;
    const city = document.getElementById("editCity").value;
    const fees = document.getElementById("editFees").value;

    updateStudent(index, name, city, fees);

    editStudentForm.style.display = "none";
    addStudentForm.style.display = "block";
  };
}

cancelEditButton.onclick = () => {
editStudentForm.style.display = "none";
addStudentForm.style.display = "block";

};

addStudentForm.onsubmit = (e) => {
e.preventDefault();

const name = document.getElementById("name").value;
const city = document.getElementById("city").value;
const fees = document.getElementById("fees").value;

addStudent(name, city, fees);

addStudentForm.reset();
};

updateTable();





//Total fees
const totalFees = () =>{
    let sum = 0;
    let fees = document.getElementById("fees").value
    
    for ( let i = 0; i < students.length+1 ; i ++ ){
        sum += parseInt(fees);
    }
    return sum
}

//total students
const totalStudents = () => students.length + 1 ;

//total students whose name starts with R
const nameStartsWithR = () => {
    const rArray = students.filter((student) => student.name.at(0) === 'R')
    return rArray.length
}

//city of fourth student
const cityOfFourthStudent = () => {
    return students.length >= 3 ? students[3].city : "not found"
}

//total fees of third and fifth student
const totalOfThirdAndFifthStudent = () => {
    let fees = document.getElementById("fees").value
    return students.length > 4 ? parseInt(students[4].fees) + parseInt(students[2].fees) : students.length>2 ? students[2].fees : "Not found"

}

//total of students whose fees in between 2000 and 3900
const feesBetweenTwoAndThreeThousand = () => {
    const totalStudents = students.filter((student) => parseInt(student.fees) >= 2000 && parseInt(student.fees) <= 3900)
    return totalStudents.length;
}

//total of students whose fees is less than one thousand
const feesLessThanThousand = () => {
    const totalStudents = students.filter((student) => parseInt(student.fees) < 1000)
    return totalStudents.length;
}

//Number of students whoose name starts from 'S' and city name starts from "Ch"
const nameSCityCh = () => {
    const totalStudents = students.filter((student) => (student.name.at(0) === 'S') && (student.city.substring(0, 2) === 'Ch'))
    return totalStudents.length
}

//Number of students whoose name starts from 'J' OR city name starts from "H" 
const nameJCityH = () => {
    const totalStudents = students.filter((student) => student.name.at(0) === 'J' || student.city.at(0) === 'H')
    return totalStudents.length
}

//minimum and maximum fees
const minAndMax = () => {
    if (students.length === 0) {
        return {
            min: 0,
            max: 0
        }
    }

    let min = parseInt(students[0].fees)
    let max = parseInt(students[0].fees)
    students.forEach((student) => {
        if (parseInt(student.fees) < min) {
            min = parseInt(student.fees)
        }

        if (parseInt(student.fees) > max) {
            max = parseInt(student.fees)
        }
    })

    return {
        min, 
        max
    }
}


function statistics(){

    let totalFeeLabel = document.getElementById('totalFees');
    totalFeeLabel.innerHTML = totalFees();

    let totalStudentsLabel = document.getElementById('totalStudents');
    totalStudentsLabel.innerHTML = totalStudents();

    let totalStudentsR = document.getElementById('nameWithR');
    totalStudentsR.innerHTML = nameStartsWithR();

    let cityOfFourth = document.getElementById("cityOfFourthStudent")
    cityOfFourth.innerHTML = cityOfFourthStudent()

    let totalOfThirdAndFifth = document.getElementById("totalOfThirdAndFifth")
    totalOfThirdAndFifth.innerHTML = totalOfThirdAndFifthStudent() 

    let feesBetweenTwoAndThree = document.getElementById("betweenTwoAndThreeThousand")
    feesBetweenTwoAndThree.innerHTML = feesBetweenTwoAndThreeThousand()

    let feesLessThanOneThousand = document.getElementById("lessThanThousand")
    feesLessThanOneThousand.innerHTML = feesLessThanThousand()

    let nameWithSCityWithCh = document.getElementById("SAndCh")
    nameWithSCityWithCh.innerHTML = nameSCityCh()

    let nameWithJCityWithH = document.getElementById("JAndH")
    nameWithJCityWithH.innerHTML = nameJCityH()

    let minAndMaxFees = document.getElementById("minMax")
    minAndMaxFees.innerHTML =  `Min is ${minAndMaxFees["min"]} and max is ${minAndMaxFees["max"]}`

}
