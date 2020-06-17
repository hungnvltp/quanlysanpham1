
document.getElementById('formLogIn').style.display = "none";
function moFormDangNhap() {
    document.getElementById('formLogIn').style.display = "block";
    document.getElementById('update').style.display = "block";
    document.getElementById('sua').style.display = "none";
}
function idSubmit() {
    document.getElementById('formLogIn').style.display = "none";
    let idName = document.getElementById('idName').value;
    let idId = document.getElementById('idId').value;
    let idPosition = document.getElementById('idPosition').value
    let idAge = document.getElementById('idAge').value;
    let idCompany = document.getElementById('idCompany').value;
    // validation
    if (_.isEmpty(idName)) {
        document.getElementById('name_error').innerHTML = "Vui lòng nhập tên";
    } else if (idName.length <= 2) {
        document.getElementById('name_error').innerHTML = "Họ và tên không được nhỏ quá 2 kí tự";
    } else if (idName.length >= 30) {
        document.getElementById('name_error').innerHTML = "Họ và tên không được lớn hơn 30 kí tự";
    }
    else {
        document.getElementById('name_error').innerHTML = "";
    }
    if (_.isEmpty(idPosition)) {
        document.getElementById('position_error').innerHTML = "Vui lòng nhập chức vụ";
    } else if (idPosition.length <= 2) {
        document.getElementById('position_error').innerHTML = "Chức vụ không được nhỏ quá 2 kí tự";
    } else if (idPosition.length >= 30) {
        document.getElementById('position_error').innerHTML = "Chức vụ không được lớn hơn 30 kí tự";
    }
    else {
        document.getElementById('position_error').innerHTML = "";
    }
    if (_.isEmpty(idAge)) {
        document.getElementById('age_error').innerHTML = "Vui lòng nhập tuổi";

    } else if (idAge.length >= 3) {
        document.getElementById('age_error').innerHTML = "Tuổi không được lớn hơn 3 kí tự";
    }
    else {
        document.getElementById('age_error').innerHTML = "";
    }
    if (_.isEmpty(idCompany)) {
        document.getElementById('company_error').innerHTML = "Vui lòng nhập Tên Công ty";

    } else if (idCompany.length <= 3) {
        document.getElementById('company_error').innerHTML = "Tên Công Ty không được lớn hơn 30 kí tự";
    }
    else {
        document.getElementById('company_error').innerHTML = "";
    }
    // lưu thông tin nhân viên 
    var Member = localStorage.getItem('Member') ? JSON.parse(localStorage.getItem('Member')) : [];

    Member.push({
        idName: idName,
        idId: idId,
        idPosition: idPosition,
        idAge: idAge,
        idCompany: idCompany
    });
    localStorage.setItem('Member', JSON.stringify(Member));
    this.renderListMember();

} var Member;
function renderListMember() {
    Member = localStorage.getItem('Member') ? JSON.parse(localStorage.getItem('Member')) : [];
    if (Member.length === 0) {


        return false;
    }

    let tableContent = `<tr>
                            <td>Numerorder</td>
                            <td>Name</td>
                            <td>Id</td>
                            <td>Company</td>
                            <td>Position</td>
                            <td>Age</td>
                            <td width="60px">Delete</td>
                            <td width="60px" >Edit</td>
                        </tr>`;
    Member.forEach((Member, index) => {

        let MemberId = index;


        tableContent += `<tr>
                            <td>${index}</td>
                            <td>${Member.idName}</td>
                             <td>${Member.idId}</td>
                            <td>${Member.idCompany}</td>
                            <td>${Member.idPosition}</td>
                            <td>${Member.idAge}</td>
                            <td >
                            <a href="#"onclick ='deleteMember(${MemberId})'>Delete</a> 
                            </td>
                             <td >
                            <a href="#" onclick="editMember(${index})">Edit</a>
                            </td>
                            
                        </tr>`;
    })
    document.getElementById("idTable").innerHTML = tableContent;
}
// xóa
function deleteMember(id) {
    let Member = localStorage.getItem('Member') ? JSON.parse(localStorage.getItem('Member')) : [];

    Member.splice(id, 1);
    localStorage.setItem('Member', JSON.stringify(Member));
    renderListMember();
}
// sửa 
var currIndex;
// alert(document.getElementById('idName'))
function editMember(index) {
    currIndex = index;
    document.getElementById('update').style.display = "none";
    document.getElementById('sua').style.display = "block";
    document.getElementById('formLogIn').style.display = "block";
    let valueNew = Member[index];


    document.getElementById('idName').value = valueNew.idName
    document.getElementById('idId').value = valueNew.idId
    document.getElementById('idPosition').value = valueNew.idPosition
    document.getElementById('idCompany').value = valueNew.idCompany
    document.getElementById('idAge').value = valueNew.idAge
}
function idSua() {
    // tạo biến và cho giá trị mới vào 
    changedItem = newValue();
    // let index;
    //  Member.forEach((mb, i) => {
    //     if (mb.idId == Members.idId) {
    //        index = i;
    //        return;
    //    }

    // }
    //  );
    Member[currIndex] = changedItem;
    localStorage.setItem('Member', JSON.stringify(Member));
    renderListMember();
};
function newValue() {

    ol = {
        idName: document.getElementById('idName').value,
        idId: document.getElementById('idId').value,
        idPosition: document.getElementById('idPosition').value,
        idCompany: document.getElementById('idCompany').value,
        idAge: document.getElementById('idAge').value,
    }
    return ol;
}
