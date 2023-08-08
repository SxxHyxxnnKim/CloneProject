let click = 0;
let isIconAdded = false;
function changeImg() {
    let options = document.getElementById("options");
    let btn = document.getElementById("subscribe");


    // 구독 - 구독중, 색상 변경
    if (btn.textContent == "구독") {
        btn.innerText = "구독중";
        btn.style.backgroundColor = "#4e4c4c"

        // prepend notification
        let notiIcon = document.createElement("img");
        notiIcon.setAttribute("src", "imgChannel/notifications.svg");
        btn.prepend(notiIcon);

        // append expand
        let dropDownIcon = document.createElement("img");
        dropDownIcon.setAttribute("src", "imgChannel/dropDownArrow.svg");
        btn.append(dropDownIcon);

        // 다시 클릭하면 드롭다운
        click++;
        isIconAdded = true;
        return;
    }
    
    // option dropdown
    if (options.style.display == "none") {
        options.style.display = "block";
    }
    else {
        options.style.display = "none";
    }

}

function selectOption(option) {
    let btn = document.getElementById("subscribe");
    let notiIcon = btn.querySelector("img");
    switch (option) {
        case "all":
            notiIcon.setAttribute("src", "imgChannel/notifications_active.svg");
            break;
        case "custom":
            notiIcon.setAttribute("src", "imgChannel/notifications.svg");
            break;
        case "none":
            notiIcon.setAttribute("src", "imgChannel/notifications_off.svg");
            break;
        default:
            break;
    }
}

// 취소시 원래상태로
function subCancle() {
    if (confirm("구독을 취소하시겠습니까?")) {
        restoreState();
    }
}

function restoreState() {
    let options = document.getElementById("options");
    let btn = document.getElementById("subscribe");
    clickCount = 0;
    options.style.display = "none";
    btn.innerText = "구독";
    btn.style.backgroundColor = "white"
}