
document.getElementById('formLogIn').style.display = "none";
function moFormDangNhap() {
    document.getElementById('formLogIn').style.display = "block";
    document.getElementById('update').style.display = "block";
    document.getElementById('sua').style.display = "none";
    document.getElementById('idName').value = "";
    document.getElementById('idId').value = "";
    document.getElementById('idPosition').value = "";
    document.getElementById('idAge').value = "";
    document.getElementById('idCompany').value = "";
}
function idSubmit() {

    let idName = document.getElementById('idName').value;
    let idId = document.getElementById('idId').value;
    let idPosition = document.getElementById('idPosition').value
    let idCompany = document.getElementById('idCompany').value;
    let idAge = document.getElementById('idAge').value;
    document.getElementById('formLogIn').style.display = "none";
    // validation
    // tên
    if (_.isEmpty(idName)) {
        alert("Vui lòng nhập tên");
        // return;
    } else if (idName.length <= 2) {
        alert("Họ và tên không được nhỏ quá 2 kí tự");

    } else if (idName.length >= 30) {
        alert("Họ và tên không được lớn hơn 30 kí tự");

    }

    // phone number
    if (_.isEmpty(idPosition)) {
        alert("Vui lòng nhập số điện thoại");

    } else if (idPosition.length <= 2) {
        alert("Số điện thoại không được nhỏ quá 2 kí tự");

    } else if (idPosition.length >= 13) {
        alert("Số Điện thoại không được lớn hơn 13 kí tự");
    }

    // age
    if (_.isEmpty(idAge)) {
        alert("Vui lòng nhập tuổi");

    } else if (idAge.length > 4) {
        alert("Tuổi không được lớn hơn 44444 kí tự");
    }

    // tên công ty
    if (_.isEmpty(idCompany)) {
        alert("Vui lòng nhập Tên Công ty");

    } else if (idCompany.length <= 2) {
        alert("Tên Công Ty không được nhỏ quá 2 kí tự");

    }
    else if (idCompany.length >= 30) {
        alert("Tên Công Ty không được lớn hơn 30 kí tự");
    }

    // chức cụ
    if (_.isEmpty(idPosition)) {
        alert("Vui lòng nhập chức vụ");

    } else if (idCompany.length >= 30) {
        alert("chức vụ không được lớn hơn 30 kí tự");
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
    // console.log(Member);
    localStorage.setItem('Member', JSON.stringify(Member));
    this.renderListMember();
    document.getElementById('idName').value = "";
    document.getElementById('idId').value = "";
    document.getElementById('idPosition').value = "";
    document.getElementById('idAge').value = "";
    document.getElementById('idCompany').value = "";
}
var Member;
function renderListMember(data = null) {
    if (data == null) {
        Member = localStorage.getItem('Member') ? JSON.parse(localStorage.getItem('Member')) : [];
    } else {
        Member = data;
    }
    let tableContent = `<tr>
                            <td>Numerorder</td>
                            <td>Name</td>
                            <td>Phone Number</td>
                            <td>Company</td>
                            <td>Position </td>
                            <td>Age</td>
                            <td width="60px">Delete</td>
                            <td width="60px" >Edit</td>
                        </tr>`;
    Member.forEach((Member, index) => {

        let MemberId = index;


        tableContent += `<tr>
                            <td>${index + 1}</td>
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
    document.getElementById('idName').value = "";
    document.getElementById('idId').value = "";
    document.getElementById('idPosition').value = "";
    document.getElementById('idAge').value = "";
    document.getElementById('idCompany').value = "";

}
// sửa 
var currIndex;

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
    var ChangeItem = newValue();
    Member[currIndex] = ChangeItem;
    localStorage.setItem('Member', JSON.stringify(Member));
    renderListMember();

    document.getElementById('idName').value = "";
    document.getElementById('idId').value = "";
    document.getElementById('idPosition').value = "";
    document.getElementById('idAge').value = "";
    document.getElementById('idCompany').value = "";
    document.getElementById('formLogIn').style.display = "none";
};
function newValue() {
    ol = {
        idName: document.getElementById('idName').value,
        idId: document.getElementById('idId').value,
        idPosition: document.getElementById('idPosition').value,
        idCompany: document.getElementById('idCompany').value,
        idAge: document.getElementById('idAge').value
    }
    return ol;
}
// tìm kiêm 
function search(value) {
    Member = localStorage.getItem('Member') ? JSON.parse(localStorage.getItem('Member')) : [];
    if (value == '') {
        renderListMember();
    } else {
        let result = Member.filter(Member =>
            Member.idName.startsWith(value)
            || Member.idPosition.match(value)
            || Member.idId.includes(value)
            || Member.idCompany.includes(value)
            || Member.idAge.match(value));


        renderListMember(result ?? []);
    }
}
// hello