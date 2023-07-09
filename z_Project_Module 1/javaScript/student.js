let arrStudent = localStorage.getItem("arrStudent")
  ? JSON.parse(localStorage.getItem("arrStudent"))
  : [];
let action = "create";
let currentPage = 1;
let numberPerPage = 3;
function renderData() {
  const startIndex = (currentPage - 1) * numberPerPage;
  const endIndex = currentPage * numberPerPage;
  const totalPage = Math.ceil(arrStudent.length / numberPerPage);
  let tbody = document.getElementById("tbody");
  tbody.innerHTML = "";
  for (let i = startIndex; i < endIndex && i < arrStudent.length; i++) {
    tbody.innerHTML += `
    <tr>
      <th scope="row">${i + 1}</th>
      <td>${arrStudent[i].studentId}</td>
      <td>${arrStudent[i].studentName}</td>
      <td>${arrStudent[i].birthDay}</td>
      <td>${arrStudent[i].sex}</td>
      <td>${arrStudent[i].phone}</td>
      <td>${arrStudent[i].email}</td>
      <td>${arrStudent[i].address}</td>
      <td>${arrStudent[i].status}</td>
      <td>${arrStudent[i].commentText}</td>
      <td
        class="d-flex align-content-center justify-content-around"
      >
        <button class="btn btn-warning" data-bs-toggle="modal"
        data-bs-target="#myModal" onclick="updateForm('${
          arrStudent[i].studentId
        }')">
          <i class="fa-regular fa-pen-to-square"></i>
        </button>
        <button class="btn btn-danger" onclick="deleteForm('${
          arrStudent[i].studentId
        }')">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </td>
    </tr>
    `;
  }
  // phân trang
  let previous = document.getElementById("previous");
  let next = document.getElementById("next");
  let pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  if (currentPage > 1) {
    previous.classList.remove("disabled");
  } else {
    previous.classList.add("disabled");
  }
  for (let i = 1; i <= totalPage; i++) {
    let itemPagination = `
    <li class="page-item w-auto p-0 ${
      currentPage === i ? "active" : ""
    }" onclick="changePage('${i}')">
      <a class="page-link rounded-0" href="#">${i}</a>
    </li>
    `;
    pagination.innerHTML += itemPagination;
  }
  if (currentPage >= totalPage) {
    next.classList.add("disabled");
  } else {
    next.classList.remove("disabled");
  }
}
// chan page
function changePage(page) {
  if (page === "previous") {
    currentPage--;
  } else if (page === "next") {
    currentPage++;
  } else {
    currentPage = parseInt(page);
  }
  renderData();
}
let modalTitle = document.getElementById("modalTitle");
let newModal = new bootstrap.Modal(document.getElementById("myModal"), {
  keyboard: false,
});
// add SV
let addStudentBtn = document.getElementById("addStudentBtn");
addStudentBtn.addEventListener("click", function () {
  let studentId = document.getElementById("studentId").value;
  let studentName = document.getElementById("studentName").value;
  let address = document.getElementById("address").value;
  let commentText = document.getElementById("commentText").value;
  let birthDay = document.getElementById("birthDay").value;
  let status = document.getElementById("status").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let sex = document.querySelector('input[name="sex"]:checked').value;
  if (action == "create") {
    let itemStudent = {
      studentId: studentId,
      studentName: studentName,
      address: address,
      commentText: commentText,
      birthDay: birthDay,
      status: status,
      email: email,
      phone: phone,
      sex: sex,
    };
    arrStudent.push(itemStudent);
  } else {
    let index = getIndexForm(studentId);
    if (index !== -1) {
      arrStudent[index].studentName = studentName;
      arrStudent[index].address = address;
      arrStudent[index].commentText = commentText;
      arrStudent[index].birthDay = birthDay;
      arrStudent[index].status = status;
      arrStudent[index].email = email;
      arrStudent[index].phone = phone;
      arrStudent[index].sex = sex;
    }
    action = "create";
    modalTitle.innerHTML = "Thêm mới sinh viên";
    addStudentBtn.innerHTML = "Thêm mới";
  }
  newModal.hide();
  localStorage.setItem("arrStudent", JSON.stringify(arrStudent));
  resetForm();
  renderData();
});
// reset
function resetForm() {
  document.getElementById("studentId").value = "";
  document.getElementById("studentId").readOnly = false;
  document.getElementById("studentName").value = "";
  document.getElementById("address").value = "";
  document.getElementById("commentText").value = "";
  document.getElementById("birthDay").value = "";
  document.getElementById("status").selectedIndex = 0;
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.querySelector('input[value="Nam"]').checked = true;
}
//  update
function updateForm(element) {
  let index = getIndexForm(element);
  if (index != -1) {
    document.getElementById("studentId").value = arrStudent[index].studentId;
    document.getElementById("studentId").readOnly = true;
    document.getElementById("studentName").value =
      arrStudent[index].studentName;
    document.getElementById("address").value = arrStudent[index].address;
    document.getElementById("commentText").value =
      arrStudent[index].commentText;
    document.getElementById("birthDay").value = arrStudent[index].birthDay;
    document.getElementById("status").selectedIndex = 0;
    document.getElementById("email").value = arrStudent[index].email;
    document.getElementById("phone").value = arrStudent[index].phone;
    document.querySelector('input[value="Nam"]').checked = true;
    modalTitle.innerHTML = "Cập nhật sinh viên";
    addStudentBtn.innerHTML = "Cập nhật";
    action = "update";
  }
}
//  get index form
function getIndexForm(code) {
  for (let i = 0; i < arrStudent.length; i++) {
    if (arrStudent[i].studentId == code) {
      return i;
    }
  }
  return -1;
}
// delete
function deleteForm(code) {
  let index = getIndexForm(code);
  if (index !== -1) {
    arrStudent.splice(index, 1);
    localStorage.setItem("arrStudent", JSON.stringify(arrStudent));
    renderData();
  }
}
// search sv
let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", function () {
  let searchName = document.getElementById("searchNameStudent");
  let searchArrStudent = JSON.parse(localStorage.getItem("arrStudent"));
  let filteredData = searchArrStudent.filter((item) =>
    item.studentName.includes(searchName.value)
  );

  if (searchName.value === "" || filteredData.length < 1) {
    let tbody = document.getElementById("tbody");
    tbody.innerHTML =
      "<tr><td colspan='10' class='text-center'>Không tìm thấy kết quả.</td></tr>";
  } else if (filteredData.length > 0) {
    currentPage = 1;
    arrStudent = filteredData;
    renderData();
  }
});
// sort
let sortStudent = document.getElementById("sortStudent");
sortStudent.addEventListener("change", function () {
  const target = sortStudent.value;
  const sortArrStudent = JSON.parse(localStorage.getItem("arrStudent"));
  switch (target) {
    case "namePlus":
      sortArrStudent.sort((a, b) => a.studentName.localeCompare(b.studentName));
      break;
    case "nameMinus":
      sortArrStudent.sort((a, b) => b.studentName.localeCompare(a.studentName));
      break;
    case "addressPlus":
      sortArrStudent.sort((a, b) => a.address.localeCompare(b.address));
      break;
    case "addressMinus":
      sortArrStudent.sort((a, b) => b.address.localeCompare(a.address));
      break;
    case "statusPlus":
      sortArrStudent.sort((a, b) => a.status.localeCompare(b.status));
      break;
    case "statusMinus":
      sortArrStudent.sort((a, b) => b.status.localeCompare(a.status));
      break;
  }
  arrStudent = sortArrStudent;
  renderData();
});

document.onload = renderData();
