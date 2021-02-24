export const postUser = user => (
    $.ajax({
    url: `/api/users`,
    method: 'POST',
    data: {user}
})); 

export const postSession = user => (
    $.ajax({
    url: `/api/session`,
    method: 'POST',
    data: {user}
})
);

export const deleteSession = () => (
    $.ajax({
        url: `/api/session`,
        method: 'DELETE',
        success: function (data, text) {
            console.log(data);
        },
        error: function (request, status, error) {
            console.log(request.responseText);
        }
    })
);


//testing

// export const fetchUser = (usertId) => (
//     $.ajax({
//         url: `/api/users/${userId}`
//     })
// ); 