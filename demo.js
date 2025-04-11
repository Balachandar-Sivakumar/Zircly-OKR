let list = $(".tracker"), traker = $(".trace");
let tempStore = JSON.parse(localStorage.getItem('temp')) || [],
    permanantStorage = JSON.parse(localStorage.getItem('data')) || [],
    nextPageFlag = false,
    index = 1;

function tracking(ele){
    ele = Number(ele)
    $(list).removeClass('tracking_background')
    $(list).each((i,n)=> {
        if($(n).text()==ele) return $(n).addClass('tracking_background')
    })

    if(ele == 3){
        $(traker).addClass('base')
        $(".third_pg").removeClass('block')
        $(".back_btn").css('visibility','visible');
        $(".forms").hide();
        $("#kyc_details").show();
        $(".next_btn").css('visibility','hidden');
        index = 3;
        checker()
    }
    if(ele == 2){
        $(traker).removeClass('base')
        $(traker[0]).addClass('base')
        $(".back_btn,.next_btn").css('visibility','visible');
        $(".third_pg").addClass('block');
        $(".forms").hide();
        $("#education").show();
        index = 2;
        checker()
    }
    if(ele == 1){
        $(traker).removeClass('base')
        $(".back_btn").css('visibility','hidden');
        $(".third_pg").addClass('block');
        $(".forms").hide();
        $("#persnol_detail").show();
        $(".next_btn").css('visibility','visible');
        index = 1;
        checker()
    }
}

tracking(1)

$(list).each((i,n)=>{
    $(n).on('click',()=>{
        tracking($(n).text())  
        navigation()
    })
})

$(".valid").each((ind,ele)=>{
    $(ele).on('input',()=>{
        let data = {
            name: $("#name").val().trim(),
            email: $("#email").val().trim(),
            age: parseInt($("#age").val().trim()),
            gender: $("#gender").val(),
            degree: $("#degree").val().trim(),
            instution: $("#institution").val().trim(),
            field: $("#field").val().trim(),
            aadharcard: $("#aadhar").val().trim(),
            pancard: $("#pan").val().trim()
        }

        localStorage.setItem('temp', JSON.stringify(data))
        tempStore = JSON.parse(localStorage.getItem('temp'))
        checker()
    })
})

document.addEventListener('DOMContentLoaded',()=>{
    if(tempStore){
        $("#name").val(tempStore.name)
        $("#email").val(tempStore.email)
        $("#age").val(tempStore.age)
        $("#gender").val(tempStore.gender)
        $("#degree").val(tempStore.degree)
        $("#institution").val(tempStore.instution)
        $("#field").val(tempStore.field)
        $("#aadhar").val(tempStore.aadharcard)
        $("#pan").val(tempStore.pancard)
    }
    checker()
})

$(".next_btn").on('click',()=>{
    if(nextPageFlag){
        index++;
        tracking(index);
    }
})

$(".back_btn").on('click',()=>{
    if(index === 3 || index === 2){
        index--;
        tracking(index);
    }
})

function navigation(){
    if(index == 2 || index === 3){
        if(!tempStore.name || !tempStore.age || !tempStore.gender || !tempStore.email){
            tracking(1)
        }
        else if(!tempStore.degree || !tempStore.field || !tempStore.instution){
            tracking(2)
        }
    }
}

function checker(){
    if(tempStore.name && tempStore.age && tempStore.gender && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tempStore.email) && index === 1){
        $(".next_btn").removeClass('set_green')
        nextPageFlag = true;
    } else if(tempStore.degree && tempStore.instution && tempStore.field && index === 2){
        $(".next_btn").removeClass('set_green')
        nextPageFlag = true;
    } else if(tempStore.aadharcard?.length === 12 && tempStore.pancard?.length === 10 && index === 3){
        $(".third_pg").removeClass('set_green')
        nextPageFlag = true;
    } else {
        $(".next_btn").addClass('set_green')
        nextPageFlag = false;
        $(".third_pg").addClass('set_green')
    }
}

$(".Preview").on('click', () => {
    if (nextPageFlag) {
        let set = {
            "Name": tempStore.name,
            "Email": tempStore.email,
            "Age": tempStore.age,
            "Gender": tempStore.gender,
            "Degree": tempStore.degree,
            "Institution": tempStore.instution,
            "Field": tempStore.field,
            "Aadhar Number": tempStore.aadharcard,
            "PAN Number": tempStore.pancard
        };

        let row = ``

        for(let x in set){
            row += `<tr>
            <td>${x}</td>
            <td>${set[x]}</td>
            </tr>`
        }

        $("tbody").html('');
        $("tbody").append($(row));
        $(".pop_up").css("visibility", "visible");
    }
});

$(".close_button").on('click',()=>{
    $(".pop_up").css("visibility", "hidden");
})

$(".Submit").on('click',()=>{
    permanantStorage.push(tempStore)
    localStorage.setItem('data', JSON.stringify(permanantStorage))
    localStorage.removeItem('temp');
    window.location.reload();
    alert("Form submitted successfully")
})
